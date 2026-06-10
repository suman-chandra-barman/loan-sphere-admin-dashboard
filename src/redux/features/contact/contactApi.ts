import { baseApi } from "@/redux/api/baseApi";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  status_display: string;
  enquiry_type: string;
  enquiry_type_display: string;
  created_at: string;
  admin_note?: string;
}

export interface EnquiryTypeOption {
  key: string;
  label: string;
}

export interface StatusOption {
  key: string;
  label: string;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminMessages: builder.query<any, any>({
      query: () => "/admin/messages/",
    }),
    deleteAdminMessage: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/messages/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAdminMessagesQuery, useDeleteAdminMessageMutation } = contactApi;
