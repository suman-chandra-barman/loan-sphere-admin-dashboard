"use client";

import React from "react";
import { Message } from "@/data/mockMessages";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  userInitials: string;
  avatarBg: string;
  adminInitials?: string;
}

export default function MessageBubble({
  message,
  userInitials,
  avatarBg,
  adminInitials = "AR",
}: MessageBubbleProps) {
  const { isFromAdmin, text, timestamp } = message;

  return (
    <div
      className={cn(
        "flex w-full items-end gap-3 mb-6",
        isFromAdmin ? "justify-end" : "justify-start"
      )}
    >
      {/* Customer Avatar (Shown on Left for user messages) */}
      {!isFromAdmin && (
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-[12px] font-bold shadow-xs select-none",
            avatarBg || "bg-[#A31D1D]"
          )}
        >
          {userInitials}
        </div>
      )}

      {/* Bubble + Timestamp Container */}
      <div className={cn("flex flex-col max-w-[70%]", isFromAdmin ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs",
            isFromAdmin
              ? "bg-[#1E252B] text-white rounded-br-none"
              : "bg-white text-zinc-800 rounded-bl-none border border-zinc-100"
          )}
        >
          {text}
        </div>
        
        {/* Timestamp */}
        <span className="text-[10px] text-zinc-400 font-semibold mt-1 px-1">
          {timestamp}
        </span>
      </div>

      {/* Admin Avatar (Shown on Right for admin messages) */}
      {isFromAdmin && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E252B] text-white text-[12px] font-bold shadow-xs select-none"
        >
          {adminInitials}
        </div>
      )}
    </div>
  );
}
