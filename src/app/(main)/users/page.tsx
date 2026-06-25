"use client";

import React, { useState, useMemo } from "react";
import ErrorState from "@/components/ui/ErrorState";
import { toast } from "react-toastify";
import { RefreshCw } from "lucide-react";
import UsersFilters, { FiltersState } from "@/components/users/UsersFilters";
import UsersStatsCards from "@/components/users/UsersStatsCards";
import UserCard from "@/components/users/UserCard";
import UserDetailDrawer from "@/components/users/UserDetailDrawer";
import Pagination from "@/components/ui/pagination";
import { StaticUser } from "@/types/user";
import { ListUsersParams } from "@/types/adminUser";
import {
  useGetAdminUsersQuery,
  useGetAdminUserDetailQuery,
  useSuspendUserMutation,
  useActivateUserMutation,
} from "@/redux/features/users/usersApi";
import {
  UsersSummarySkeleton,
  UsersFiltersSkeleton,
  UsersTableSkeleton,
} from "@/components/users/UsersSkeletons";

export default function UsersPage() {
  // Search and Filter states
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    plan: "all",
    status: "all",
  });
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Map FilterState dropdown selection to backend queries
  const queryParams: ListUsersParams = useMemo(() => {
    return {
      page,
      limit: 8,
      search: filters.search || undefined,
      status: ["active", "suspended"].includes(filters.status) ? filters.status : undefined,
      role: ["admin", "customer"].includes(filters.status) ? filters.status : undefined,
    };
  }, [filters, page]);

  // Queries and mutations
  const {
    data: usersResponse,
    isLoading: isListLoading,
    isFetching: isListFetching,
    error: listError,
    refetch,
  } = useGetAdminUsersQuery(queryParams);

  const {
    data: detailResponse,
    isFetching: isDetailFetching,
  } = useGetAdminUserDetailQuery(selectedUserId || "", {
    skip: !selectedUserId,
  });

  const [suspendUser] = useSuspendUserMutation();
  const [activateUser] = useActivateUserMutation();

  // Toggle Suspend / Active status via endpoints
  const handleToggleSuspend = async (userId: string, isCurrentlySuspended: boolean) => {
    try {
      if (isCurrentlySuspended) {
        await activateUser(userId).unwrap();
        toast.success("User activated successfully");
      } else {
        await suspendUser(userId).unwrap();
        toast.success("User suspended successfully");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user status");
    }
  };

  // Handle filter changes (Reset page to 1 on filters update)
  const handleFiltersChange = (nextFilters: FiltersState) => {
    setFilters(nextFilters);
    setPage(1);
  };

  // Map ListUserItems from API to match StaticUser props
  const mappedUsers = useMemo(() => {
    const list = usersResponse?.data?.users || [];
    return list.map((u) => ({
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      initials: u.initials,
      role: u.role as any,
      status: u.status === "active" ? ("active" as const) : ("inactive" as const),
      profileImage: null,
      phone: u.phone || "",
      employer: u.employmentDisplay || "",
      address: "",
      employment: u.employmentDisplay || "",
      income: u.annualIncomeDisplay || "",
      memberSince: u.memberSince || "",
      creditScore: u.creditScoreDisplay || "—",
      applications: u.applicationsCount || 0,
      joined: u.joined || "",
    }));
  }, [usersResponse]);

  // Map user detail object for details Drawer
  const selectedUser = useMemo(() => {
    if (!selectedUserId || !detailResponse?.data) return null;
    const detail = detailResponse.data;
    return {
      id: detail.id,
      fullName: detail.fullName,
      email: detail.email,
      initials: detail.initials,
      role: detail.role as any,
      status: detail.status === "active" ? ("active" as const) : ("inactive" as const),
      profileImage: null,
      phone: detail.profile?.phone || "—",
      employer: detail.profile?.employer || "—",
      address: detail.profile?.address || "—",
      employment: detail.profile?.employmentDisplay || "—",
      income: detail.stats?.annualIncomeDisplay || "—",
      memberSince: detail.stats?.memberSince || "—",
      creditScore: detail.stats?.creditScoreDisplay || "—",
      applications: detail.stats?.applications || 0,
      joined: detail.joined || "—",
    };
  }, [selectedUserId, detailResponse]);

  // Extract statistics from metadata summary
  const stats = useMemo(() => {
    const summary = usersResponse?.meta?.summary;
    if (summary) {
      return {
        total: summary.totalUsers,
        customers: summary.customers,
        admins: summary.administrators,
      };
    }
    return { total: 0, customers: 0, admins: 0 };
  }, [usersResponse]);

  const totalPages = usersResponse?.meta?.totalPage || 1;

  if (listError) {
    return (
      <div className="space-y-6 pb-12 min-h-screen relative">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Users
          </h1>
        </div>

        <ErrorState
          title="Error Loading Users"
          description="We encountered a problem fetching the users list. Please check your network connection or session and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 min-h-screen relative">
      {/* ── Header ── */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Users
          </h1>
          <p className="mt-1 text-xs font-semibold text-zinc-400">
            {isListLoading ? "Loading users..." : `${stats.total} users in the system`}
          </p>
        </div>

        {isListFetching && !isListLoading && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-xs">
            <RefreshCw className="h-4 w-4 animate-spin text-zinc-400" />
          </div>
        )}
      </div>

      {/* ── Stats Row ── */}
      {isListLoading ? (
        <UsersSummarySkeleton />
      ) : (
        <UsersStatsCards
          totalUsers={stats.total}
          customersCount={stats.customers}
          adminsCount={stats.admins}
        />
      )}

      {/* ── Filters ── */}
      {isListLoading ? (
        <UsersFiltersSkeleton />
      ) : (
        <UsersFilters filters={filters} onChange={handleFiltersChange} />
      )}

      {/* ── Cards Grid ── */}
      {isListLoading || isListFetching ? (
        <UsersTableSkeleton />
      ) : (
        <div className="space-y-6">
          {mappedUsers.length === 0 ? (
            <div className="py-16 text-center text-sm text-zinc-400 bg-white rounded-2xl border border-zinc-200/60 shadow-xs">
              No users match your filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mappedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={() => setSelectedUserId(user.id)}
                />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="pt-4 flex justify-center sm:justify-end">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalCountLabel="" // Center styled numeric page controls
              />
            </div>
          )}
        </div>
      )}

      {/* ── Drawer Detail Overlay ── */}
      {selectedUserId && (
        <UserDetailDrawer
          user={selectedUser}
          isLoading={isDetailFetching}
          onClose={() => setSelectedUserId(null)}
          onToggleSuspend={() => handleToggleSuspend(selectedUserId, selectedUser?.status === "inactive")}
        />
      )}
    </div>
  );
}
