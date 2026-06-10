import { baseApi } from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<any, any>({
      query: (params) => ({
        url: "/admin/users/",
        params,
      }),
    }),
  }),
});

export const { useGetAdminUsersQuery } = usersApi;
