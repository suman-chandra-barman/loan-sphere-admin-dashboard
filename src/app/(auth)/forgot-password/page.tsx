/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
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
    <div className="min-h-screen flex items-center justify-center bg-[#E9EFF3] bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="Mamamind"
            width={80}
            height={80}
            className="object-cover mb-2"
          />
          <h1 className="text-2xl font-bold text-center text-button-bg">
            Mamamind
          </h1>
        </div>
        <h2 className="text-lg font-bold text-button-bg mb-1">
          Forgot password
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          Enter your email to receive a password reset code.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="h-10 rounded-full bg-button-bg text-[15px] font-medium text-white hover:bg-[#9f8046] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
