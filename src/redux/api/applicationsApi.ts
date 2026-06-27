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
      providesTags: (result, error, id) => [{ type: "ApplicationDetails", id }],
    }),
    getApplicationDocuments: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/applications/${id}/documents/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ApplicationDocuments", id }],
    }),
    updateDocumentStatus: builder.mutation<any, { id: string; documentId: string; status: "approved" | "rejected"; note?: string }>({
      query: ({ documentId, status, note }) => ({
        url: `/admin/documents/${documentId}/status/`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ApplicationDocuments", id },
        { type: "ApplicationTimeline", id },
        { type: "ApplicationDetails", id }
      ],
    }),
    getApplicationTimeline: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/applications/${id}/timeline/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ApplicationTimeline", id }],
    }),
    getApplicationNotes: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/applications/${id}/notes/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ApplicationNotes", id }],
    }),
    addApplicationNote: builder.mutation<any, { id: string; note: string }>({
      query: ({ id, note }) => ({
        url: `/admin/applications/${id}/notes/`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ApplicationNotes", id },
        { type: "ApplicationTimeline", id },
        { type: "ApplicationDetails", id }
      ],
    }),
  }),
});

export const {
  useGetApplicationsListQuery,
  useGetApplicationDetailsQuery,
  useGetApplicationDocumentsQuery,
  useUpdateDocumentStatusMutation,
  useGetApplicationTimelineQuery,
  useGetApplicationNotesQuery,
  useAddApplicationNoteMutation,
} = applicationsApi;
