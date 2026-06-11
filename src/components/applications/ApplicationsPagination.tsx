import React from "react";
import Pagination from "@/components/ui/pagination";

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
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={filteredCount}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
    />
  );
}
