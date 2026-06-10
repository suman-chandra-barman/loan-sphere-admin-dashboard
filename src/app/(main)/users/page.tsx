"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { useUsersPage } from "@/hooks/useUsersPage";

import UsersFilters from "@/components/users/UsersFilters";
import UsersSummary from "@/components/users/UsersSummary";
import UsersTable from "@/components/users/UsersTable";
import {
  UsersSummarySkeleton,
  UsersFiltersSkeleton,
  UsersTableSkeleton,
} from "@/components/users/UsersSkeletons";

// ── Page ──────────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const {
    filters,
    page,
    handleFiltersChange,
    setPage,
    loading,
    usersData,
    isError,
    refetch,
  } = useUsersPage();

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Users</h1>
          <p className="mt-0.5 text-sm text-zinc-500">
            Manage and monitor all registered users.
          </p>
        </div>

        {usersData && (() => {
          const { total_users, filtered_count, showing, page, page_size, total_pages } = usersData.summary;
          const start = (page - 1) * page_size + 1;
          const end = start - 1 + showing;
          return (
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-800">
                {total_users.toLocaleString()} total users
              </span>
              <span className="text-zinc-300">|</span>
              <span>
                Showing{" "}
                <span className="font-medium text-zinc-700">{start}–{end}</span>{" "}
                of{" "}
                <span className="font-medium text-zinc-700">{filtered_count.toLocaleString()}</span>{" "}
                results
              </span>
              {total_pages > 1 && (
                <>
                  <span className="text-zinc-300">|</span>
                  <span>
                    Page{" "}
                    <span className="font-medium text-zinc-700">{page}</span>{" "}
                    of{" "}
                    <span className="font-medium text-zinc-700">{total_pages}</span>
                  </span>
                </>
              )}
            </div>
          );
        })()}
      </div>

      {/* ── Error state ── */}
      {isError && !loading && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            Failed to load users.{" "}
            <button
              onClick={() => refetch()}
              className="font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </span>
        </div>
      )}

      {/* ── Summary bar ── */}
      {loading ? (
        <UsersSummarySkeleton />
      ) : (
        usersData && <UsersSummary summary={usersData.summary} />
      )}

      {/* ── Filters ── */}
      {loading ? (
        <UsersFiltersSkeleton />
      ) : (
        <UsersFilters filters={filters} onChange={handleFiltersChange} />
      )}

      {/* ── Table ── */}
      {loading ? (
        <UsersTableSkeleton />
      ) : (
        usersData && (
          <UsersTable
            users={usersData.results}
            summary={usersData.summary}
            onPageChange={setPage}
          />
        )
      )}
    </div>
  );
}
