"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionCard } from "@/components/ui/section-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RecentAiReportItem } from "@/types/aiInsights";

interface RecentAiReportsProps {
  title?: string;
  items?: RecentAiReportItem[];
}

const BADGE_MAP: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-100/80 hover:bg-emerald-50",
  yellow: "bg-amber-50 text-amber-700 border-amber-100/80 hover:bg-amber-50",
  red: "bg-rose-50 text-rose-700 border-rose-100/80 hover:bg-rose-50",
  approve: "bg-emerald-50 text-emerald-700 border-emerald-100/80 hover:bg-emerald-50",
  review: "bg-amber-50 text-amber-700 border-amber-100/80 hover:bg-amber-50",
  reject: "bg-rose-50 text-rose-700 border-rose-100/80 hover:bg-rose-50",
};

export default function RecentAiReports({
  title = "Recent AI Reports",
  items = [],
}: RecentAiReportsProps) {
  return (
    <SectionCard
      title={title}
      icon={Sparkles}
      className="w-full overflow-hidden"
    >
      <div className="-mx-6 -mb-6 mt-2 overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-50/50 border-t border-zinc-100">
            <TableRow className="border-b border-zinc-100">
              <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                Application
              </TableHead>
              <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                Customer
              </TableHead>
              <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                Risk Score
              </TableHead>
              <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                Recommendation
              </TableHead>
              <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                Summary
              </TableHead>
              <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-zinc-400">
                  No recent AI reports available.
                </td>
              </TableRow>
            ) : (
              items.map((report, idx) => {
                const badgeClass =
                  BADGE_MAP[report.recommendationBadgeType] ||
                  BADGE_MAP[report.recommendation] ||
                  "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-100";

                return (
                  <TableRow
                    key={report.id || idx}
                    className="group border-b border-zinc-100 last:border-0 hover:bg-zinc-50/35 transition-colors duration-200"
                  >
                    <TableCell className="px-6 py-4.5 font-bold text-[#9c1c1c]">
                      <Link
                        href={`/applications/${report.id}`}
                        className="hover:underline"
                      >
                        {report.applicationNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-700 font-medium">
                      {report.customerName}
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-16 rounded-full bg-zinc-100 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              report.riskScore <= 40
                                ? "bg-emerald-500"
                                : report.riskScore <= 70
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            )}
                            style={{ width: `${report.riskScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-zinc-800 text-xs">
                          {report.riskScore}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-semibold px-2.5 py-0.5 rounded-md text-[11px]",
                          badgeClass
                        )}
                      >
                        {report.recommendationLabel}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-500 font-medium text-xs max-w-xs truncate md:max-w-md lg:max-w-lg">
                      {report.summary}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-400 font-medium text-xs">
                      {report.dateDisplay}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </SectionCard>
  );
}
