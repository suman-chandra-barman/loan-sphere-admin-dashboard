import { baseApi } from "@/redux/api/baseApi";
import type { KycListResponse, KycDetailsResponse, KycListParams, KycUpdateParams } from "@/types/kyc";

export const kycApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKycList: builder.query<KycListResponse, KycListParams | void>({
      query: (params) => ({
        url: "/admin/kyc/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["KycList"],
    }),
    getKycDetails: builder.query<KycDetailsResponse, string>({
      query: (id) => ({
        url: `/admin/kyc/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "KycDetails", id }],
    }),
    updateKycStatus: builder.mutation<KycDetailsResponse, KycUpdateParams>({
      query: ({ id, status, note }) => ({
        url: `/admin/kyc/${id}/status/`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: (result, error, { id }) => [
        "KycList",
        { type: "KycDetails", id },
      ],
    }),
  }),
});

export const {
  useGetKycListQuery,
  useGetKycDetailsQuery,
  useUpdateKycStatusMutation,
} = kycApi;
