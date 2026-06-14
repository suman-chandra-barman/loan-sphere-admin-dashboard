"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Camera,
  Mail,
  Phone,
  User as UserIcon,
  Loader2,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Bell,
  Activity,
  Clock,
  PenLine,
  CheckCircle2,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

import { cn } from "@/lib/utils";

// Helper to extract user browser and OS details dynamically
function getBrowserAndOS() {
  if (typeof window === "undefined") {
    return { browser: "Chrome 124", os: "macOS Sequoia" };
  }
  const ua = window.navigator.userAgent;
  let browser = "Chrome";
  let os = "Windows";

  // OS detection
  if (ua.indexOf("Win") !== -1) os = "Windows";
  else if (ua.indexOf("Mac") !== -1) os = "macOS Sequoia";
  else if (ua.indexOf("Linux") !== -1) os = "Linux";
  else if (ua.indexOf("Android") !== -1) os = "Android";
  else if (ua.indexOf("like Mac") !== -1) os = "iOS";

  // Browser detection
  if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (ua.indexOf("SamsungBrowser") !== -1) browser = "Samsung Browser";
  else if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (ua.indexOf("Safari") !== -1) browser = "Safari";
  else if (ua.indexOf("Edge") !== -1) browser = "Edge";
  else if (ua.indexOf("Trident") !== -1) browser = "Internet Explorer";

  // Try to parse browser version
  const match = ua.match(/(chrome|safari|firefox|edge|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  const version = match[2] ? ` ${match[2]}` : "";

  return { browser: `${browser}${version}`, os };
}

export default function MyProfilePage() {
  // --- Profile Static State (Fallbacks matching user screenshot) ---
  const [fullName, setFullName] = useState("Alex Rivera");
  const [email, setEmail] = useState("admin@loansphere.com");
  const [whatsappNumber, setWhatsappNumber] = useState("+1 (555) 000-0001");
  const [department, setDepartment] = useState("Lending Operations");
  const [location, setLocation] = useState("New York, NY");
  const [role, setRole] = useState("Super Administrator");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Backup state for cancelling edits
  const [originalData, setOriginalData] = useState({
    fullName: "Alex Rivera",
    whatsappNumber: "+1 (555) 000-0001",
    department: "Lending Operations",
    location: "New York, NY",
  });

  // --- UI Loading and Control States ---
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Notification Switch states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // --- Password Modal States ---
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Client Meta Info ---
  const [clientMeta, setClientMeta] = useState({ browser: "Chrome 124", os: "macOS Sequoia" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle client-side browser metadata on mount
  useEffect(() => {
    setClientMeta(getBrowserAndOS());
  }, []);

  // Revoke blob URL on change/unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // --- Image Change Handler ---
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
      
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);

      // Simulate a direct upload toast alert
      const toastId = toast.loading("Uploading profile image...");
      setTimeout(() => {
        toast.update(toastId, {
          render: "Profile picture updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }, 700);
    }
  };

  // --- Profile Save Handler ---
  const handleSaveProfile = () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }
    if (!whatsappNumber.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    setIsSavingProfile(true);
    const toastId = toast.loading("Saving profile updates...");
    
    // Simulate backend response
    setTimeout(() => {
      setOriginalData({
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        department: department.trim(),
        location: location.trim(),
      });
      setIsSavingProfile(false);
      setIsEditing(false);
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }, 600);
  };

  // --- Cancel Profile Changes ---
  const handleCancelProfile = () => {
    setFullName(originalData.fullName);
    setWhatsappNumber(originalData.whatsappNumber);
    setDepartment(originalData.department);
    setLocation(originalData.location);
    setIsEditing(false);
  };

  // --- Password Change Handler ---
  const handlePasswordChange = (e: React.FormEvent) => {
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

    setIsChangingPassword(true);
    const toastId = toast.loading("Updating password...");

    // Simulate backend password update response
    setTimeout(() => {
      setIsChangingPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordModalOpen(false);
      
      toast.update(toastId, {
        render: "Password changed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }, 800);
  };

  const initials = fullName
    ? fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "AR";

  const userRoleDisplay = role === "admin" ? "Super Admin" : role;

  return (
    <div className="space-y-6">
      {/* 1. Header Card (Overlapping Banner & Avatar) */}
      <Card className="overflow-hidden border-zinc-200/60 shadow-xs rounded-2xl bg-[#1E252B]">
        {/* Banner with dark red gradient */}
        <div className="h-32 bg-gradient-to-r from-[#881c1c] to-[#5a1010] relative" />
        
        {/* Profile Details Area */}
        <div className="p-6 relative pt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          {/* Avatar Picture Overlay */}
          <div className="absolute left-6 top-[-48px] group">
            <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-[#1E252B] bg-zinc-700 flex items-center justify-center shadow-lg relative transition-transform duration-300 group-hover:scale-[1.02]">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-2xl font-bold text-white bg-[#9c1c1c] h-full w-full flex items-center justify-center">
                  {initials}
                </div>
              )}

              {/* Upload Hover Overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Upload profile image"
              >
                <Camera className="h-5 w-5 mb-1 text-white/90" />
                <span className="text-[9px] font-bold tracking-wider text-white/95">CHANGE</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Small camera trigger badge at bottom-right */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-zinc-850 hover:bg-zinc-800 text-white flex items-center justify-center border-2 border-[#1E252B] shadow hover:scale-105 transition-transform cursor-pointer"
              title="Change Photo"
            >
              <Camera className="h-3.5 w-3.5 text-zinc-300" />
            </button>
          </div>

          {/* User Name & Details */}
          <div className="sm:pl-28 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {fullName || "Alex Rivera"}
              </h2>
              <span className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10" />
                {userRoleDisplay}
              </span>
            </div>
            
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-medium">
              <span>{email}</span>
              <span className="text-zinc-600">•</span>
              <span>Lending Operations</span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <div className="shrink-0 flex items-center">
            <Button
              variant="outline"
              onClick={() => {
                if (isEditing) {
                  handleSaveProfile();
                } else {
                  setIsEditing(true);
                }
              }}
              disabled={isSavingProfile}
              className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-zinc-100 gap-2 font-semibold text-xs py-2 px-4 rounded-xl cursor-pointer shadow-sm"
            >
              {isSavingProfile ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Save Profile"
              ) : (
                <>
                  <PenLine className="h-3.5 w-3.5 text-zinc-300" />
                  Edit Profile
                </>
              )}
            </Button>
            {isEditing && (
              <Button
                variant="ghost"
                onClick={handleCancelProfile}
                className="text-zinc-400 ml-2 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* 2. Main Two-Column Grid Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card: Personal Information */}
          <Card className="border-zinc-200/60 shadow-xs rounded-2xl bg-white overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-zinc-100 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <UserIcon className="h-4.5 w-4.5 text-zinc-500" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-sm">Personal Information</h3>
                <p className="text-xs text-zinc-500">Your account details and contact info</p>
              </div>
            </div>

            {/* Content List */}
            <div className="p-6 divide-y divide-zinc-100 text-sm">
              {/* Row 1: Full Name */}
              <div className="py-4.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">FULL NAME</span>
                {isEditing ? (
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
                    placeholder="Alex Rivera"
                  />
                ) : (
                  <span className="font-bold text-zinc-800">{fullName}</span>
                )}
              </div>

              {/* Row 2: Email */}
              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">EMAIL</span>
                {isEditing ? (
                  <div className="max-w-md w-full relative">
                    <Input
                      value={email}
                      disabled
                      className="w-full border-zinc-200 bg-zinc-150/80 text-zinc-500 cursor-not-allowed"
                    />
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-zinc-400" />
                  </div>
                ) : (
                  <span className="font-bold text-zinc-800">{email}</span>
                )}
              </div>

              {/* Row 3: Phone / WhatsApp */}
              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">PHONE</span>
                {isEditing ? (
                  <Input
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
                    placeholder="+1 (555) 000-0001"
                  />
                ) : (
                  <span className="font-bold text-zinc-800">{whatsappNumber}</span>
                )}
              </div>

              {/* Row 4: Department */}
              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">DEPARTMENT</span>
                {isEditing ? (
                  <Input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
                    placeholder="Lending Operations"
                  />
                ) : (
                  <span className="font-bold text-zinc-800">{department}</span>
                )}
              </div>

              {/* Row 5: Location */}
              <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">LOCATION</span>
                {isEditing ? (
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
                    placeholder="New York, NY"
                  />
                ) : (
                  <span className="font-bold text-zinc-800">{location}</span>
                )}
              </div>

              {/* Row 6: Role */}
              <div className="py-4.5 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">ROLE</span>
                {isEditing ? (
                  <div className="max-w-md w-full relative">
                    <Input
                      value={userRoleDisplay}
                      disabled
                      className="w-full border-zinc-200 bg-zinc-150/80 text-zinc-500 cursor-not-allowed"
                    />
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-zinc-400" />
                  </div>
                ) : (
                  <span className="font-bold text-zinc-800">{userRoleDisplay}</span>
                )}
              </div>
            </div>
          </Card>

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
          <Card className="border-zinc-200/60 shadow-xs rounded-2xl bg-white overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-zinc-100 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <Activity className="h-4.5 w-4.5 text-zinc-500" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-sm">This Month</h3>
                <p className="text-xs text-zinc-500">Your activity snapshot</p>
              </div>
            </div>

            {/* Snapshot metrics */}
            <div className="p-6 divide-y divide-zinc-100 text-xs">
              {/* Item 1: Applications reviewed */}
              <div className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Applications reviewed</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-800 text-sm">89</span>
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold text-[10px]">+12%</span>
                </div>
              </div>

              {/* Item 2: Approved */}
              <div className="py-3.5 flex items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Approved</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-800 text-sm">61</span>
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold text-[10px]">69%</span>
                </div>
              </div>

              {/* Item 3: Rejected */}
              <div className="py-3.5 flex items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Rejected</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-800 text-sm">18</span>
                  <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded font-bold text-[10px]">20%</span>
                </div>
              </div>

              {/* Item 4: Pending review */}
              <div className="py-3.5 last:pb-0 flex items-center justify-between gap-2">
                <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Pending review</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-800 text-sm">10</span>
                  <span className="bg-teal-50 text-teal-600 px-2 py-0.5 rounded font-bold text-[10px]">-3</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Password Dialog Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
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
            {/* Input 1: Old Password */}
            <div className="space-y-1.5">
              <Label htmlFor="old_password_modal" className="text-zinc-700 font-semibold text-xs">Current Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="old_password_modal"
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="pl-9 pr-10 border-zinc-200 bg-zinc-50/50 focus:bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-650 cursor-pointer"
                >
                  {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Input 2: New Password */}
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

            {/* Input 3: Confirm Password */}
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
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setIsPasswordModalOpen(false);
                }}
                className="border-zinc-200 text-zinc-650 hover:bg-zinc-50 cursor-pointer rounded-xl font-semibold text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isChangingPassword}
                className="bg-[#9c1c1c] hover:bg-[#7e1414] text-white min-w-[130px] cursor-pointer rounded-xl font-semibold text-xs shadow-xs"
              >
                {isChangingPassword ? (
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
    </div>
  );
}
