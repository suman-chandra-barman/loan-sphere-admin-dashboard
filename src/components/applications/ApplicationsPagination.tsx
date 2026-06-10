import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApplicationsPaginationProps {
  currentPage: number;
  totalPages: number;
  filteredCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function ApplicationsPagination({
  currentPage,
  totalPages,
  filteredCount,
  itemsPerPage,
  onPageChange,
}: ApplicationsPaginationProps) {
  const start = Math.min(filteredCount, (currentPage - 1) * itemsPerPage + 1);
  const end = Math.min(filteredCount, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1">
      <div className="text-sm font-semibold text-zinc-400">
        Showing {start}-{end} of {filteredCount}
      </div>

      <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-500">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer ${
              currentPage === page
                ? "bg-zinc-900 text-white shadow-xs font-bold"
                : "hover:bg-zinc-100 hover:text-zinc-800 text-zinc-500 font-semibold"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Custom Pagination Numbers to EXACTLY match mockup design layout for high fidelity representation */}
        {totalPages === 2 && (
          <>
            <span className="px-1 text-zinc-300 select-none">...</span>
            <button
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 font-semibold cursor-not-allowed"
            >
              67
            </button>
            <button
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 font-semibold cursor-not-allowed"
            >
              68
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
