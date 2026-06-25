"use client";

import { User as UserIcon, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PersonalInformationProps {
  isEditing: boolean;
  fullName: string;
  email: string;
  whatsappNumber: string;
  department: string;
  location: string;
  roleDisplay: string;
  onFullNameChange: (val: string) => void;
  onWhatsappNumberChange: (val: string) => void;
  onDepartmentChange: (val: string) => void;
  onLocationChange: (val: string) => void;
}

export default function PersonalInformation({
  isEditing,
  fullName,
  email,
  whatsappNumber,
  department,
  location,
  roleDisplay,
  onFullNameChange,
  onWhatsappNumberChange,
  onDepartmentChange,
  onLocationChange,
}: PersonalInformationProps) {
  return (
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
              onChange={(e) => onFullNameChange(e.target.value)}
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
              onChange={(e) => onWhatsappNumberChange(e.target.value)}
              className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
              placeholder="+1 (555) 000-0001"
            />
          ) : (
            <span className="font-bold text-zinc-800">{whatsappNumber || "-"}</span>
          )}
        </div>

        {/* Row 4: Department */}
        <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">DEPARTMENT</span>
          {isEditing ? (
            <Input
              value={department}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
              placeholder="Lending Operations"
            />
          ) : (
            <span className="font-bold text-zinc-800">{department || "-"}</span>
          )}
        </div>

        {/* Row 5: Location */}
        <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">LOCATION</span>
          {isEditing ? (
            <Input
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="max-w-md w-full border-zinc-200 bg-zinc-50/50 focus:bg-white"
              placeholder="New York, NY"
            />
          ) : (
            <span className="font-bold text-zinc-800">{location || "-"}</span>
          )}
        </div>

        {/* Row 6: Role */}
        <div className="py-4.5 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-semibold text-zinc-400 text-xs tracking-wider uppercase">ROLE</span>
          {isEditing ? (
            <div className="max-w-md w-full relative">
              <Input
                value={roleDisplay}
                disabled
                className="w-full border-zinc-200 bg-zinc-150/80 text-zinc-500 cursor-not-allowed"
              />
              <Lock className="absolute right-3 top-3 h-4 w-4 text-zinc-400" />
            </div>
          ) : (
            <span className="font-bold text-zinc-800">{roleDisplay}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
