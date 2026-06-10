"use client";

import { AlertCircle, Inbox, CheckCircle2, Clock, MessageSquare } from "lucide-react";

import { useGetAdminMessagesQuery } from "@/redux/features/contact/contactApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slices/authSlice";
import { Card } from "@/components/ui/card";

import MessagesList from "@/components/messages/MessagesList";
import {
  MessagesStatsSkeleton,
  MessagesListSkeleton,
} from "@/components/messages/MessagesSkeletons";

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const token = useAppSelector(selectCurrentToken);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAdminMessagesQuery(undefined, { skip: !token });

  const loading = !token || isLoading || isFetching;
  const msgData = data?.data;

  // Derived stats
  const messages = msgData?.messages ?? [];
  const totalCount = msgData?.count ?? 0;
  const newCount = messages.filter((m: any) => m.status === "new").length;
  const inProgressCount = messages.filter(
    (m: any) => m.status === "in_progress"
  ).length;
  const resolvedCount = messages.filter((m: any) => m.status === "resolved").length;

  const stats = [
    {
      label: "Total Messages",
      value: totalCount,
      icon: Inbox,
      color: "bg-zinc-50",
      iconColor: "text-zinc-600",
    },
    {
      label: "New",
      value: newCount,
      icon: MessageSquare,
      color: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      icon: Clock,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Resolved",
      value: resolvedCount,
      icon: CheckCircle2,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div>
        <h1 className="text-xl font-bold text-zinc-900">Messages</h1>
        <p className="mt-0.5 text-sm text-zinc-500">
          View and manage all contact messages from your users.
        </p>
      </div>

      {/* ── Error state ── */}
      {isError && !loading && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            Failed to load messages.{" "}
            <button
              onClick={() => refetch()}
              className="font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </span>
        </div>
      )}

      {/* ── Stat cards ── */}
      {loading ? (
        <MessagesStatsSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="flex items-center gap-4 p-5 border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}
              >
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {s.label}
                </p>
                <p className="text-2xl font-bold text-zinc-900">{s.value}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Message list ── */}
      {loading ? (
        <MessagesListSkeleton />
      ) : (
        <MessagesList
          messages={messages}
          enquiryTypes={msgData?.enquiry_types ?? []}
          statuses={msgData?.statuses ?? []}
        />
      )}
    </div>
  );
}