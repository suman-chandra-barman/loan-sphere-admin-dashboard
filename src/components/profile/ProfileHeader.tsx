"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Loader2, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProfileHeaderProps {
  fullName: string;
  email: string;
  roleDisplay: string;
  department: string;
  avatarUrl: string;
  initials: string;
  isEditing: boolean;
  isSavingProfile: boolean;
  onEditToggle: () => void;
  onCancel: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileHeader({
  fullName,
  email,
  roleDisplay,
  department,
  avatarUrl,
  initials,
  isEditing,
  isSavingProfile,
  onEditToggle,
  onCancel,
  onFileChange,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="overflow-hidden border-zinc-200/60 shadow-xs rounded-2xl bg-[#1E252B]">
      {/* Banner with dark red gradient */}
      <div className="h-32 bg-linear-to-r from-[#881c1c] to-[#5a1010] relative" />
      
      {/* Profile Details Area */}
      <div className="p-6 relative pt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        {/* Avatar Picture Overlay */}
        <div className="absolute left-6 top-[-48px] group">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-[#1E252B] bg-zinc-700 flex items-center justify-center shadow-lg relative transition-transform duration-300 group-hover:scale-[1.02]">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar Preview"
                width={100}
                height={100}
                unoptimized
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
            onChange={onFileChange}
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
              {roleDisplay}
            </span>
          </div>
          
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-medium">
            <span>{email}</span>
            <span className="text-zinc-600">•</span>
            <span>{department || "Lending Operations"}</span>
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
            onClick={onEditToggle}
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
              onClick={onCancel}
              className="text-zinc-400 ml-2 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
