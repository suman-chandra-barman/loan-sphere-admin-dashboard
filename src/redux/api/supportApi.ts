import { baseApi } from "@/redux/api/baseApi";
import type {
  CaseManagersResponse,
  SingleCaseManagerResponse,
  CreateCaseManagerParams,
  UpdateCaseManagerParams,
  AvailabilityListResponse,
  CreateAvailabilityParams,
  UpdateAvailabilityRuleParams,
  AvailabilityRuleUpdateResponse,
  AppointmentsResponse,
  SingleAppointmentResponse,
  UpdateAppointmentStatusParams,
} from "@/types/support";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCaseManagers: builder.query<CaseManagersResponse, void>({
      query: () => ({
        url: "/admin/support/case-managers/",
        method: "GET",
      }),
      providesTags: ["CaseManagers"],
    }),
    createCaseManager: builder.mutation<SingleCaseManagerResponse, CreateCaseManagerParams>({
      query: (body) => ({
        url: "/admin/support/case-managers/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CaseManagers"],
    }),
    updateCaseManager: builder.mutation<SingleCaseManagerResponse, UpdateCaseManagerParams>({
      query: ({ id, ...body }) => ({
        url: `/admin/support/case-managers/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "CaseManagers",
        "ManagerAvailability",
      ],
    }),
    getAvailability: builder.query<AvailabilityListResponse, string>({
      query: (managerId) => ({
        url: `/admin/support/case-managers/${managerId}/availability/`,
        method: "GET",
      }),
      providesTags: ["ManagerAvailability"],
    }),
    createAvailability: builder.mutation<AvailabilityListResponse, { managerId: string; body: CreateAvailabilityParams }>({
      query: ({ managerId, body }) => ({
        url: `/admin/support/case-managers/${managerId}/availability/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ManagerAvailability"],
    }),
    updateAvailabilityRule: builder.mutation<AvailabilityRuleUpdateResponse, UpdateAvailabilityRuleParams>({
      query: ({ ruleId, ...body }) => ({
        url: `/admin/support/availability/${ruleId}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ManagerAvailability"],
    }),
    getAppointments: builder.query<AppointmentsResponse, void>({
      query: () => ({
        url: "/admin/support/appointments/",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    updateAppointmentStatus: builder.mutation<SingleAppointmentResponse, UpdateAppointmentStatusParams>({
      query: ({ id, status }) => ({
        url: `/admin/support/appointments/${id}/status/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetCaseManagersQuery,
  useCreateCaseManagerMutation,
  useUpdateCaseManagerMutation,
  useGetAvailabilityQuery,
  useCreateAvailabilityMutation,
  useUpdateAvailabilityRuleMutation,
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} = supportApi;
