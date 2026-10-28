import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { AppRootState } from "@/redux/store";
import type { LoginResponse } from "@/redux/types/auth.type";
import { Mutex } from "async-mutex";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not defined in environment variables");
}
// Mutex to prevent multiple refresh calls
const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state (in-memory)
    const token = (getState() as AppRootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Store the current token before waiting
  const tokenBeforeWait = (api.getState() as AppRootState).auth.token;

  // Wait for any ongoing refresh to complete
  await mutex.waitForUnlock();

  // Check if token changed while we were waiting (another request refreshed it)
  const tokenAfterWait = (api.getState() as AppRootState).auth.token;
  const tokenWasRefreshed = tokenBeforeWait !== tokenAfterWait;

  let result = await rawBaseQuery(args, api, extraOptions);
  const url = typeof args === "string" ? args : args.url;

  if (result.error?.status === 401 && url !== "/auth/refresh") {
    // If token was just refreshed by another request but still got 401, don't retry
    if (tokenWasRefreshed) {
      const { logout } = await import("@/redux/features/auth/authSlice");
      api.dispatch(logout());
      // if (typeof window !== "undefined") {
      //   window.location.href = "/login";
      // }
      return result;
    }

    // Check if mutex is locked (another request is refreshing)
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        console.log("🔄 Attempting to refresh token...");
        // Try to refresh the token
        const refreshResult = await rawBaseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          console.log("✅ Token successfully refreshed.");
          const refreshData = refreshResult.data as LoginResponse;
          const { setCredentials } = await import(
            "@/redux/features/auth/authSlice"
          );
          api.dispatch(
            setCredentials({
              token: refreshData.data.access_token,
              user: refreshData.data.user,
            }),
          );

          // Retry the original request with new token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          // Refresh failed, logout user
          console.error(" Token refresh failed:", refreshResult.error);
          const { logout } = await import("@/redux/features/auth/authSlice");
          api.dispatch(logout());
          // if (typeof window !== "undefined") {
          //   window.location.href = "/login";
          // }
        }
      } catch (err) {
        console.error(" Unexpected error during refresh:", err);
        const { logout } = await import("@/redux/features/auth/authSlice");
        api.dispatch(logout());
      } finally {
        release();
      }
    } else {
      // Wait for the refresh to complete and retry
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Overview",
    "PlatformData",
    "Team",
    "User",
    "Submissions",
    "Clients",
    "AccountantSettings",
    "Releases",
    "SplitSheets",
    "Tracks",
    "Products",
    "Coupons",
    "Cart",
    "Orders",
  ],
  endpoints: () => ({}),
});
