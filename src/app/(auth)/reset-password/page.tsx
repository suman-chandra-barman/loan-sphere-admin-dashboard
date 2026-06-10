/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateResetPassword } from "@/schemas/auth";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateResetPassword({
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const response = await resetPassword({
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      if (response?.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            tokens: response.data.tokens,
          }),
        );
        toast.success(response?.message || "Password reset successfully.");
        router.push("/");
        return;
      }

      toast.error(response?.message || "Password reset failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Password reset failed.");
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
          Reset password
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          Choose a new password for your account.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            className="border rounded px-3 py-2"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="border rounded px-3 py-2"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="h-10 rounded-full bg-button-bg text-[15px] font-medium text-white hover:bg-[#9f8046] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
