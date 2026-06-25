"use client";

import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ThisMonthData {
  applications_reviewed: number;
  approved: number;
  rejected: number;
  pending_review: number;
}

interface ActivitySnapshotProps {
  thisMonthData: ThisMonthData;
}

export default function ActivitySnapshot({ thisMonthData }: ActivitySnapshotProps) {
  const {
    applications_reviewed = 0,
    approved = 0,
    rejected = 0,
    pending_review = 0,
  } = thisMonthData;

  const approvedRate = applications_reviewed > 0 
    ? Math.round((approved / applications_reviewed) * 100)
    : 0;

  const rejectedRate = applications_reviewed > 0 
    ? Math.round((rejected / applications_reviewed) * 100)
    : 0;

  return (
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
          <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">
            Applications reviewed
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-800 text-sm">{applications_reviewed}</span>
          </div>
        </div>

        {/* Item 2: Approved */}
        <div className="py-3.5 flex items-center justify-between gap-2">
          <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Approved</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-800 text-sm">{approved}</span>
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold text-[10px]">
              {approvedRate}%
            </span>
          </div>
        </div>

        {/* Item 3: Rejected */}
        <div className="py-3.5 flex items-center justify-between gap-2">
          <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Rejected</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-800 text-sm">{rejected}</span>
            <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded font-bold text-[10px]">
              {rejectedRate}%
            </span>
          </div>
        </div>

        {/* Item 4: Pending review */}
        <div className="py-3.5 last:pb-0 flex items-center justify-between gap-2">
          <span className="font-semibold text-zinc-400 text-[11px] tracking-wide">Pending review</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-800 text-sm">{pending_review}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
