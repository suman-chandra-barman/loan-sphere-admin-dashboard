import { useState } from "react";
import { useGetAdminUsersQuery } from "@/redux/features/users/usersApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slices/authSlice";
import { type FiltersState } from "@/components/users/UsersFilters";

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

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAdminUsersQuery(
      {
        search: filters.search || undefined,
        plan: filters.plan !== "all" ? filters.plan : undefined,
        status: filters.status !== "all" ? filters.status : undefined,
        page,
        page_size: 10,
      },
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
