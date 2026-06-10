"use client";

import { Sparkles } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionCard } from "@/components/ui/section-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const REPORTS = [
  {
    application: "LS-2024-001",
    customer: "Sarah Johnson",
    score: 78,
    recommendation: "Approve",
    summary: "Sarah Johnson presents a low-risk profile for this $350,000 home loan, backed by strong credit.",
    date: "Jan 23, 2024",
  },
  {
    application: "LS-2024-006",
    customer: "Lisa Park",
    score: 38,
    recommendation: "Reject",
    summary: "Lisa Park presents high risk due to excessive debt burden. Debt-to-income ratio exceeds acceptable threshold.",
    date: "Feb 18, 2024",
  },
  {
    application: "LS-2024-011",
    customer: "James Thompson",
    score: 82,
    recommendation: "Approve",
    summary: "James Thompson's consulting firm shows strong financial health and stable recurring cash flow.",
    date: "Mar 1, 2024",
  },
];

export default function RecentAiReports() {
  return (
    <SectionCard
      title="Recent AI Reports"
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
            {REPORTS.map((report, idx) => (
              <TableRow
                key={idx}
                className="group border-b border-zinc-100 last:border-0 hover:bg-zinc-50/35 transition-colors duration-200"
              >
                <TableCell className="px-6 py-4.5 font-bold text-[#9c1c1c]">
                  {report.application}
                </TableCell>
                <TableCell className="px-6 py-4.5 text-zinc-700 font-medium">
                  {report.customer}
                </TableCell>
                <TableCell className="px-6 py-4.5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-16 rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          report.score >= 50 ? "bg-emerald-500" : "bg-rose-500"
                        )}
                        style={{ width: `${report.score}%` }}
                      />
                    </div>
                    <span className="font-bold text-zinc-800 text-xs">{report.score}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4.5">
                  <Badge
                    variant={report.recommendation === "Approve" ? "default" : "destructive"}
                    className="font-semibold px-2.5 py-0.5 rounded-md text-[11px]"
                  >
                    {report.recommendation}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4.5 text-zinc-500 font-medium text-xs max-w-xs truncate md:max-w-md lg:max-w-lg">
                  {report.summary}
                </TableCell>
                <TableCell className="px-6 py-4.5 text-zinc-400 font-medium text-xs">
                  {report.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionCard>
  );
}
