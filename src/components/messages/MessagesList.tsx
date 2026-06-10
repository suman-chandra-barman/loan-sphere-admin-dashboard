"use client";

import { useState, useMemo } from "react";
import { Search, X, ChevronDown, ChevronUp, Mail, Clock, Tag, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useDeleteAdminMessageMutation } from "@/redux/features/contact/contactApi";
import type {
  ContactMessage,
  EnquiryTypeOption,
  StatusOption,
} from "@/redux/features/contact/contactApi";

// ── Style maps ──────────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  new: "bg-sky-50 text-sky-700 border border-sky-200",
  in_progress: "bg-amber-50 text-amber-700 border border-amber-200",
  resolved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const ENQUIRY_STYLES: Record<string, string> = {
  general: "bg-zinc-100 text-zinc-600",
  billing: "bg-amber-50 text-amber-700",
  features: "bg-sky-50 text-sky-700",
  privacy: "bg-purple-50 text-purple-700",
  getting_started: "bg-emerald-50 text-emerald-700",
  support: "bg-rose-50 text-rose-700",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Avatar initials ─────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-amber-100 text-amber-700",
  "bg-sky-100 text-sky-700",
  "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
];

function getAvatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

// ── Single message card ─────────────────────────────────────────────────────────
interface MessageCardProps {
  msg: ContactMessage;
  onDelete: (msg: ContactMessage) => void;
}

function MessageCard({ msg, onDelete }: MessageCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden border border-zinc-200/80 shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex w-full items-start gap-4 p-5 text-left">
          {/* Main Info Clickable Region */}
          <button
            className="flex flex-1 items-start gap-4 text-left cursor-pointer group/btn min-w-0"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {/* Avatar */}
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${getAvatarColor(msg.id)}`}
            >
              {getInitials(msg.name)}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {/* Row 1: name */}
              <div className="flex items-center gap-2 min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 group-hover/btn:text-amber-700 transition-colors">
                  {msg.name}
                </p>
                <span className="hidden sm:flex items-center gap-1 text-xs text-zinc-400">
                  <Mail className="h-3 w-3" />
                  {msg.email}
                </span>
              </div>

              {/* Row 2: subject + meta */}
              <p className="mt-1 text-sm font-medium text-zinc-700 truncate">
                {msg.subject}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span
                    className={`rounded px-1.5 py-0.5 font-medium ${ENQUIRY_STYLES[msg.enquiry_type] ?? "bg-zinc-100 text-zinc-600"}`}
                  >
                    {msg.enquiry_type_display}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(msg.created_at)}
                </span>
              </div>
            </div>
          </button>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2 self-start mt-0.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[msg.status] ?? "bg-zinc-100 text-zinc-600"}`}
            >
              {msg.status_display}
            </span>

            {/* Delete button */}
            <button
              onClick={() => onDelete(msg)}
              className="rounded-full p-1.5 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 cursor-pointer"
              title="Delete Message"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            {/* Chevron toggler */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all duration-200 cursor-pointer"
              aria-label={expanded ? "Collapse message" : "Expand message"}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-amber-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded body */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="border-t border-zinc-100 bg-zinc-50/50 px-5 pb-5 pt-4 space-y-4">
            {/* Message body */}
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Message
              </p>
              <p className="text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>

            {/* Admin note if present */}
            {msg.admin_note && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-600">
                  Admin Note
                </p>
                <p className="text-sm text-amber-800">{msg.admin_note}</p>
              </div>
            )}

            {/* Email on mobile */}
            <p className="text-xs text-zinc-400 sm:hidden">
              <Mail className="inline h-3 w-3 mr-1" />
              {msg.email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Props ───────────────────────────────────────────────────────────────────────
interface Props {
  messages: ContactMessage[];
  enquiryTypes: EnquiryTypeOption[];
  statuses: StatusOption[];
}

// ── Main component ──────────────────────────────────────────────────────────────
export default function MessagesList({
  messages,
  enquiryTypes,
  statuses,
}: Props) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [msgToDelete, setMsgToDelete] = useState<ContactMessage | null>(null);

  const [deleteMessage, { isLoading: isDeleting }] = useDeleteAdminMessageMutation();

  // Client-side filter (the API may not support granular params on every env)
  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()) ||
        m.message.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || m.status === filterStatus;
      const matchType =
        filterType === "all" || m.enquiry_type === filterType;
      return matchSearch && matchStatus && matchType;
    });
  }, [messages, search, filterStatus, filterType]);

  const handleDelete = async () => {
    if (!msgToDelete) return;
    const toastId = toast.loading("Deleting message...");
    try {
      const response = await deleteMessage(msgToDelete.id).unwrap();
      if (response.success) {
        toast.update(toastId, {
          render: response.message || "Message deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setMsgToDelete(null);
      } else {
        toast.update(toastId, {
          render: "Failed to delete message.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.data?.message || "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  const hasFilters = search || filterStatus !== "all" || filterType !== "all";

  return (
    <div className="space-y-4">
      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or subject…"
            className="pl-9 bg-white border-zinc-200 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
        >
          <option value="all">All Statuses</option>
          {statuses.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
        >
          <option value="all">All Types</option>
          {enquiryTypes.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setFilterStatus("all");
              setFilterType("all");
            }}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* ── Count label ── */}
      <p className="text-xs text-zinc-400">
        Showing{" "}
        <span className="font-semibold text-zinc-700">{filtered.length}</span>{" "}
        of <span className="font-semibold text-zinc-700">{messages.length}</span> messages
      </p>

      {/* ── Message cards ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
            <Mail className="h-7 w-7 text-zinc-400" />
          </div>
          <p className="text-base font-semibold text-zinc-600">
            No messages found
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            {hasFilters
              ? "Try adjusting your search or filters."
              : "No contact messages yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <MessageCard key={msg.id} msg={msg} onDelete={setMsgToDelete} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {msgToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !isDeleting && setMsgToDelete(null)}
          />

          {/* Dialog */}
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-zinc-900">
                  Delete Message
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  This action cannot be undone.
                </p>
              </div>
              <button
                onClick={() => !isDeleting && setMsgToDelete(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
                disabled={isDeleting}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <p className="text-sm text-zinc-600">
                Are you sure you want to delete this contact message?
              </p>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-zinc-900 truncate">
                    From: {msgToDelete.name}
                  </p>
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">
                    {msgToDelete.enquiry_type_display}
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold text-zinc-900 truncate">
                  {msgToDelete.subject}
                </p>
                <p className="mt-2 text-xs text-zinc-500 line-clamp-3 whitespace-pre-wrap">
                  {msgToDelete.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-zinc-100 px-6 py-4 bg-zinc-50/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setMsgToDelete(null)}
                disabled={isDeleting}
                className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-rose-600 hover:bg-rose-700 text-white min-w-[100px] cursor-pointer gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
