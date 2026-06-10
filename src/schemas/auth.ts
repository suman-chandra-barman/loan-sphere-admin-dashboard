import type {
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyForgotPasswordOtpRequest,
} from "@/types/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const whatsappPattern = /^\+?[0-9]{10,15}$/;

export const validateEmail = (email: string) => {
  if (!email.trim()) return "Email is required.";
  if (!emailPattern.test(email)) return "Enter a valid email address.";
  return null;
};

export const validateOtp = (otp: string, length = 6) => {
  if (!otp.trim()) return "OTP is required.";
  if (!new RegExp(`^\\d{${length}}$`).test(otp)) {
    return `OTP must be ${length} digits.`;
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (!password.trim()) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
};

export const validatePasswordMatch = (password: string, confirm: string) => {
  if (!confirm.trim()) return "Confirm password is required.";
  if (password !== confirm) return "Passwords do not match.";
  return null;
};

export const validateRegister = (payload: RegisterRequest) => {
  if (!payload.full_name.trim()) return "Full name is required.";
  const emailError = validateEmail(payload.email);
  if (emailError) return emailError;
  if (!payload.whatsapp_number.trim()) return "WhatsApp number is required.";
  if (!whatsappPattern.test(payload.whatsapp_number)) {
    return "Enter a valid WhatsApp number.";
  }
  const passwordError = validatePassword(payload.password);
  if (passwordError) return passwordError;
  const confirmError = validatePasswordMatch(
    payload.password,
    payload.confirm_password,
  );
  if (confirmError) return confirmError;
  return null;
};

export const validateVerifyEmail = (payload: VerifyEmailRequest) => {
  const emailError = validateEmail(payload.email);
  if (emailError) return emailError;
  return validateOtp(payload.otp_code, 6);
};

export const validateVerifyForgotPasswordOtp = (
  payload: VerifyForgotPasswordOtpRequest,
) => {
  const emailError = validateEmail(payload.email);
  if (emailError) return emailError;
  return validateOtp(payload.otp_code, 6);
};

export const validateResetPassword = (payload: ResetPasswordRequest) => {
  const passwordError = validatePassword(payload.new_password);
  if (passwordError) return passwordError;
  return validatePasswordMatch(payload.new_password, payload.confirm_password);
};
