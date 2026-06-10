import React from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
import { UNIQUE_STATUSES, UNIQUE_TYPES } from "@/hooks/useApplications";

interface ApplicationsFiltersProps {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  isFiltersOpen: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilter: (status: string) => void;
  onTypeFilter: (type: string) => void;
  onResetFilters: () => void;
  onToggleFilters: () => void;
}

export default function ApplicationsFilters({
  searchQuery,
  statusFilter,
  typeFilter,
  isFiltersOpen,
  onSearchChange,
  onStatusFilter,
  onTypeFilter,
  onResetFilters,
  onToggleFilters,
}: ApplicationsFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-zinc-200/60 shadow-xs flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or application number..."
            value={searchQuery}
            onChange={onSearchChange}
            className="h-11 w-full rounded-xl border border-zinc-200 pl-11 pr-4 text-sm text-zinc-900 shadow-3xs placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent transition-all"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 h-11 px-4.5 rounded-xl border text-sm font-bold shadow-3xs transition-all hover:bg-zinc-50 cursor-pointer ${
            isFiltersOpen || statusFilter !== "All" || typeFilter !== "All"
              ? "bg-zinc-50 border-indigo-900 text-indigo-900"
              : "bg-white border-zinc-200 text-zinc-700"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {(statusFilter !== "All" || typeFilter !== "All") && (
            <span className="flex h-2 w-2 rounded-full bg-indigo-900" />
          )}
        </button>
      </div>

      {/* Dropdown Filters Panel */}
      {isFiltersOpen && (
        <div className="pt-2 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilter(e.target.value)}
              className="w-full h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent"
            >
              {UNIQUE_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Loan Type</label>
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilter(e.target.value)}
              className="w-full h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent"
            >
              {UNIQUE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end pb-0.5">
            {(statusFilter !== "All" || typeFilter !== "All" || searchQuery !== "") && (
              <button
                onClick={onResetFilters}
                className="h-10 px-4 rounded-xl border border-dashed border-zinc-300 text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 transition-colors cursor-pointer w-full flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Clear Active Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
