import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalCountLabel?: string;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export default function Pagination({
  totalCountLabel,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPrev,
  onNext,
  className,
}: PaginationProps) {
  // Compute text label
  let displayLabel = totalCountLabel || "";
  if (!displayLabel && totalItems !== undefined && itemsPerPage !== undefined) {
    const start = Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1);
    const end = Math.min(totalItems, currentPage * itemsPerPage);
    displayLabel = `Showing ${start}-${end} of ${totalItems}`;
  }

  // Page navigation triggers
  const handlePrev = () => {
    if (onPageChange) onPageChange(Math.max(currentPage - 1, 1));
    else if (onPrev) onPrev();
  };

  const handleNext = () => {
    if (onPageChange) onPageChange(Math.min(currentPage + 1, totalPages));
    else if (onNext) onNext();
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  // Generate page numbers array (for numeric navigation)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      } else if (currentPage === 3) {
        pages.push(2);
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      } else if (currentPage === totalPages - 2) {
        pages.push(totalPages - 1);
      }
      
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 text-sm text-zinc-500", className)}>
      {displayLabel && (
        <div className="font-semibold text-zinc-400">
          {displayLabel}
        </div>
      )}

      <div className="flex items-center gap-1.5 font-bold text-zinc-500">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {onPageChange && getPageNumbers().map((page, idx) => {
          if (page === "...") {
            return (
              <span key={`dots-${idx}`} className="px-1 text-zinc-300 select-none">
                ...
              </span>
            );
          }
          const isSelected = currentPage === page;
          return (
            <button
              type="button"
              key={`page-${page}`}
              onClick={() => onPageChange(Number(page))}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer",
                isSelected
                  ? "bg-zinc-900 text-white shadow-xs font-bold"
                  : "hover:bg-zinc-100 hover:text-zinc-800 text-zinc-500 font-semibold"
              )}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
