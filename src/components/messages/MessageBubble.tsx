import React from "react";
import { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Paperclip, ExternalLink } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
  userInitials: string;
  avatarBg: string;
  adminInitials?: string;
  currentUserId: string | null;
}

export default function MessageBubble({
  message,
  userInitials,
  avatarBg,
  adminInitials = "AA",
  currentUserId,
}: MessageBubbleProps) {
  const isMine = message.sender.id === currentUserId;
  const isImage = message.messageType === "image" || (message.attachmentUrl && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(message.attachmentUrl));

  const formatMessageTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + `, ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    } catch {
      return "";
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-end gap-3 mb-6 animate-fade-in",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      {/* Customer Avatar (Shown on Left for user messages) */}
      {!isMine && (
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
      <div className={cn("flex flex-col max-w-[70%]", isMine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs flex flex-col gap-1.5",
            isMine
              ? "bg-[#1E252B] text-white rounded-br-none"
              : "bg-white text-zinc-800 rounded-bl-none border border-zinc-100"
          )}
        >
          {/* File Image Preview if it's an image */}
          {message.attachmentUrl && isImage && (
            <div className="relative rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 max-w-full my-1">
              <img
                src={message.attachmentUrl}
                alt="Attachment Preview"
                className="max-h-60 object-contain w-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          )}

          {/* Text content */}
          {message.message && (
            <p className="whitespace-pre-wrap break-words">{message.message}</p>
          )}

          {/* Generic File Attachment Link (non-image or fallback) */}
          {message.attachmentUrl && !isImage && (
            <a
              href={message.attachmentUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all mt-1 hover:underline self-start",
                isMine
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              )}
            >
              <Paperclip className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate max-w-[180px]">View Document</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-[10px] text-zinc-400 font-semibold mt-1 px-1">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>

      {/* Admin Avatar (Shown on Right for admin messages) */}
      {isMine && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E252B] text-white text-[12px] font-bold shadow-xs select-none"
        >
          {adminInitials}
        </div>
      )}
    </div>
  );
}
