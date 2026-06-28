import React, { useEffect, useRef } from "react";
import { ChatConversation, ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  conversation: ChatConversation | null;
  messages: ChatMessage[];
  onSendMessage: (text: string, file?: File | null) => void;
  onBack?: () => void;
  isConnected: boolean;
  customerPresence: "online" | "offline";
  typingUser: string | null;
  currentUserId: string | null;
}

export default function ChatWindow({
  conversation,
  messages,
  onSendMessage,
  onBack,
  isConnected,
  customerPresence,
  typingUser,
  currentUserId,
}: ChatWindowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on load or when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages.length, conversation?.id, typingUser]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F5] p-8 text-center h-full">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 animate-pulse">
          <MessageSquare className="h-7 w-7 text-zinc-400" />
        </div>
        <p className="text-base font-bold text-zinc-700">No conversation selected</p>
        <p className="mt-1 text-sm text-zinc-400">
          Select a customer conversation from the list to start messaging.
        </p>
      </div>
    );
  }

  const customerName = conversation.customer?.name || conversation.title || "Customer";
  
  const customerInitials = conversation.customer?.initials || customerName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  // Dynamic admin initials parsing from local state
  const getAdminInitials = () => {
    try {
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userStr) {
        const userObj = JSON.parse(userStr);
        if (userObj.full_name) {
          return userObj.full_name
            .split(" ")
            .filter(Boolean)
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        }
      }
    } catch {}
    return "AA";
  };
  
  const adminInitials = getAdminInitials();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold shadow-xs select-none bg-[#A31D1D]"
            )}
          >
            {customerInitials}
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm leading-tight">
              {customerName}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  customerPresence === "online" ? "bg-emerald-500" : "bg-zinc-400"
                )}
              />
              <span className="text-[11px] font-semibold text-zinc-400">
                {customerPresence === "online" ? "Active now" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Socket Status Tag */}
        <span
          className={cn(
            "text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none transition-all",
            isConnected
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-rose-50 text-rose-700 border border-rose-200"
          )}
        >
          {isConnected ? "Live Chat" : "Offline Mode"}
        </span>
      </div>

      {/* Messages Scroll Panel */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col justify-end min-h-full">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                userInitials={customerInitials}
                avatarBg="bg-[#A31D1D]"
                adminInitials={adminInitials}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-xs font-semibold text-zinc-400">No messages yet. Say hello!</p>
            </div>
          )}

          {/* Custom Typing Indicator Bubble */}
          {typingUser && (
            <div className="flex items-center gap-2 mb-2 ml-1 text-xs text-zinc-500 font-semibold italic animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              <span>{typingUser} is typing...</span>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <MessageInput
        userName={customerName}
        onSend={onSendMessage}
      />
    </div>
  );
}
