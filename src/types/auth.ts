export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthFamily {
  id: number;
  name: string;
  relation: string;
  member_status: string;
}

export interface AuthUser {
  id?: number;
  full_name?: string;
  email: string;
  whatsapp_number?: string;
  role?: string;
  is_email_verified?: boolean;
  profile_image?: string | null;
  account_type?: string;
  family?: AuthFamily;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  tokens: AuthTokens;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponseData {
  email: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordResponseData>;

export interface VerifyForgotPasswordOtpRequest {
  email: string;
  otp_code: string;
}

export interface VerifyForgotPasswordOtpResponseData {
  tokens: AuthTokens;
  user: Pick<AuthUser, "email" | "full_name" | "role">;
}

export type VerifyForgotPasswordOtpResponse =
  ApiResponse<VerifyForgotPasswordOtpResponseData>;

export interface ResetPasswordRequest {
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponseData {
  user: AuthUser;
  tokens: AuthTokens;
}

export type ResetPasswordResponse = ApiResponse<ResetPasswordResponseData>;
