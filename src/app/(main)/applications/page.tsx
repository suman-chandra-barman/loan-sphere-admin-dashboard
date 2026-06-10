"use client";

import React from "react";
import { useApplications, ITEMS_PER_PAGE } from "@/hooks/useApplications";
import ApplicationsHeader from "@/components/applications/ApplicationsHeader";
import ApplicationsFilters from "@/components/applications/ApplicationsFilters";
import ApplicationsTable from "@/components/applications/ApplicationsTable";
import ApplicationsPagination from "@/components/applications/ApplicationsPagination";
import ApplicationDetailDrawer from "@/components/applications/ApplicationDetailDrawer";

export default function ApplicationsPage() {
  const {
    searchQuery,
    statusFilter,
    typeFilter,
    isFiltersOpen,
    currentPage,
    filteredApplications,
    totalPages,
    paginatedApplications,
    selectedApp,
    handleSearchChange,
    handleStatusFilter,
    handleTypeFilter,
    handleResetFilters,
    toggleFiltersPanel,
    setCurrentPage,
    setSelectedAppCode,
    handleUpdateStatus,
    handleToggleChecklist,
  } = useApplications();

  return (
    <div className="space-y-6 pb-12 relative min-h-screen">
      {/* Header section */}
      <ApplicationsHeader filteredCount={filteredApplications.length} />

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
        applications={paginatedApplications}
        onSelectApp={(code) => setSelectedAppCode(code)}
      />

      {/* Pagination Footer */}
      {filteredApplications.length > 0 && (
        <ApplicationsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          filteredCount={filteredApplications.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Slide-out Drawer Panel overlay & Container */}
      {selectedApp && (
        <ApplicationDetailDrawer
          selectedApp={selectedApp}
          onClose={() => setSelectedAppCode(null)}
          onUpdateStatus={handleUpdateStatus}
          onToggleChecklist={handleToggleChecklist}
        />
      )}
    </div>
  );
}
