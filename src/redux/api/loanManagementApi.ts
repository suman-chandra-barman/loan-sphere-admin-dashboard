import { baseApi } from "@/redux/api/baseApi";
import type {
  LoanManagementSummaryResponse,
  LoanTypesListResponse,
  LoanTypesParams,
  LoanTypeToggleResponse,
  LoanTemplatesListResponse,
  LoanTemplatesParams,
  LoanTemplateDetailResponse,
  LoanTemplateCreateResponse,
  LoanTemplateSectionResponse,
  TemplateDropdownResponse,
} from "@/types/loan";

export const loanManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Dashboard Summary ──────────────────────────────────────────────────
    getLoanManagementSummary: builder.query<LoanManagementSummaryResponse, void>({
      query: () => ({
        url: "/admin/loan-management/summary/",
        method: "GET",
      }),
      providesTags: ["LoanManagementSummary"],
    }),

    // ── Loan Types ─────────────────────────────────────────────────────────
    getLoanTypes: builder.query<LoanTypesListResponse, LoanTypesParams | void>({
      query: (params) => ({
        url: "/admin/loan-types/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["LoanTypes"],
    }),

    createLoanType: builder.mutation<{ success: boolean; message: string; data: unknown }, FormData>({
      query: (formData) => ({
        url: "/admin/loan-types/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["LoanTypes", "LoanManagementSummary"],
    }),

    updateLoanType: builder.mutation<{ success: boolean; message: string; data: unknown }, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/loan-types/${id}/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["LoanTypes", "LoanManagementSummary"],
    }),


    toggleLoanTypeStatus: builder.mutation<
      LoanTypeToggleResponse,
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/admin/loan-types/${id}/toggle-status/`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: ["LoanTypes", "LoanManagementSummary"],
    }),

    // ── Loan Templates ─────────────────────────────────────────────────────
    getLoanTemplates: builder.query<LoanTemplatesListResponse, LoanTemplatesParams | void>({
      query: (params) => ({
        url: "/admin/loan-templates/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["LoanTemplates"],
    }),

    getLoanTemplateDetail: builder.query<LoanTemplateDetailResponse, string>({
      query: (id) => ({
        url: `/admin/loan-templates/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "LoanTemplateDetail", id }],
    }),

    createLoanTemplate: builder.mutation<
      LoanTemplateCreateResponse,
      { name: string; description: string; status?: string }
    >({
      query: (body) => ({
        url: "/admin/loan-templates/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LoanTemplates", "LoanManagementSummary"],
    }),

    updateLoanTemplate: builder.mutation<
      { success: boolean; message: string; data: unknown },
      { id: string; name: string; description: string; status: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/loan-templates/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "LoanTemplateDetail", id },
        "LoanTemplates",
        "LoanManagementSummary",
      ],
    }),

    publishLoanTemplate: builder.mutation<LoanTemplateCreateResponse, string>({
      query: (id) => ({
        url: `/admin/loan-templates/${id}/publish/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "LoanTemplateDetail", id },
        "LoanTemplates",
        "LoanManagementSummary",
      ],
    }),


    // ── Template Sections ──────────────────────────────────────────────────
    addTemplateSection: builder.mutation<
      LoanTemplateSectionResponse,
      { templateId: string; title: string; description: string }
    >({
      query: ({ templateId, title, description }) => ({
        url: `/admin/loan-templates/${templateId}/sections/`,
        method: "POST",
        body: { title, description },
      }),
      invalidatesTags: (result, error, { templateId }) => [
        { type: "LoanTemplateDetail", id: templateId },
        "LoanTemplates",
        "LoanManagementSummary",
      ],
    }),

    // ── Templates Dropdown ─────────────────────────────────────────────────
    getTemplatesDropdown: builder.query<TemplateDropdownResponse, void>({
      query: () => ({
        url: "/admin/loan-templates/dropdown/",
        method: "GET",
      }),
      providesTags: ["LoanTemplates"],
    }),
  }),
});

export const {
  useGetLoanManagementSummaryQuery,
  useGetLoanTypesQuery,
  useCreateLoanTypeMutation,
  useUpdateLoanTypeMutation,
  useToggleLoanTypeStatusMutation,
  useGetLoanTemplatesQuery,
  useGetLoanTemplateDetailQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  usePublishLoanTemplateMutation,
  useAddTemplateSectionMutation,
  useGetTemplatesDropdownQuery,
} = loanManagementApi;

