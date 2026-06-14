/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateEmail } from "@/schemas/auth";
import { useAppDispatch } from "@/redux/hooks";

const features = [
  { icon: Zap, text: "AI-powered risk scoring in seconds" },
  { icon: Shield, text: "Bank-level encryption & 2FA" },
  { icon: TrendingUp, text: "Real-time portfolio analytics" },
  { icon: Smartphone, text: "Mobile-first application wizard" },
];

const stats = [
  { value: "$14.7M", label: "Portfolio" },
  { value: "247", label: "Applications" },
  { value: "73%", label: "Approval Rate" },
];

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }
    try {
      const response = await login({
        email: email.trim(),
        password,
      }).unwrap();

      if (response?.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            tokens: response.data.tokens,
          }),
        );
        toast.success(response?.message || "Signed in successfully.");
        router.push("/");
        return;
      }

      toast.error(response?.message || "Login failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F0EB]">
      {/* ── Left Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] p-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1a1a1a 0%, #2d1515 60%, #3d1a1a 100%)",
        }}
      >
        {/* subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(180,30,30,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#C0392B] flex items-center justify-center text-white font-bold text-sm">
            L
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">LoanSphere</p>
            <p className="text-gray-400 text-xs mt-0.5">Smart Lending Platform</p>
          </div>
        </div>

        {/* Headline + features */}
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h1 className="text-white text-4xl font-bold leading-tight">
              The future of<br />loan management
            </h1>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              AI-powered approvals. Real-time tracking. Bank-level security. All in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {features.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-gray-300" />
                </div>
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <p className="text-white font-bold text-lg">{value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg px-8 py-10">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
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

              {/* Password */}
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm bg-[#FAFAF9] focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/10 transition-all placeholder:text-gray-400"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Forgot */}
              <div className="flex justify-end -mt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#C0392B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C0392B] hover:bg-[#a93226] active:scale-[0.98] text-white text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? "Signing in…" : (
                  <>
                    Sign In <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
