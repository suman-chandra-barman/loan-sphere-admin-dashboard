"use client";

import React from "react";
import { Clock, Brain, Users, FileText, ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { QuickActionItem } from "@/types/dashboard";

interface QuickActionsCardProps {
  data?: QuickActionItem[];
  isLoading?: boolean;
}

const ACTION_CONFIG: Record<
  string,
  {
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
  }
> = {
  reviewPendingApplications: {
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/60 border-amber-100/50",
  },
  viewAiInsights: {
    icon: Brain,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50/60 border-indigo-100/50",
  },
  manageUsers: {
    icon: Users,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50/60 border-emerald-100/50",
  },
  customerMessages: {
    icon: FileText,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50/60 border-rose-100/50",
  },
};

const mapApiUrlToFrontend = (url: string) => {
  return url.replace(/^\/api\/admin\//, "/");
};

export default function QuickActionsCard({
  data,
  isLoading,
}: QuickActionsCardProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[264px]">
        <CardHeader className="pb-3 px-6 pt-6">
          <Skeleton className="h-4.5 w-32 rounded-md" />
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-6 pt-1">
          <div className="divide-y divide-zinc-100/65">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between py-3.5 px-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-32 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4 rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const items = data || [];

  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[264px]">
      <CardHeader className="pb-3 px-6 pt-6">
        <CardTitle className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-1 overflow-y-auto">
        <div className="divide-y divide-zinc-100/65">
          {items.length === 0 ? (
            <div className="text-xs font-medium text-zinc-400 py-4">
              No actions configured
            </div>
          ) : (
            items.map((action) => {
              const config = ACTION_CONFIG[action.key] || {
                icon: FileText,
                iconColor: "text-zinc-500",
                iconBg: "bg-zinc-100/60 border-zinc-200/50",
              };
              const Icon = config.icon;
              const frontendUrl = mapApiUrlToFrontend(action.url);

              return (
                <Link key={action.key} href={frontendUrl} passHref legacyBehavior>
                  <a className="group flex w-full items-center justify-between py-3 text-left transition-colors hover:bg-zinc-50/50 rounded-xl px-2 -mx-2 first:mt-1 last:mb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300",
                          config.iconBg
                        )}
                      >
                        <Icon className={cn("h-4.5 w-4.5", config.iconColor)} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-semibold text-zinc-700 transition-colors group-hover:text-zinc-950 truncate">
                          {action.title}
                        </span>
                        {action.description && (
                          <span className="block text-[10px] text-zinc-400 truncate max-w-[200px]">
                            {action.description}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-600" />
                  </a>
                </Link>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
