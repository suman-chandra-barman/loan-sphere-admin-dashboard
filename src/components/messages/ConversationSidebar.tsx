"use client";

import React from "react";
import { Search } from "lucide-react";
import { Conversation } from "@/data/mockMessages";
import ConversationItem from "./ConversationItem";
import { Input } from "@/components/ui/input";

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ConversationSidebar({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
}: ConversationSidebarProps) {
  // Client side filtering for search
  const filteredConversations = conversations.filter((c) =>
    c.userFullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full flex-col bg-white border-r border-zinc-200">
      {/* Title */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center">
        <h2 className="text-lg font-bold text-zinc-900">Messages</h2>
      </div>

      {/* Search Input Container */}
      <div className="p-4 border-b border-zinc-100">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 pr-4 h-9 bg-zinc-50 border-zinc-200 text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#A31D1D] focus-visible:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Conversations scroll container */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((convo) => (
            <ConversationItem
              key={convo.id}
              conversation={convo}
              isActive={selectedId === convo.id}
              onClick={() => onSelect(convo.id)}
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
