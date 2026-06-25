import { useState } from "react";
import { toast } from "react-toastify";
import { KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
} from "@/components/ui/dialog";
import { useResetPasswordMutation } from "@/redux/api/authApi";

interface UpdatePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdatePasswordModal({
  open,
  onOpenChange,
}: UpdatePasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const response = await resetPassword({
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      if (response?.success) {
        setNewPassword("");
        setConfirmPassword("");
        onOpenChange(false);

        toast.update(toastId, {
          render: response.message || "Password changed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: response?.message || "Failed to update password.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || "Failed to update password.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogCloseButton />

        <DialogHeader className="pb-4 border-b border-zinc-100">
          <DialogTitle className="text-zinc-900 font-bold text-base flex items-center gap-2">
            <KeyRound className="h-4.5 w-4.5 text-zinc-500" />
            Update Password
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            Change your password regularly to keep your account secure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
          {/* Input 1: New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="new_password_modal" className="text-zinc-700 font-semibold text-xs">New Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                id="new_password_modal"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-9 pr-10 border-zinc-200 bg-zinc-50/50 focus:bg-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-650 cursor-pointer"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Input 2: Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm_password_modal" className="text-zinc-700 font-semibold text-xs">Confirm New Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                id="confirm_password_modal"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9 pr-10 border-zinc-200 bg-zinc-50/50 focus:bg-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-650 cursor-pointer"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setNewPassword("");
                setConfirmPassword("");
                onOpenChange(false);
              }}
              className="border-zinc-200 text-zinc-650 hover:bg-zinc-50 cursor-pointer rounded-xl font-semibold text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isResettingPassword}
              className="bg-[#9c1c1c] hover:bg-[#7e1414] text-white min-w-[130px] cursor-pointer rounded-xl font-semibold text-xs shadow-xs"
            >
              {isResettingPassword ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
