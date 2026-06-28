"use client";

import React, { useState, useEffect } from "react";
import ConversationSidebar from "@/components/messages/ConversationSidebar";
import ChatWindow from "@/components/messages/ChatWindow";
import { ChatConversation, ChatMessage, ConversationSummary } from "@/types/chat";
import { cn } from "@/lib/utils";
import {
  getConversations,
  getConversationMessages,
  markConversationRead,
  assignConversation,
  sendMessageFallback,
  sendAttachmentFallback,
} from "@/services/chatService";
import { useChatSocket } from "@/hooks/useChatSocket";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [summary, setSummary] = useState<ConversationSummary | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [customerPresence, setCustomerPresence] = useState<"online" | "offline">("offline");
  const [loading, setLoading] = useState(true);

  // Auth local state (hydration-safe)
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("accessToken");
      setToken(savedToken);
      
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setCurrentUserId(userObj.id || userObj.user_id || localStorage.getItem("currentUserId") || null);
        } catch {
          setCurrentUserId(localStorage.getItem("currentUserId") || null);
        }
      } else {
        setCurrentUserId(localStorage.getItem("currentUserId") || null);
      }
    }
  }, []);

  // Fetch all conversations
  async function loadConversations() {
    try {
      const response = await getConversations({
        page: 1,
        limit: 20,
        search: search.trim() || undefined,
        status: statusFilter,
      });
      if (response?.success) {
        setSummary(response.data.summary || null);
        setConversations(response.data.conversations || []);
      }
    } catch (err) {
      console.error("Error loading conversations", err);
    } finally {
      setLoading(false);
    }
  }

  // Open / Select a conversation
  async function handleSelectConversation(conversation: ChatConversation) {
    setSelectedConversation(conversation);
    setCustomerPresence("offline");
    setTypingUser(null);
    
    try {
      const response = await getConversationMessages(conversation.id);
      setMessages(response.data.messages || []);
      
      // Perform initial actions: mark read & self assign if unassigned
      await markConversationRead(conversation.id);
      if (!conversation.admin?.id) {
        await assignConversation(conversation.id);
      }
      
      // Refresh list to update unread badge status
      await loadConversations();
    } catch (err) {
      console.error("Error loading conversation messages", err);
    }
  }

  // Hook up WebSocket
  const { isConnected, sendMessage, sendTyping, markRead } = useChatSocket({
    conversationId: selectedConversation?.id || null,
    token,
    onConnected: () => {
      console.log("Socket successfully connected & active");
    },
    onMessage: (newMessage) => {
      // Append the message to listing
      setMessages((prev) => {
        // Prevent duplicate keys if REST fallback returned first
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
      markRead();
      loadConversations();
    },
    onTyping: (data) => {
      if (data.isTyping) {
        setTypingUser(data.user?.name || "User");
      } else {
        setTypingUser(null);
      }
    },
    onPresence: (data) => {
      if (data.user?.id === selectedConversation?.customer?.id) {
        setCustomerPresence(data.event === "online" ? "online" : "offline");
      }
    },
    onReadReceipt: (data) => {
      console.log("Read receipt updated:", data);
    },
    onErrorEvent: (data) => {
      console.error("WebSocket server reported error:", data.message);
    },
  });

  // Handle sending message/file
  const handleSendMessage = async (text: string, file?: File | null) => {
    if (!selectedConversation) return;

    // Send typing false notification
    sendTyping(false);

    if (file) {
      // Attachment fallback sending
      try {
        const response = await sendAttachmentFallback(selectedConversation.id, file, text);
        if (response.success) {
          // If WS is disconnected, manually append message to list
          if (!isConnected) {
            setMessages((prev) => [...prev, response.data]);
          }
          await loadConversations();
        }
      } catch (err) {
        console.error("Failed uploading chat attachment", err);
      }
    } else {
      // Try socket sending first
      const sentByWs = sendMessage(text);
      if (!sentByWs) {
        // Try REST API fallback if socket is closed
        try {
          const response = await sendMessageFallback(selectedConversation.id, text);
          if (response.success && !isConnected) {
            setMessages((prev) => [...prev, response.data]);
          }
          await loadConversations();
        } catch (err) {
          console.error("Failed sending fallback message", err);
        }
      }
    }
  };

  // Triggers reload on filter or search updates
  useEffect(() => {
    loadConversations();
  }, [statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadConversations();
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const selectedId = selectedConversation?.id || null;

  return (
    <div className="space-y-4 h-[calc(100vh-120px)] flex flex-col overflow-hidden pb-2">
      {/* Header Title & Subtitle */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Messages
          </h1>
          <p className="mt-1 text-xs font-semibold text-zinc-400">
            Communicate with loan applicants directly
          </p>
        </div>
      </div>

      {/* Main Chat Client Container */}
      <div className="flex rounded-3xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden flex-1 min-h-0">
        {/* Left column - Sidebar (hidden on mobile if a chat is active) */}
        <div
          className={cn(
            "w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col h-full",
            selectedId !== null && "hidden md:flex"
          )}
        >
          <ConversationSidebar
            conversations={conversations}
            selectedId={selectedId}
            onSelect={handleSelectConversation}
            searchQuery={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            summary={summary}
            loading={loading}
          />
        </div>

        {/* Right column - Chat Window (hidden on mobile if no chat is active) */}
        <div
          className={cn(
            "flex-1 flex flex-col h-full overflow-hidden",
            selectedId === null && "hidden md:flex"
          )}
        >
          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={() => setSelectedConversation(null)}
            isConnected={isConnected}
            customerPresence={customerPresence}
            typingUser={typingUser}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
}