"use client";

import React, { useState, KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  userName: string;
  onSend: (text: string) => void;
}

export default function MessageInput({ userName, onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent adding new line
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-zinc-100 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Input Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${userName}...`}
          rows={1}
          className="flex-1 resize-none bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A31D1D] focus:border-transparent transition-all max-h-24 min-h-[44px]"
          style={{ scrollbarWidth: "thin" }}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCA498] hover:bg-[#c99286] disabled:opacity-50 disabled:hover:bg-[#DCA498] text-white shadow-xs transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <SendHorizontal className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* Helper text */}
      <span className="text-[10px] text-zinc-400 font-semibold pl-1 select-none">
        Press Enter to send, Shift+Enter for new line
      </span>
    </div>
  );
}
