/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateEmail } from "@/schemas/auth";
import { useAppDispatch } from "@/redux/hooks";


export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-[#E9EFF3] bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6 border-b border-gray-300 pb-6">
          <Image
            src="/logo.svg"
            alt="Mamamind Logo"
            width={80}
            height={80}
            className="object-cover mb-2"
          />
          <h1 className="text-2xl font-bold text-center">
            Mamamind
          </h1>
        </div>
        <h2 className="text-lg font-bold  mb-1">
          Sign in to manage your account
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          Welcome back. Please enter your email and password.
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
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end mb-2">
            <Link
              href="/forgot-password"
              className="text-xs text-button-bg font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="h-10 rounded-full bg-button-bg text-[15px] font-medium text-white hover:bg-[#9f8046] cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
