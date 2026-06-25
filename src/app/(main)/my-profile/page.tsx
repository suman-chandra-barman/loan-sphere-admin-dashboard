"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Shield, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useGetMeQuery, useUpdateMeMutation } from "@/redux/api/authApi";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import UpdatePasswordModal from "@/components/profile/UpdatePasswordModal";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInformation from "@/components/profile/PersonalInformation";
import ActivitySnapshot from "@/components/profile/ActivitySnapshot";

export default function MyProfilePage() {
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMeQuery(undefined);
  const [updateMe] = useUpdateMeMutation();

  // --- Profile State ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Backup state for cancelling edits
  const [originalData, setOriginalData] = useState({
    fullName: "",
    whatsappNumber: "",
    department: "",
    location: "",
  });

  // --- UI Loading and Control States ---
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Load profile data from API
  useEffect(() => {
    if (profileResponse?.data) {
      const user = profileResponse.data;
      setFullName(user.personal_information?.full_name || user.full_name || "");
      setEmail(user.personal_information?.email_address || user.email_address || "");
      setWhatsappNumber(user.personal_information?.phone_number || user.phone_number || "");
      setDepartment(user.personal_information?.department || user.department || "");
      setLocation(user.personal_information?.location || user.location || "");
      setRole(user.personal_information?.role || user.role_label || user.role || "");

      const imgUrl = user.profile_image || user.profile_image_url || null;
      setPreviewUrl(imgUrl);

      setOriginalData({
        fullName: user.personal_information?.full_name || user.full_name || "",
        whatsappNumber: user.personal_information?.phone_number || user.phone_number || "",
        department: user.personal_information?.department || user.department || "",
        location: user.personal_information?.location || user.location || "",
      });
    }
  }, [profileResponse]);

  // Revoke blob URL on change/unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Build the complete profile image URL if relative path is returned
  const getAvatarUrl = () => {
    if (!previewUrl) return "";
    if (previewUrl.startsWith("blob:")) {
      return previewUrl;
    }
    const mediaIndex = previewUrl.indexOf("/media/");
    if (mediaIndex !== -1) {
      const relativePath = previewUrl.substring(mediaIndex);
      return `${process.env.NEXT_PUBLIC_BASE_URL}${relativePath}`;
    }
    if (previewUrl.startsWith("http://") || previewUrl.startsWith("https://")) {
      return previewUrl;
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}${previewUrl}`;
  };

  // --- Image Change Handler ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);
      setImageFile(file);

      // If not currently editing other fields, upload instantly
      if (!isEditing) {
        const toastId = toast.loading("Uploading profile image...");
        try {
          const formData = new FormData();
          formData.append("full_name", fullName);
          formData.append("phone_number", whatsappNumber);
          formData.append("department", department);
          formData.append("location", location);
          formData.append("profile_image", file);

          const res = await updateMe(formData).unwrap();
          if (res.success) {
            setImageFile(null);
            toast.update(toastId, {
              render: "Profile picture updated successfully!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          }
        } catch (err: any) {
          toast.update(toastId, {
            render: err?.data?.message || "Failed to update profile picture.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        toast.info("Image selected. Save profile to upload.");
      }
    }
  };

  // --- Profile Save Handler ---
  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    setIsSavingProfile(true);
    const toastId = toast.loading("Saving profile updates...");
    
    try {
      const formData = new FormData();
      formData.append("full_name", fullName.trim());
      formData.append("phone_number", whatsappNumber.trim());
      formData.append("department", department.trim());
      formData.append("location", location.trim());
      if (imageFile) {
        formData.append("profile_image", imageFile);
      }

      const res = await updateMe(formData).unwrap();
      if (res.success) {
        setIsEditing(false);
        setImageFile(null);
        toast.update(toastId, {
          render: res.message || "Profile updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: res.message || "Failed to update profile.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || "Failed to update profile.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // --- Cancel Profile Changes ---
  const handleCancelProfile = () => {
    setFullName(originalData.fullName);
    setWhatsappNumber(originalData.whatsappNumber);
    setDepartment(originalData.department);
    setLocation(originalData.location);
    setIsEditing(false);
    setImageFile(null);
    if (profileResponse?.data) {
      setPreviewUrl(profileResponse.data.profile_image || profileResponse.data.profile_image_url || null);
    }
  };

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  const initials = fullName
    ? fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "AR";

  const userRoleDisplay = role === "admin" ? "Super Admin" : role;

  const thisMonthData = profileResponse?.data?.this_month || {
    applications_reviewed: 0,
    approved: 0,
    rejected: 0,
    pending_review: 0,
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card (Overlapping Banner & Avatar) */}
      <ProfileHeader
        fullName={fullName}
        email={email}
        roleDisplay={userRoleDisplay}
        department={department}
        avatarUrl={getAvatarUrl()}
        initials={initials}
        isEditing={isEditing}
        isSavingProfile={isSavingProfile}
        onEditToggle={handleEditToggle}
        onCancel={handleCancelProfile}
        onFileChange={handleFileChange}
      />

      {/* 2. Main Two-Column Grid Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Personal Information */}
          <PersonalInformation
            isEditing={isEditing}
            fullName={fullName}
            email={email}
            whatsappNumber={whatsappNumber}
            department={department}
            location={location}
            roleDisplay={userRoleDisplay}
            onFullNameChange={setFullName}
            onWhatsappNumberChange={setWhatsappNumber}
            onDepartmentChange={setDepartment}
            onLocationChange={setLocation}
          />

          {/* Card: Security Settings */}
          <Card className="border-zinc-200/60 shadow-xs rounded-2xl bg-white overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-zinc-100 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <Shield className="h-4.5 w-4.5 text-zinc-500" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-sm">Security Settings</h3>
                <p className="text-xs text-zinc-500">Manage your password and authentication</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {/* Password Container Row */}
              <div className="bg-[#FAF4F0]/70 border border-[#FAF4F0] rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50/70 border border-orange-100/50 flex items-center justify-center shrink-0">
                    <KeyRound className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-800 text-sm">Password</p>
                    <p className="text-xs text-zinc-400">Last changed 30 days ago</p>
                  </div>
                </div>

                <Button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="bg-white border border-[#E9D9CF] text-orange-700 hover:bg-orange-50/50 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer shadow-xs"
                >
                  Change &gt;
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (lg:col-span-1) */}
        <div className="space-y-6">
          {/* Card: This Month (Activity snap) */}
          <ActivitySnapshot thisMonthData={thisMonthData} />
        </div>
      </div>

      <UpdatePasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
      />
    </div>
  );
}
