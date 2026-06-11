"use client";

import React from "react";
import { Conversation } from "@/data/mockMessages";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3.5 p-4 text-left border-b border-zinc-100 transition-all duration-200 cursor-pointer",
        isActive
          ? "bg-[#A31D1D]/5 hover:bg-[#A31D1D]/10"
          : "hover:bg-zinc-50"
      )}
    >
      {/* Avatar / Initials */}
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold shadow-xs",
          conversation.avatarBg || "bg-[#A31D1D]"
        )}
      >
        {conversation.userInitials}
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5">
          <p
            className={cn(
              "truncate text-sm font-bold transition-colors",
              isActive ? "text-[#A31D1D]" : "text-zinc-900"
            )}
          >
            {conversation.userFullName}
          </p>
          <span className="text-[11px] font-medium text-zinc-400 shrink-0">
            {conversation.timestamp}
          </span>
        </div>

        <p className="text-xs font-medium text-zinc-400 truncate mt-1">
          {conversation.lastMessage}
        </p>
      </div>

      {/* Unread badge */}
      {conversation.unreadCount > 0 && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A31D1D] text-[10px] font-extrabold text-white self-center">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}
