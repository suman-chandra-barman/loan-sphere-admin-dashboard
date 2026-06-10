"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/api/authApi";

export default function PasswordCard() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (!newPassword) {
      toast.error("New password is required.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    const toastId = toast.loading("Updating password...");
    try {
      const response = await changePassword({
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      if (response.success) {
        toast.update(toastId, {
          render: response.message || "Password changed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        // Clear fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.update(toastId, {
          render: response.message || "Failed to change password.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || "An error occurred while changing password.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <Card className="overflow-hidden border-zinc-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
        <CardTitle className="text-lg font-semibold text-zinc-900">Change Password</CardTitle>
        <p className="text-xs text-zinc-500">
          Change your password regularly to keep your account secure.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handlePasswordChange} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <div className="grid gap-5 md:grid-cols-3">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="old_password" className="text-zinc-700 font-medium">Current Password</Label>
              <div className="relative  mt-1.5">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="old_password"
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="pl-9 pr-10 bg-zinc-50 border-zinc-200 focus:bg-white focus:ring-amber-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new_password" className="text-zinc-700 font-medium">New Password</Label>
              <div className="relative mt-1.5">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="new_password"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-9 pr-10 bg-zinc-50 border-zinc-200 focus:bg-white focus:ring-amber-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm_password" className="text-zinc-700 font-medium">Confirm New Password</Label>
              <div className="relative  mt-1.5">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 pr-10 bg-zinc-50 border-zinc-200 focus:bg-white focus:ring-amber-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-zinc-50 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white min-w-[150px] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
