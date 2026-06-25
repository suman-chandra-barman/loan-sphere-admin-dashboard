import { baseApi } from "@/redux/api/baseApi";
import type {
  ApplicationsResponse,
  ApplicationDetailResponse,
  ListApplicationsParams,
} from "@/types/adminApplication";

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationsList: builder.query<ApplicationsResponse, ListApplicationsParams | void>({
      query: (params) => ({
        url: "/admin/applications/",
        method: "GET",
        params: params || undefined,
      }),
    }),
    getApplicationDetails: builder.query<ApplicationDetailResponse, string>({
      query: (id) => ({
        url: `/admin/applications/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetApplicationsListQuery, useGetApplicationDetailsQuery } = applicationsApi;
