import React from "react";
import { X, UserX, UserCheck, Phone, Building2, MapPin, Briefcase } from "lucide-react";
import { StaticUser } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserDetailDrawerProps {
  user?: StaticUser | null;
  onClose: () => void;
  onToggleSuspend?: () => void;
  isLoading?: boolean;
}

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-200/80 ${className ?? ""}`}
    />
  );
}

export default function UserDetailDrawer({
  user,
  onClose,
  onToggleSuspend,
  isLoading = false,
}: UserDetailDrawerProps) {
  const isSuspended = user?.status === "inactive";
  const displayStatus = isSuspended ? "suspended" : "active";

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/45 z-50 transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel container */}
      <aside
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-zinc-200 flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Banner Header */}
        <div className="bg-[#A31D1D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4.5 mt-2">
            {/* Avatar initials with white background in header */}
            <Avatar className="h-14 w-14 rounded-full border border-white/20 overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-white/10">
              {isLoading ? (
                <div className="animate-pulse w-full h-full bg-white/20" />
              ) : (
                <AvatarFallback className="bg-transparent text-white text-lg font-bold flex items-center justify-center">
                  {user?.initials || ""}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="min-w-0 flex-1">
              {isLoading ? (
                <div className="space-y-2">
                  <Shimmer className="h-5 w-32 bg-white/20" />
                  <Shimmer className="h-3 w-48 bg-white/15" />
                  <div className="flex gap-2 mt-2">
                    <Shimmer className="h-5 w-14 bg-white/15" />
                    <Shimmer className="h-5 w-16 bg-white/15" />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-extrabold tracking-tight truncate">
                    {user?.fullName}
                  </h2>
                  <p className="text-xs text-white/70 font-semibold mt-1 truncate">
                    {user?.email}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3.5 select-none">
                    <Badge className="bg-white/15 hover:bg-white/15 text-white text-[10px] uppercase tracking-wider font-bold border-0 rounded px-1.5 py-0.5">
                      {user?.role}
                    </Badge>
                    <Badge className="bg-white/15 hover:bg-white/15 text-white text-[10px] uppercase tracking-wider font-bold border-0 rounded px-1.5 py-0.5 flex items-center gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${isSuspended ? "bg-red-400" : "bg-emerald-400"}`} />
                      {displayStatus}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable details content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Metric Card Helper */}
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <Card key={idx} className="bg-zinc-50/50 border border-zinc-100 p-4 text-center rounded-xl shadow-none flex flex-col items-center justify-center space-y-2">
                  <Shimmer className="h-3 w-20 bg-zinc-200" />
                  <Shimmer className="h-6 w-12 bg-zinc-200" />
                </Card>
              ))
            ) : (
              <>
                {/* Applications */}
                <Card className="bg-zinc-50/50 border border-zinc-100 p-4 text-center rounded-xl shadow-none">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Applications
                  </p>
                  <p className="text-xl font-extrabold text-zinc-800 mt-2">
                    {user?.applications}
                  </p>
                </Card>

                {/* Credit Score */}
                <Card className="bg-zinc-50/50 border border-zinc-100 p-4 text-center rounded-xl shadow-none">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Credit Score
                  </p>
                  <p className="text-xl font-extrabold text-zinc-800 mt-2">
                    {user?.creditScore}
                  </p>
                </Card>

                {/* Income */}
                <Card className="bg-zinc-50/50 border border-zinc-100 p-4 text-center rounded-xl shadow-none">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Annual Income
                  </p>
                  <p className="text-xl font-extrabold text-zinc-800 mt-2">
                    {user?.income}
                  </p>
                </Card>

                {/* Member Since */}
                <Card className="bg-zinc-50/50 border border-zinc-100 p-4 text-center rounded-xl shadow-none">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Member Since
                  </p>
                  <p className="text-sm font-extrabold text-zinc-800 mt-3.5">
                    {user?.memberSince}
                  </p>
                </Card>
              </>
            )}
          </div>

          {/* Details list */}
          <div className="space-y-5.5">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <Shimmer className="h-8 w-8 rounded-lg bg-zinc-200" />
                  <div className="space-y-1.5 flex-1 mt-0.5">
                    <Shimmer className="h-2.5 w-14 bg-zinc-200" />
                    <Shimmer className="h-4 w-40 bg-zinc-200" />
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Phone
                    </p>
                    <p className="text-sm font-bold text-zinc-700 mt-1 truncate">
                      {user?.phone}
                    </p>
                  </div>
                </div>

                {/* Employer */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 shrink-0">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Employer
                    </p>
                    <p className="text-sm font-bold text-zinc-700 mt-1 truncate">
                      {user?.employer}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Address
                    </p>
                    <p className="text-sm font-bold text-zinc-700 mt-1 leading-relaxed">
                      {user?.address}
                    </p>
                  </div>
                </div>

                {/* Employment */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Employment
                    </p>
                    <p className="text-sm font-bold text-zinc-700 mt-1 capitalize truncate">
                      {user?.employment}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50/30 flex items-center gap-3">
          {isLoading ? (
            <Shimmer className="h-11 flex-1 rounded-xl bg-zinc-200" />
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={onToggleSuspend}
              className="flex-1 border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-11 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {isSuspended ? (
                <>
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                  Activate
                </>
              ) : (
                <>
                  <UserX className="h-4 w-4 text-zinc-500" />
                  Suspend
                </>
              )}
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
