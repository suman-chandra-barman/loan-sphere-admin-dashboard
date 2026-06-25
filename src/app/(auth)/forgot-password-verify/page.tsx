/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RefreshCw, Smartphone } from "lucide-react";
import { useVerifyForgotPasswordOtpMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateVerifyForgotPasswordOtp } from "@/schemas/auth";

export default function ForgotPasswordVerifyPage() {
  const [email] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("forgotEmail") || "";
  });
  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(
    Array.from({ length: otpLength }, () => ""),
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyForgotPasswordOtp, { isLoading }] =
    useVerifyForgotPasswordOtpMutation();

  useEffect(() => {
    if (!email) {
      toast.error("Please request a password reset first.");
      router.replace("/forgot-password");
    }
  }, [email, router]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otpLength - 1) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  const handlePaste = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, otpLength - index);
    if (!digits) return;

    const newOtp = [...otp];
    digits.split("").forEach((char, offset) => {
      newOtp[index + offset] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(index + digits.length, otpLength - 1);
    const next = document.getElementById(`otp-${nextIndex}`);
    if (next) (next as HTMLInputElement).focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const validationError = validateVerifyForgotPasswordOtp({
      email_address: email,
      otp_code: otpValue,
    });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const response = await verifyForgotPasswordOtp({
        email_address: email,
        otp_code: otpValue,
      }).unwrap();

      if (response?.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            tokens: response.data.tokens,
          }),
        );
        toast.success(response?.message || "OTP verified successfully.");
        router.push("/reset-password");
        return;
      }

      toast.error(response?.message || "Verification failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0EB] px-4">
      {/* Back link */}
      <div className="w-full max-w-[400px] mb-4">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-[400px]">
        {/* Icon badge */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Smartphone size={26} className="text-gray-600" />
          </div>
        </div>

        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-gray-900">Verification Code</h1>
          <p className="text-gray-500 text-sm mt-2">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-700">{email || "your email"}</span>
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* OTP inputs */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={(e) => {
                  e.preventDefault();
                  handlePaste(idx, e.clipboardData.getData("text"));
                }}
                className="w-11 h-12 text-center text-lg font-semibold border-2 rounded-xl text-gray-800 bg-[#FAFAF9] focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all"
                style={{
                  borderColor: digit ? "#C0392B" : undefined,
                }}
              />
            ))}
          </div>

          {/* Resend */}
          <div className="flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C0392B] hover:underline transition-colors"
            >
              <RefreshCw size={13} />
              Resend Code
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C0392B] hover:bg-[#a93226] active:scale-[0.98] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Verifying…" : (
              <>
                Verify Code <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Didn&apos;t get the code? Check your spam folder or{" "}
          <Link href="/forgot-password" className="text-[#C0392B] hover:underline font-medium">
            try again
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
