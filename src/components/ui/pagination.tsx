import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalCountLabel: string;
  currentPage?: number;
  totalPages?: number;
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Pagination({
  totalCountLabel,
  currentPage = 1,
  totalPages = 10,
  className,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-500",
        className,
      )}
    >
      <span>{totalCountLabel}</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          disabled={currentPage <= 1}
          onClick={onPrev}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          disabled={currentPage >= totalPages}
          onClick={onNext}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
