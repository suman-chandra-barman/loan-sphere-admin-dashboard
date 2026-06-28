import { apiFormRequest, apiRequest } from "@/lib/api";

export type ConversationQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

function buildQuery(params: ConversationQuery = {}) {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export async function getConversations(params: ConversationQuery = {}) {
  return apiRequest(`/api/chat/conversations/${buildQuery(params)}`);
}

export async function getConversationMessages(conversationId: string) {
  return apiRequest(`/api/chat/conversations/${conversationId}/messages/`);
}

export async function markConversationRead(conversationId: string) {
  return apiRequest(`/api/chat/conversations/${conversationId}/read/`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}

export async function assignConversation(conversationId: string) {
  return apiRequest(`/api/chat/conversations/${conversationId}/assign/`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}

export async function sendMessageFallback(
  conversationId: string,
  message: string
) {
  return apiRequest(`/api/chat/conversations/${conversationId}/messages/`, {
    method: "POST",
    body: JSON.stringify({
      message,
      message_type: "text",
    }),
  });
}

export async function sendAttachmentFallback(
  conversationId: string,
  file: File,
  message?: string
) {
  const formData = new FormData();
  if (message) {
    formData.append("message", message);
  }
  formData.append("attachment", file);
  return apiFormRequest(
    `/api/chat/conversations/${conversationId}/messages/`,
    formData,
    {
      method: "POST",
    }
  );
}
