"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Camera, Mail, Phone, User as UserIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/api/authApi";

export default function ProfileSettingsCard() {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Sync state with fetched data
  useEffect(() => {
    if (profileData?.success && profileData.data?.user) {
      const { full_name, whatsapp_number, email: userEmail } = profileData.data.user;
      setFullName(full_name || "");
      setWhatsappNumber(whatsapp_number || "");
      setEmail(userEmail || "");
      // Reset chosen files on query change
      setProfileImageFile(null);
      setPreviewUrl(null);
    }
  }, [profileData]);

  // Clean up object URL when component unmounts or preview url changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB.");
        return;
      }
      setProfileImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    if (profileData?.success && profileData.data?.user) {
      const { full_name, whatsapp_number } = profileData.data.user;
      setFullName(full_name || "");
      setWhatsappNumber(whatsapp_number || "");
      setProfileImageFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.info("Changes discarded.");
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", fullName.trim());
    formData.append("whatsapp_number", whatsappNumber.trim());

    if (profileImageFile) {
      formData.append("profile_image", profileImageFile);
    }

    const toastId = toast.loading("Saving changes...");
    try {
      const response = await updateProfile(formData).unwrap();
      if (response.success) {
        toast.update(toastId, {
          render: "Profile updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setProfileImageFile(null);
        setPreviewUrl(null);
      } else {
        toast.update(toastId, {
          render: response.message || "Failed to update profile.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || "An error occurred while saving profile settings.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  // Get active display image source
  const getDisplayAvatar = () => {
    if (previewUrl) return previewUrl;
    const profileImage = profileData?.data?.user?.profile_image;
    if (profileImage) {
      if (profileImage.startsWith("http://") || profileImage.startsWith("https://")) {
        return profileImage;
      }
      return `${process.env.NEXT_PUBLIC_BASE_URL}${profileImage}`;
    }
    return null;
  };

  const displayAvatar = getDisplayAvatar();
  const initials = fullName
    ? fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "";

  if (isProfileLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-7 w-48 animate-pulse rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-zinc-100" />
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 space-y-6">
            <div className="h-5 w-32 animate-pulse rounded bg-zinc-200" />
            <div className="flex flex-col gap-6 lg:flex-row items-center lg:items-start">
              <div className="h-28 w-28 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="flex-1 w-full grid gap-4 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
                    <div className="h-10 w-full animate-pulse rounded bg-zinc-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-zinc-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
        <CardTitle className="text-lg font-semibold text-zinc-900">General Settings</CardTitle>
        <p className="text-xs text-zinc-500">
          Update your personal details and change your profile picture.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-800 border-b border-zinc-50 pb-3">
            Personal Details
          </p>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row items-center lg:items-start">
            {/* Avatar block with interactive overlay */}
            <div className="relative group">
              <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-amber-100 bg-zinc-50 flex items-center justify-center shadow-inner relative transition-transform duration-300 group-hover:scale-[1.02]">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt="Admin Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-2xl font-bold text-amber-600 bg-amber-50 h-full w-full flex items-center justify-center">
                    {initials || <UserIcon className="h-8 w-8 text-amber-500" />}
                  </div>
                )}

                {/* Upload Hover Overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  aria-label="Upload profile image"
                >
                  <Camera className="h-6 w-6 mb-1 text-white/90" />
                  <span className="text-[10px] font-medium tracking-wider text-white/90">CHANGE</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-amber-600 text-white flex items-center justify-center border-2 border-white shadow hover:bg-amber-700 transition-colors cursor-pointer lg:flex hidden"
                title="Change Photo"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Inputs Block */}
            <div className="grid flex-1 w-full gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-zinc-700 font-medium">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-9 bg-zinc-50 border-zinc-200 focus:bg-white focus:ring-amber-500"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp_number" className="text-zinc-700 font-medium">WhatsApp Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="whatsapp_number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="pl-9 bg-zinc-50 border-zinc-200 focus:bg-white focus:ring-amber-500"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="text-zinc-500 font-medium">Email Address (Read-only)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="pl-9 bg-zinc-100 border-zinc-200 text-zinc-500 cursor-not-allowed select-none opacity-80"
                    placeholder="admin@mamamind.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-zinc-50 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isUpdating}
              className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-amber-600 hover:bg-amber-700 text-white min-w-[120px] cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
