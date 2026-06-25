import { useState, useMemo } from "react";
import { useGetAdminUsersQuery } from "@/redux/features/users/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slices/authSlice";
import { type FiltersState } from "@/components/users/UsersFilters";
import { ListUsersParams } from "@/types/adminUser";

export function useUsersPage() {
  const token = useAppSelector(selectCurrentToken);

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    plan: "all",
    status: "all",
  });
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever filters change
  function handleFiltersChange(next: FiltersState) {
    setFilters(next);
    setPage(1);
  }

  const queryParams: ListUsersParams = useMemo(() => {
    return {
      page,
      limit: 10,
      search: filters.search || undefined,
      status: ["active", "suspended"].includes(filters.status) ? filters.status : undefined,
      role: ["admin", "customer"].includes(filters.status) ? filters.status : undefined,
    };
  }, [filters, page]);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAdminUsersQuery(
      queryParams,
      { skip: !token },
    );

  const loading = !token || isLoading || isFetching;
  const usersData = data?.data;

  return {
    filters,
    page,
    handleFiltersChange,
    setPage,
    loading,
    usersData,
    isError,
    refetch,
  };
}
