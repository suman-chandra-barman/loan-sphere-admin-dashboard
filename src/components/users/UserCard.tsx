import React from "react";
import { StaticUser } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  user: StaticUser;
  onClick: () => void;
}

export default function UserCard({
  user,
  onClick
}: UserCardProps) {
  // Determine role styling matching mockups
  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-zinc-100 text-zinc-600 font-bold border-0";
      case "joint customer":
        return "bg-zinc-100 text-zinc-600 font-bold border-0";
      default:
        return "bg-rose-50 text-[#A31D1D] font-bold border-0";
    }
  };

  const getRoleLabel = (role: string) => {
    return role;
  };

  const avatarBg = user.role === "admin" ? "bg-slate-700" : "bg-[#A31D1D]";
  const isActive = user.status === "active";

  return (
    <Card
      onClick={onClick}
      className="p-5 bg-white border border-zinc-200/70 hover:border-zinc-300 shadow-xs rounded-2xl cursor-pointer hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
    >
      {/* Header section */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3.5">
          {/* Avatar */}
          <Avatar className="h-11 w-11 shrink-0 rounded-full overflow-hidden shadow-xs">
            {user.profileImage && (
              <AvatarImage
                src={user.profileImage}
                alt={user.fullName}
              />
            )}
            <AvatarFallback className={`${avatarBg} text-white text-sm font-bold flex items-center justify-center`}>
              {user.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="font-bold text-zinc-900 text-base leading-tight truncate">
                {user.fullName}
              </h3>
              <Badge className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${getRoleBadgeClass(user.role)}`}>
                {getRoleLabel(user.role)}
              </Badge>
            </div>
            <p className="text-xs font-semibold text-zinc-400 mt-1 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Status Dot Badge */}
        <Badge
          variant={isActive ? "default" : "secondary"}
          className="rounded-full px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 border-0 shrink-0 select-none uppercase tracking-wider"
        >
          <span className={`h-1 w-1 rounded-full ${isActive ? "bg-emerald-500" : "bg-zinc-400"}`} />
          {user.status}
        </Badge>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 border-t border-zinc-50 pt-5 mt-6 text-center">
        <div>
          <p className="text-sm font-extrabold text-zinc-800">
            {user.applications}
          </p>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
            Applications
          </p>
        </div>

        <div>
          <p className="text-sm font-extrabold text-zinc-800">
            {user.creditScore}
          </p>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
            Credit Score
          </p>
        </div>

        <div>
          <p className="text-sm font-extrabold text-zinc-800">
            {user.joined}
          </p>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
            Joined
          </p>
        </div>
      </div>
    </Card>
  );
}
