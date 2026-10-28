import { baseApi } from "@/redux/hooks/baseApi";
import {
  LoginRequest,
  LoginResponse,
  SessionResponse,
  RegisterRequest,
  RegisterResponse,
  AuthMeResponse,
  User,
  ApiResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/redux/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SessionResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<
      LoginResponse,
      { email: string; otp: string; type: string }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    requestOtp: builder.mutation<
      ApiResponse<{ previewCode?: string } | null>,
      { email: string; type: string }
    >({
      query: (body) => ({
        url: "/auth/request-otp",
        method: "POST",
        body,
      }),
    }),
    completeOnboarding: builder.mutation<
      ApiResponse<{ stageName: string; genre: string; territory: string }>,
      { stageName: string; genre: string; territory: string }
    >({
      query: (body) => ({
        url: "/auth/onboarding",
        method: "POST",
        body,
      }),
    }),
    refresh: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    authMe: builder.query<AuthMeResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<ApiResponse<User>, FormData>({
      query: (formData) => ({
        url: "/auth",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<ApiResponse<void>, ChangePasswordRequest>({
      query: (data) => ({
        url: "/auth/password/change",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse<void>, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/auth/password/forgot",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<void>, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/password/reset",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useRequestOtpMutation,
  useCompleteOnboardingMutation,
  useRefreshMutation,
  useAuthMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
