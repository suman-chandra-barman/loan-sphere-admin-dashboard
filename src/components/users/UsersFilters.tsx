"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface FiltersState {
  search: string;
  plan: string;
  status: string;
}

interface UsersFiltersProps {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
}

export default function UsersFilters({ filters, onChange }: UsersFiltersProps) {
  const [inputValue, setInputValue] = useState(filters.search);

  // Debounce the search input
  useEffect(() => {
    const id = setTimeout(() => {
      if (inputValue !== filters.search) {
        onChange({ ...filters, search: inputValue });
      }
    }, 400);
    return () => clearTimeout(id);
  }, [inputValue, filters, onChange]);

  // If external filters reset, sync search input state
  useEffect(() => {
    setInputValue(filters.search);
  }, [filters.search]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search Input Box */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400" />
        <Input
          className="pl-10 pr-10 border border-zinc-200/80 bg-white shadow-xs rounded-xl h-11 text-sm text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#A31D1D] focus-visible:ring-offset-2"
          placeholder="Search by name or email..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
              onChange({ ...filters, search: "" });
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Single Dropdown Status Filter on the Right */}
      <div className="w-full sm:w-[160px] shrink-0">
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm font-semibold text-zinc-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#A31D1D] cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
      </div>
    </div>
  );
}
