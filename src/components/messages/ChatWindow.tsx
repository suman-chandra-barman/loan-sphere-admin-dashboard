"use client";

import React, { useEffect, useRef } from "react";
import { Conversation, Message } from "@/data/mockMessages";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
  onBack?: () => void;
}

export default function ChatWindow({
  conversation,
  onSendMessage,
  onBack,
}: ChatWindowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on load or when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [conversation?.messages?.length, conversation?.id]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F5] p-8 text-center h-full">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
          <MessageSquare className="h-7 w-7 text-zinc-400" />
        </div>
        <p className="text-base font-bold text-zinc-700">No conversation selected</p>
        <p className="mt-1 text-sm text-zinc-400">
          Select a customer conversation from the list to start messaging.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-zinc-200 flex items-center gap-3">
        {/* Back Button for mobile */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden -ml-2 p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
            aria-label="Back to conversations list"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        {/* Avatar */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold shadow-xs select-none",
            conversation.avatarBg || "bg-[#A31D1D]"
          )}
        >
          {conversation.userInitials}
        </div>

        {/* User Info */}
        <div>
          <h3 className="font-bold text-zinc-900 text-sm leading-tight">
            {conversation.userFullName}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                conversation.userStatus === "active" ? "bg-emerald-500" : "bg-zinc-400"
              )}
            />
            <span className="text-[11px] font-semibold text-zinc-400">
              {conversation.userStatus === "active" ? "Active now" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Panel */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col justify-end min-h-full">
          {conversation.messages.length > 0 ? (
            conversation.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                userInitials={conversation.userInitials}
                avatarBg={conversation.avatarBg}
                adminInitials="AR"
              />
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-xs font-semibold text-zinc-400">No messages yet. Say hello!</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <MessageInput
        userName={conversation.userFullName}
        onSend={onSendMessage}
      />
    </div>
  );
}
