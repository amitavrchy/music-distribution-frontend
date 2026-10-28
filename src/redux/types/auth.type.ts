export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CLIENT"
  | "DISTRIBUTOR"
  | "ACCOUNTANT";

export type ClientSetting = {
  id: string;
  userId: string;
  defaultDistributionPlatforms: string[];
  defaultGenres: string[];
  distributionTerritories: string[];
  createdAt: string;
  updatedAt: string;
};

export type LoginDevice = {
  id: string;
  userId: string;
  browser: string;
  os: string;
  deviceType: string;
  ipAddress: string;
  userAgent: string;
  city: string | null;
  country: string | null;
  lastLoginAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationSetting = {
  id: string;
  userId: string;
  isNewReleaseAlertsOn: boolean;
  isEarningAlertsOn: boolean;
  isPlatformUpdatesOn: boolean;
  emailNotificationsOn: boolean;
  smsNotificationsOn: boolean;
  pushNotificationsOn: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: string;
  isVerified: boolean;
  isTFAEnabled: boolean;
  lastLoginAt: string;
  lastActiveAt: string;
  profilePictureUrl: string | null;
  createdAt: string;
  updatedAt: string;
  clientSettings?: ClientSetting[];
  loginDevices?: LoginDevice[];
  notificationSettings?: NotificationSetting[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type LoginResponseData = {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
  };
  access_token: string;
  refresh_token: string;
};

export type VerificationRequiredData = {
  email: string;
  requiresVerification: true;
};

export type RegisterResponseData = {
  email: string;
  previewCode?: string;
};

export type LoginResponse = ApiResponse<LoginResponseData>;
export type SessionResponse = ApiResponse<
  LoginResponseData | VerificationRequiredData
>;
export type RegisterResponse = ApiResponse<RegisterResponseData>;

export type TAuth = {
  user: User | null;
  token: string | null;
};

export type AuthMeResponse = ApiResponse<User>;

export type ChangePasswordRequest = {
  password?: string;
  newPassword?: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  otp: string;
  email: string;
  newPassword: string;
};
