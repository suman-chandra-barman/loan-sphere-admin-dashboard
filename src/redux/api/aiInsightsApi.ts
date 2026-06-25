import { baseApi } from "@/redux/api/baseApi";
import type { AiInsightsResponse } from "@/types/aiInsights";

export const aiInsightsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAiInsights: builder.query<AiInsightsResponse, void>({
      query: () => ({
        url: "/admin/ai-insights/",
        method: "GET",
      }),
      providesTags: ["User"], // Keep general tag for state updates or add new if needed
    }),
  }),
});

export const { useGetAiInsightsQuery } = aiInsightsApi;
