"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useGetApplicationsListQuery } from "@/redux/api/applicationsApi";
import ApplicationsHeader from "@/components/applications/ApplicationsHeader";
import ApplicationsFilters from "@/components/applications/ApplicationsFilters";
import ApplicationsTable from "@/components/applications/ApplicationsTable";
import ApplicationsPagination from "@/components/applications/ApplicationsPagination";
import ApplicationDetailDrawer from "@/components/applications/ApplicationDetailDrawer";

export const ITEMS_PER_PAGE = 8;

const mapFilterValue = (val: string) => {
  if (!val || val === "All") return "";
  return val.toLowerCase().replace(/[\s.-]+/g, "_");
};

export default function ApplicationsPage() {
  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Map state to query params
  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
    status: mapFilterValue(statusFilter) || undefined,
    loan_type: mapFilterValue(typeFilter) || undefined,
  };

  const { data, isLoading, error, refetch, isFetching } = useGetApplicationsListQuery(queryParams);

  const applicationsList = data?.data || [];
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

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  const toggleFiltersPanel = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  if (error) {
    return (
      <div className="space-y-6 pb-12 min-h-screen">
        <ApplicationsHeader filteredCount={0} />
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-200/60 shadow-sm rounded-2xl min-h-[350px] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900">Error Loading Applications</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              We encountered a problem fetching the applications list. Please verify your connection or session and try again.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer mt-2"
          >
            <span>Retry Fetching</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 relative min-h-screen">
      {/* Header section with background refresh indicator */}
      <div className="flex justify-between items-center">
        <ApplicationsHeader filteredCount={totalCount} />
        {isFetching && !isLoading && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-xs">
            <RefreshCw className="h-4 w-4 animate-spin text-zinc-400" />
          </div>
        )}
      </div>

      {/* Search and Filters Panel */}
      <ApplicationsFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        isFiltersOpen={isFiltersOpen}
        onSearchChange={handleSearchChange}
        onStatusFilter={handleStatusFilter}
        onTypeFilter={handleTypeFilter}
        onResetFilters={handleResetFilters}
        onToggleFilters={toggleFiltersPanel}
      />

      {/* Applications Table Card */}
      <ApplicationsTable
        applications={applicationsList}
        onSelectApp={(id) => setSelectedAppId(id)}
        isLoading={isLoading}
      />

      {/* Pagination Footer */}
      {!isLoading && totalCount > 0 && (
        <ApplicationsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          filteredCount={totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Slide-out Drawer Panel overlay & Container */}
      {selectedAppId && (
        <ApplicationDetailDrawer
          selectedAppId={selectedAppId}
          onClose={() => setSelectedAppId(null)}
        />
      )}
    </div>
  );
}
