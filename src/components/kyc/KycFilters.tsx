"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";

interface KycFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilter: (status: string) => void;
  onResetFilters: () => void;
}

const statusOptions = [
  { label: "All Requests", value: "" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function KycFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilter,
  onResetFilters,
}: KycFiltersProps) {
  const hasActiveFilters = searchQuery !== "" || statusFilter !== "";

  return (
    <div className="bg-white rounded-2xl p-4 border border-zinc-200/60 shadow-xs flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by customer name or email..."
          value={searchQuery}
          onChange={onSearchChange}
          className="h-11 w-full rounded-xl border border-zinc-200 pl-11 pr-4 text-sm text-zinc-900 shadow-3xs placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent transition-all"
        />
      </div>

      {/* Segmented Status Tabs & Reset */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-zinc-100/70 p-1 rounded-xl border border-zinc-200/40">
          {statusOptions.map((opt) => {
            const isActive = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onStatusFilter(opt.value)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-dashed border-zinc-300 text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
