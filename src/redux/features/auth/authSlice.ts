import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  TAuth,
  LoginResponse,
  SessionResponse,
  AuthMeResponse,
} from "@/redux/types/auth.type";
import { authApi } from "./authApi";
import type { AppRootState } from "@/redux/store";

const initialState: TAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }: PayloadAction<SessionResponse>) => {
          if (!("user" in payload.data) || !payload.data.user) return;
          if (!("access_token" in payload.data) || !payload.data.access_token) return;
          state.user = payload.data.user;
          state.token = payload.data.access_token;
        },
      )
      .addMatcher(
        authApi.endpoints.authMe.matchFulfilled,
        (state, { payload }: PayloadAction<AuthMeResponse>) => {
          state.user = payload.data;
        },
      )
      .addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          // Silent refresh: update access token in memory
          state.user = payload.data.user;
          state.token = payload.data.access_token;
        },
      );
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: AppRootState) => state.auth.token;
export const selectCurrentUser = (state: AppRootState) => state.auth.user;
