"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Phone, MessageSquare, Edit2, Calendar, CheckCircle, XCircle } from "lucide-react";
import type { CaseManager } from "@/types/support";

interface ManagerCardProps {
  manager: CaseManager;
  onEdit: (manager: CaseManager) => void;
  onManageAvailability: (manager: CaseManager) => void;
}

export default function ManagerCard({
  manager,
  onEdit,
  onManageAvailability,
}: ManagerCardProps) {
  const initials = manager.initials || manager.name?.substring(0, 2).toUpperCase() || "CM";

  const getCallTypeLabel = (type: string) => {
    if (type === "phone_call") return "Phone Call";
    if (type === "live_chat") return "Live Chat";
    return type;
  };

  return (
    <Card className="border-zinc-200/60 shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-white flex flex-col h-full group">
      <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
        {/* Top Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-xl border border-zinc-200 shadow-3xs bg-zinc-50 shrink-0">
              <AvatarFallback className="text-sm font-extrabold text-zinc-700 bg-zinc-200/60">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="font-bold text-zinc-900 text-base leading-tight group-hover:text-[#e05638] transition-colors">
                {manager.name}
              </h4>
              <p className="text-xs text-zinc-500 font-semibold">{manager.title}</p>
            </div>
          </div>

          {/* Active status indicator */}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border shadow-3xs uppercase tracking-wider ${
              manager.isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                : "bg-zinc-100 text-zinc-500 border-zinc-200/60"
            }`}
          >
            {manager.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Info list */}
        <div className="space-y-2 border-t border-b border-zinc-100/60 py-3.5 text-xs text-zinc-600 font-medium">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-semibold">Speciality</span>
            <span className="font-bold text-zinc-800">{manager.speciality || "General Support"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-semibold">Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-800">{manager.rating || "5.0"}</span>
              <span className="text-zinc-400 font-medium">({manager.reviewsCount || 0} reviews)</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-semibold">Contact Email</span>
            <span className="font-mono text-[11px] text-zinc-500 truncate max-w-[150px]" title={manager.email}>
              {manager.email}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-semibold">Channels</span>
            <div className="flex items-center gap-1.5">
              {manager.availableCallTypes?.map((type) => (
                <span
                  key={type}
                  className="p-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/40"
                  title={getCallTypeLabel(type)}
                >
                  {type === "phone_call" ? (
                    <Phone className="h-3 w-3" />
                  ) : (
                    <MessageSquare className="h-3 w-3" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-2.5 pt-1.5">
          <button
            onClick={() => onEdit(manager)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-600 text-xs font-bold shadow-3xs hover:bg-zinc-50 hover:text-zinc-950 transition-all cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit Profile
          </button>
          <button
            onClick={() => onManageAvailability(manager)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-950 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" />
            Schedule
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
