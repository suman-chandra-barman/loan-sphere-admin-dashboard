"use client";

import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { ListApplicationItem } from "@/types/adminApplication";

interface ApplicationsTableProps {
  applications: ListApplicationItem[];
  isLoading?: boolean;
}

export function getStatusStyles(status: string) {
  const type = (status || "").toLowerCase().replace(/[\s_]+/g, " ");
  switch (type) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
    case "under review":
      return "bg-amber-50 text-amber-700 border-amber-200/50";
    case "submitted":
      return "bg-blue-50 text-blue-700 border-blue-200/50";
    case "pending documents":
      return "bg-orange-50/60 text-orange-700 border-orange-200/50";
    case "kyc required":
      return "bg-purple-50 text-purple-700 border-purple-200/50";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    case "draft":
      return "bg-slate-100 text-slate-600 border-slate-200/50";
    case "completed":
      return "bg-teal-50 text-teal-700 border-teal-200/50";
    default:
      return "bg-zinc-50 text-zinc-600 border-zinc-200";
  }
}

export function getDtiStyles(dti: number) {
  if (dti <= 35) return "text-emerald-600 font-semibold";
  if (dti <= 45) return "text-amber-600 font-semibold";
  return "text-rose-600 font-semibold";
}

export const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export default function ApplicationsTable({
  applications,
  isLoading,
}: ApplicationsTableProps) {
  if (isLoading) {
    return (
      <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-b border-zinc-100">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableHead key={i} className="px-6 py-4.5">
                      <Skeleton className="h-4 w-20 rounded" />
                    </TableHead>
                  ))}
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b border-zinc-100">
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-24 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-28 rounded" />
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-28 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-20 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-12 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-20 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-right">
                      <Skeleton className="h-4 w-4 rounded inline-block" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              <TableRow className="border-b border-zinc-100">
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Application #
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Customer
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Loan Type
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Amount
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  DTI
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Date
                </TableHead>
                <TableHead className="px-6 py-4.5 w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length > 0 ? (
                applications.map((app) => {
                  const dateDisplay = app.date
                    ? new Date(app.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "";

                  return (
                    <TableRow
                      key={app.id}
                      className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200"
                    >
                      <TableCell className="px-6 py-4.5 font-bold text-[#e05638]">
                        {app.applicationNumber}
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-zinc-200/70 border border-zinc-300/30">
                            <AvatarFallback className="text-xs font-bold text-zinc-700 bg-zinc-200">
                              {app.customer?.initials || getInitials(app.customer?.name || "")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-zinc-800 text-sm">
                            {app.customer?.name || ""}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4.5 text-zinc-500 font-semibold text-sm">
                        {app.loanType?.name || ""}
                      </TableCell>
                      <TableCell className="px-6 py-4.5 font-extrabold text-zinc-800 text-sm">
                        {app.amountDisplay}
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(
                            app.statusLabel || app.status
                          )}`}
                        >
                          {app.statusLabel || app.status}
                        </span>
                      </TableCell>
                      <TableCell className={`px-6 py-4.5 text-sm ${getDtiStyles(app.dtiRatio)}`}>
                        {app.dtiRatioDisplay}
                      </TableCell>
                      <TableCell className="px-6 py-4.5 text-zinc-400 font-semibold text-sm">
                        {dateDisplay}
                      </TableCell>
                      <TableCell className="px-6 py-4.5 text-right">
                        <Link 
                          href={`/applications/${app.id}`}
                          className="inline-flex items-center justify-center text-zinc-300 hover:text-zinc-600 transition-colors duration-300 group/btn p-1"
                        >
                          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-zinc-400 font-semibold text-sm">
                    No loan applications matched your search filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
