export type ChatUser = {
  id: string;
  name: string;
  email?: string;
  initials?: string;
  role?: string;
  isAdmin?: boolean;
};

export type ChatConversation = {
  id: string;
  title: string;
  customer: ChatUser;
  admin?: ChatUser | null;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  status?: string;
  websocketUrl?: string;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: ChatUser;
  messageType: "text" | "image" | "file";
  message: string;
  attachmentUrl?: string | null;
  createdAt: string;
};

export type ConversationSummary = {
  total: number;
  open: number;
  closed: number;
};
