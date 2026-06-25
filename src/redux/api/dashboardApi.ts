import { baseApi } from "@/redux/api/baseApi";
import type { DashboardResponse } from "@/types/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/admin/dashboard/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
