"use client";

import React, { useState, useEffect, useMemo } from "react";
import ConversationSidebar from "@/components/messages/ConversationSidebar";
import ChatWindow from "@/components/messages/ChatWindow";
import { INITIAL_CONVERSATIONS, Conversation, Message } from "@/data/mockMessages";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>("usr-1"); // Default to Sarah Johnson as in the mockup
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Load state from local storage or initial mockup data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("loan_sphere_conversations");
      if (saved) {
        try {
          setConversations(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load conversations from localStorage", e);
          setConversations(INITIAL_CONVERSATIONS);
        }
      } else {
        setConversations(INITIAL_CONVERSATIONS);
        localStorage.setItem("loan_sphere_conversations", JSON.stringify(INITIAL_CONVERSATIONS));
      }
      setLoading(false);
    }
  }, []);

  // Save changes to localStorage
  const saveState = (updated: Conversation[]) => {
    setConversations(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("loan_sphere_conversations", JSON.stringify(updated));
    }
  };

  // Find active conversation
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || null;
  }, [conversations, selectedId]);

  // Handle selecting a conversation
  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    
    // Clear unread count on selection
    const updated = conversations.map((c) => {
      if (c.id === id) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    });
    saveState(updated);
  };

  // Handle sending a message
  const handleSendMessage = (text: string) => {
    if (!selectedId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "admin-1",
      senderName: "Alex Rivera",
      text,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + `, ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      isFromAdmin: true,
    };

    // Update the conversation's messages and meta information
    const updatedConversations = conversations.map((c) => {
      if (c.id === selectedId) {
        const updatedMessages = [...c.messages, newMessage];
        return {
          ...c,
          lastMessage: text,
          timestamp: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          messages: updatedMessages,
          unreadCount: 0, // Keep at 0 since the admin is active on it
        };
      }
      return c;
    });

    // Move the active conversation to the top of the sidebar list
    const activeConvo = updatedConversations.find((c) => c.id === selectedId);
    const otherConvos = updatedConversations.filter((c) => c.id !== selectedId);
    
    if (activeConvo) {
      saveState([activeConvo, ...otherConvos]);
    } else {
      saveState(updatedConversations);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px] h-[calc(100vh-180px)] bg-white rounded-3xl border border-zinc-200/80 shadow-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-[#A31D1D]" />
          <span className="text-xs font-semibold text-zinc-400">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-[calc(100vh-120px)] flex flex-col overflow-hidden pb-2">
      {/* Header Title & Counter */}
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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            onBack={() => setSelectedId(null)}
          />
        </div>
      </div>
    </div>
  );
}