import { baseApi } from "@/redux/api/baseApi";
import type { 
  AdminUsersResponse, 
  AdminUserDetailResponse, 
  ListUsersParams 
} from "@/types/adminUser";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<AdminUsersResponse, ListUsersParams | void>({
      query: (params) => ({
        url: "/admin/users/",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.users.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getAdminUserDetail: builder.query<AdminUserDetailResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    suspendUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/users/${id}/suspend/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" }
      ],
    }),
    activateUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/users/${id}/activate/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" }
      ],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetAdminUserDetailQuery,
  useSuspendUserMutation,
  useActivateUserMutation,
} = usersApi;
