/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
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
      email,
      otp_code: otpValue,
    });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const response = await verifyForgotPasswordOtp({
        email,
        otp_code: otpValue,
      }).unwrap();

      if (response?.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
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
    <div className="min-h-screen flex items-center justify-center bg-[#E9EFF3] bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.svg"
            alt="Mamamind"
            width={80}
            height={80}
            className="object-cover mb-2"
          />
          <h1 className="text-2xl font-bold text-center text-button-bg">
            Mamamind
          </h1>
        </div>
        <h2 className="text-lg font-bold text-button-bg mb-1">Verify OTP</h2>
        <p className="text-gray-700 mb-4 text-sm">
          Enter the 6-digit code sent to your email.
        </p>
        <form
          className="flex flex-col gap-3 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 mb-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border rounded text-xl"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  handlePaste(idx, e.clipboardData.getData("text"));
                }}
              />
            ))}
          </div>
          <button
            type="submit"
            className="h-10 w-full rounded-full bg-button-bg text-[15px] font-medium text-white hover:bg-[#9f8046] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
