/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { validateEmail } from "@/schemas/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }
    try {
      const response = await forgotPassword({ email: email.trim() }).unwrap();

      if (response?.success) {
        localStorage.setItem("forgotEmail", email.trim());
        toast.success(response?.message || "OTP sent successfully.");
        router.push("/forgot-password-verify");
        return;
      }

      toast.error(response?.message || "Failed to send OTP.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0EB] px-4">
      {/* Back link */}
      <div className="w-full max-w-[400px] mb-4">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Sign In
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-[400px]">
        {/* Icon badge */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#C0392B]/10 flex items-center justify-center">
            <Lock size={26} className="text-[#C0392B]" />
          </div>
        </div>

        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Enter your registered email and we&apos;ll send a 6-digit
            verification code to reset your password.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm bg-[#FAFAF9] focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all placeholder:text-gray-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C0392B] hover:bg-[#a93226] active:scale-[0.98] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Sending…" : (
              <>
                Send Reset Code <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="text-[#C0392B] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
