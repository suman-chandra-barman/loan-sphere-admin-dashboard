"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useGetKycListQuery } from "@/redux/api/kycApi";
import KycSummaryCards from "@/components/kyc/KycSummaryCards";
import KycFilters from "@/components/kyc/KycFilters";
import KycTable from "@/components/kyc/KycTable";
import Pagination from "@/components/ui/pagination";
import ErrorState from "@/components/ui/ErrorState";

const ITEMS_PER_PAGE = 10;

export default function KycPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    status: statusFilter || undefined,
    search: searchQuery || undefined,
  };

  const { data, isLoading, error, refetch, isFetching } = useGetKycListQuery(queryParams);

  const summary = data?.data?.summary || {
    total: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
  };
  const verificationsList = data?.data?.kycVerifications || [];
  const totalCount = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPage ?? 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="space-y-6 pb-12 min-h-screen">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">KYC Verification</h1>
          <p className="text-zinc-500 text-sm font-semibold">Verify identity documents and customer selfies</p>
        </div>
        <ErrorState
          title="Error Loading KYC Verification Requests"
          description="We encountered a problem fetching the KYC applications list. Please check your credentials or network and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 relative min-h-screen">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">KYC Verification</h1>
          <p className="text-zinc-500 text-sm font-semibold">Verify identity documents and customer selfies</p>
        </div>
        {isFetching && !isLoading && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-xs">
            <RefreshCw className="h-4 w-4 animate-spin text-zinc-400" />
          </div>
        )}
      </div>

      {/* Stats Summary Cards */}
      <KycSummaryCards summary={summary} />

      {/* Filters bar */}
      <KycFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={handleSearchChange}
        onStatusFilter={handleStatusFilter}
        onResetFilters={handleResetFilters}
      />

      {/* Data Table */}
      <KycTable verifications={verificationsList} isLoading={isLoading} />

      {/* Pagination Footer */}
      {!isLoading && totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
