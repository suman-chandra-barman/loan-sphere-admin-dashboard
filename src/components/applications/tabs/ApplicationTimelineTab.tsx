import React from "react";
import {
  FileText,
  Clock,
  Brain,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  StickyNote,
  Info,
} from "lucide-react";
import { useGetApplicationTimelineQuery } from "@/redux/api/applicationsApi";
import { TimelineTabSkeleton } from "@/components/skeleton/TabContentSkeleton";

interface ApplicationTimelineTabProps {
  applicationId: string;
}

function getTimelineEventStyles(type: string, status?: string) {
  const t = (type || "").toLowerCase();
  const s = (status || "").toLowerCase();

  if (t === "application" || t === "submitted") {
    return { icon: FileText, color: "text-zinc-500 bg-zinc-50 border-zinc-150" };
  }
  if (t === "document") {
    if (s === "approved") {
      return { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
    }
    if (s === "rejected") {
      return { icon: XCircle, color: "text-rose-600 bg-rose-50 border-rose-100" };
    }
    return { icon: FileText, color: "text-blue-600 bg-blue-50 border-blue-100" };
  }
  if (t === "note") {
    return { icon: StickyNote, color: "text-amber-600 bg-amber-50 border-amber-100" };
  }
  if (t === "approved" || t === "cond_approved") {
    return { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
  }
  if (t === "rejected") {
    return { icon: XCircle, color: "text-rose-600 bg-rose-50 border-rose-100" };
  }
  return { icon: Info, color: "text-zinc-500 bg-zinc-100 border-zinc-200" };
}

export default function ApplicationTimelineTab({ applicationId }: ApplicationTimelineTabProps) {
  const { data, isLoading, error } = useGetApplicationTimelineQuery(applicationId);

  if (isLoading) {
    return <TimelineTabSkeleton />;
  }

  if (error || !data?.success) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-8 text-center text-zinc-500 font-semibold shadow-3xs">
        Failed to load application timeline.
      </div>
    );
  }

  const timelineEvents = data?.data?.timeline || [];

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm animate-in fade-in duration-200">
      {timelineEvents.length > 0 ? (
        <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100/80">
          {timelineEvents.map((event: any, index: number) => {
            const { icon: IconComp, color } = getTimelineEventStyles(event.type, event.status);
            return (
              <div key={event.key || index} className="flex gap-4 relative">
                <div
                  className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border border-white z-10 shadow-3xs ${color}`}
                >
                  <IconComp className="h-4 w-4" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-extrabold text-zinc-800 leading-tight">
                      {event.title}
                    </p>
                    {event.actor && (
                      <span className="text-[10px] bg-zinc-100 text-zinc-600 font-bold px-1.5 py-0.5 rounded">
                        {event.actor}
                      </span>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-xs font-semibold text-zinc-500 mt-1 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                  <p className="text-[10px] font-bold text-zinc-400 mt-1">
                    {new Date(event.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-zinc-400 text-sm font-semibold py-4">
          No events found in this application's history.
        </div>
      )}
    </div>
  );
}
