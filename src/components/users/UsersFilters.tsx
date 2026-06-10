"use client";

import { useEffect, useState } from "react";
import { Filter, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FiltersState {
  search: string;
  plan: string;
  status: string;
}

interface Props {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
  onExport?: () => void;
}

export default function UsersFilters({ filters, onChange, onExport }: Props) {
  // Debounce the search input so we don't fire a request on every keystroke
  const [inputValue, setInputValue] = useState(filters.search);

  useEffect(() => {
    const id = setTimeout(() => {
      if (inputValue !== filters.search) {
        onChange({ ...filters, search: inputValue });
      }
    }, 400);
    return () => clearTimeout(id);
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasActiveFilters =
    filters.search !== "" ||
    filters.plan !== "all" ||
    filters.status !== "all";

  function reset() {
    setInputValue("");
    onChange({ search: "", plan: "all", status: "all" });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          className="pl-9 pr-9"
          placeholder="Search by name or email…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
              onChange({ ...filters, search: "" });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Plan filter */}
      <div className="min-w-[140px]">
        <Select
          value={filters.plan}
          onValueChange={(val) => onChange({ ...filters, plan: val, search: inputValue })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="basic_family">Basic Family</SelectItem>
            <SelectItem value="premium_family">Premium Family</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status filter */}
      <div className="min-w-[140px]">
        <Select
          value={filters.status}
          onValueChange={(val) => onChange({ ...filters, status: val, search: inputValue })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="gap-1.5 text-zinc-500 hover:text-zinc-900"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}
