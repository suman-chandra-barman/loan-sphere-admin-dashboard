import React, { useState, KeyboardEvent, useRef } from "react";
import { SendHorizontal, Paperclip, X } from "lucide-react";

interface MessageInputProps {
  userName: string;
  onSend: (text: string, file?: File | null) => void;
}

export default function MessageInput({ userName, onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && !selectedFile) return;
    onSend(trimmed, selectedFile);
    setText("");
    setSelectedFile(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent adding new line
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 bg-white border-t border-zinc-100 flex flex-col gap-2">
      {/* File attachment preview */}
      {selectedFile && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs font-semibold text-zinc-600 self-start animate-fade-in shadow-2xs">
          <Paperclip className="h-3 w-3 text-zinc-400 shrink-0" />
          <span className="truncate max-w-[240px]">{selectedFile.name}</span>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-zinc-400 hover:text-zinc-600 transition-colors p-0.5 rounded-full hover:bg-zinc-200/60"
            aria-label="Remove attachment"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        />

        {/* Paperclip Button */}
        <button
          onClick={triggerFileSelect}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700 border border-zinc-200 shadow-2xs transition-colors cursor-pointer"
          aria-label="Attach file"
        >
          <Paperclip className="h-[18px] w-[18px]" />
        </button>

        {/* Input Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedFile ? "Add a message about the file..." : `Message ${userName}...`}
          rows={1}
          className="flex-1 resize-none bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A31D1D] focus:border-transparent transition-all max-h-24 min-h-[44px]"
          style={{ scrollbarWidth: "thin" }}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!text.trim() && !selectedFile}
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
