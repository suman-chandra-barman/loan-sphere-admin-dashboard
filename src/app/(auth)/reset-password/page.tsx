/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateResetPassword } from "@/schemas/auth";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function getStrength(password: string) {
  const passed = passwordRules.filter((r) => r.test(password)).length;
  if (passed === 0) return { level: 0, label: "", color: "" };
  if (passed === 1) return { level: 1, label: "Weak", color: "#C0392B" };
  if (passed === 2) return { level: 2, label: "Fair", color: "#e67e22" };
  if (passed === 3) return { level: 3, label: "Good", color: "#f1c40f" };
  return { level: 4, label: "Strong", color: "#27ae60" };
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized access. Please verify your OTP code first.");
      router.replace("/forgot-password");
    }
  }, [token, router]);

  const strength = getStrength(newPassword);

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
        if (response.data?.user && response.data?.tokens) {
          dispatch(
            setCredentials({
              user: response.data.user,
              tokens: response.data.tokens,
            }),
          );
          toast.success(response?.message || "Password reset successfully.");
          router.push("/");
        } else {
          toast.success(response?.message || "Password reset successful. Please sign in.");
          router.push("/signin");
        }
        return;
      }

      toast.error(response?.message || "Password reset failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0EB] px-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-[400px]">
        {/* Icon badge */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#C0392B]/10 flex items-center justify-center">
            <ShieldCheck size={26} className="text-[#C0392B]" />
          </div>
        </div>

        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Choose a new strong password for your account
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* New Password */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              New Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm bg-[#FAFAF9] focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all placeholder:text-gray-400"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bar */}
            {newPassword.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className="h-1 flex-1 rounded-full transition-all"
                      style={{
                        background:
                          seg <= strength.level ? strength.color : "#E5E7EB",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium" style={{ color: strength.color }}>
                  {strength.label}
                </p>
              </div>
            )}

            {/* Rules checklist */}
            {newPassword.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1">
                {passwordRules.map(({ label, test }) => {
                  const ok = test(newPassword);
                  return (
                    <li key={label} className="flex items-center gap-1.5">
                      {ok ? (
                        <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className="text-xs"
                        style={{ color: ok ? "#374151" : "#9CA3AF" }}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm bg-[#FAFAF9] focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all placeholder:text-gray-400"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C0392B] hover:bg-[#a93226] active:scale-[0.98] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-1"
          >
            {isLoading ? "Resetting…" : (
              <>
                Reset Password <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
