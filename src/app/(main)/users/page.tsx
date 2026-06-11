"use client";

import React, { useState, useEffect, useMemo } from "react";
import UsersFilters, { FiltersState } from "@/components/users/UsersFilters";
import UsersStatsCards from "@/components/users/UsersStatsCards";
import UserCard from "@/components/users/UserCard";
import UserDetailDrawer from "@/components/users/UserDetailDrawer";
import Pagination from "@/components/ui/pagination";
import { StaticUser } from "@/types/user";
import { MOCK_USERS } from "@/data/mockUsers";
import {
  UsersSummarySkeleton,
  UsersFiltersSkeleton,
  UsersTableSkeleton,
} from "@/components/users/UsersSkeletons";

const ITEMS_PER_PAGE = 6;

export default function UsersPage() {
  const [users, setUsers] = useState<StaticUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter states
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    plan: "all",
    status: "all"
  });
  
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Initialize and load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("static_users");
      if (saved) {
        try {
          setUsers(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse static users", e);
          setUsers(MOCK_USERS);
        }
      } else {
        setUsers(MOCK_USERS);
        localStorage.setItem("static_users", JSON.stringify(MOCK_USERS));
      }

      // Simulate a small loading state for 400ms to show the skeletons
      const timer = setTimeout(() => {
        setLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveUsersState = (updatedUsers: StaticUser[]) => {
    setUsers(updatedUsers);
    if (typeof window !== "undefined") {
      localStorage.setItem("static_users", JSON.stringify(updatedUsers));
    }
  };

  // Toggle Suspend / Active status
  const handleToggleSuspend = (userId: string) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          status: u.status === "active" ? ("inactive" as const) : ("active" as const)
        };
      }
      return u;
    });
    saveUsersState(updated);
  };

  // Handle filter changes (Reset page to 1 on filters update)
  const handleFiltersChange = (nextFilters: FiltersState) => {
    setFilters(nextFilters);
    setPage(1);
  };

  // Filtered list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        u.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "active" && u.status === "active") ||
        (filters.status === "inactive" && u.status === "inactive");

      return matchesSearch && matchesStatus;
    });
  }, [users, filters]);

  // Paginated list
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = useMemo(() => {
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredUsers, page]);

  // Selected User lookup
  const selectedUser = useMemo(() => {
    if (!selectedUserId) return null;
    return users.find((u) => u.id === selectedUserId) || null;
  }, [users, selectedUserId]);

  // Compute stats counts
  const stats = useMemo(() => {
    const total = users.length;
    const adminsCount = users.filter((u) => u.role === "admin").length;
    const customersCount = total - adminsCount;

    return {
      total,
      customers: customersCount,
      admins: adminsCount
    };
  }, [users]);

  return (
    <div className="space-y-6 pb-12 min-h-screen relative">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Users
        </h1>
        <p className="mt-1 text-xs font-semibold text-zinc-400">
          {stats.total} users in the system
        </p>
      </div>

      {/* ── Stats Row ── */}
      {loading ? (
        <UsersSummarySkeleton />
      ) : (
        <UsersStatsCards
          totalUsers={stats.total}
          customersCount={stats.customers}
          adminsCount={stats.admins}
        />
      )}

      {/* ── Filters ── */}
      {loading ? (
        <UsersFiltersSkeleton />
      ) : (
        <UsersFilters filters={filters} onChange={handleFiltersChange} />
      )}

      {/* ── Cards Grid ── */}
      {loading ? (
        <UsersTableSkeleton />
      ) : (
        <div className="space-y-6">
          {filteredUsers.length === 0 ? (
            <div className="py-16 text-center text-sm text-zinc-400 bg-white rounded-2xl border border-zinc-200/60 shadow-xs">
              No users match your filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedUsers.map((user) => (
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
      {selectedUser && (
        <UserDetailDrawer
          user={selectedUser}
          onClose={() => setSelectedUserId(null)}
          onToggleSuspend={() => handleToggleSuspend(selectedUser.id)}
        />
      )}
    </div>
  );
}
