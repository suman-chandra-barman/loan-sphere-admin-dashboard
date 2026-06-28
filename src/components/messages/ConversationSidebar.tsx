import React from "react";
import { Search } from "lucide-react";
import { ChatConversation, ConversationSummary } from "@/types/chat";
import ConversationItem from "./ConversationItem";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ConversationSidebarProps {
  conversations: ChatConversation[];
  selectedId: string | null;
  onSelect: (conversation: ChatConversation) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  summary: ConversationSummary | null;
  loading: boolean;
}

export default function ConversationSidebar({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  summary,
  loading,
}: ConversationSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col bg-white border-r border-zinc-200">
      {/* Title */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900">Messages</h2>
        {summary && (
          <span className="text-[10px] bg-zinc-100 text-zinc-600 font-extrabold px-2 py-0.5 rounded-full">
            Total: {summary.total}
          </span>
        )}
      </div>

      {/* Search Input & Status Filter Container */}
      <div className="p-4 border-b border-zinc-100 flex flex-col gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 pr-4 h-9 bg-zinc-50 border-zinc-200 text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#A31D1D] focus-visible:border-transparent transition-all"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStatusChange("open")}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
              statusFilter === "open"
                ? "bg-[#A31D1D] text-white shadow-xs"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200/85 hover:text-zinc-700"
            )}
          >
            Open {summary !== null && `(${summary.open})`}
          </button>
          <button
            onClick={() => onStatusChange("closed")}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
              statusFilter === "closed"
                ? "bg-[#A31D1D] text-white shadow-xs"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200/85 hover:text-zinc-700"
            )}
          >
            Closed {summary !== null && `(${summary.closed})`}
          </button>
        </div>
      </div>

      {/* Conversations scroll container */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3.5 p-4 border-b border-zinc-100 animate-pulse">
              <div className="h-11 w-11 rounded-full bg-zinc-100 shrink-0" />
              <div className="flex-1 min-w-0 space-y-2.5">
                <div className="flex justify-between items-center">
                  <div className="h-3.5 bg-zinc-100 rounded-md w-24" />
                  <div className="h-2.5 bg-zinc-100 rounded-md w-10" />
                </div>
                <div className="h-3 bg-zinc-150 bg-zinc-100 rounded-md w-3/4" />
              </div>
            </div>
          ))
        ) : conversations.length > 0 ? (
          conversations.map((convo) => (
            <ConversationItem
              key={convo.id}
              conversation={convo}
              isActive={selectedId === convo.id}
              onClick={() => onSelect(convo)}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-xs font-semibold text-zinc-400">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}
