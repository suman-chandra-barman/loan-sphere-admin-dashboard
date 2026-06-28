import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPage: number;
  total: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPage,
  total,
  limit,
  onPrev,
  onNext,
}: PaginationProps) {
  if (totalPage <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-xs font-semibold text-zinc-400">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={onPrev}
          className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-zinc-200 text-sm font-semibold text-zinc-600 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>
        <span className="text-xs font-bold text-zinc-500 px-2">
          {page} / {totalPage}
        </span>
        <button
          disabled={page >= totalPage}
          onClick={onNext}
          className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-zinc-200 text-sm font-semibold text-zinc-600 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
