"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { RecentApplications } from "@/types/dashboard";

interface RecentApplicationsTableProps {
  data?: RecentApplications;
  isLoading?: boolean;
}

const mapApiUrlToFrontend = (url: string) => {
  return url.replace(/^\/api\/admin\//, "/");
};

function getStatusStyles(badgeType: string, status: string) {
  const type = (badgeType || status || "").toLowerCase();
  switch (type) {
    case "green":
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
    case "yellow":
    case "under_review":
    case "under review":
      return "bg-amber-50 text-amber-700 border-amber-200/50";
    case "purple":
    case "ai_assessment":
    case "ai assessment":
      return "bg-purple-50 text-purple-700 border-purple-200/50";
    case "blue":
    case "submitted":
      return "bg-blue-50 text-blue-700 border-blue-200/50";
    case "orange":
    case "pending_documents":
    case "pending documents":
    case "pending docs":
      return "bg-orange-50/60 text-orange-700 border-orange-200/50";
    case "red":
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    case "slate":
    case "draft":
      return "bg-slate-100 text-slate-600 border-slate-200/50";
    case "teal":
    case "cond. approved":
    case "cond_approved":
      return "bg-teal-50 text-teal-700 border-teal-200/50";
    default:
      return "bg-zinc-50 text-zinc-600 border-zinc-200";
  }
}

export default function RecentApplicationsTable({
  data,
  isLoading,
}: RecentApplicationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const items = data?.items || [];
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const paginatedApps = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-6 pt-6">
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-zinc-50/50">
                  <TableRow className="border-b border-zinc-100">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <TableHead key={i} className="px-6 py-4">
                        <Skeleton className="h-3 w-16 rounded" />
                      </TableHead>
                    ))}
                    <TableHead className="w-[60px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, rIndex) => (
                    <TableRow key={rIndex} className="border-b border-zinc-100">
                      <TableCell className="px-6 py-4.5">
                        <Skeleton className="h-4 w-24 rounded" />
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <Skeleton className="h-4 w-32 rounded" />
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <Skeleton className="h-4 w-16 rounded" />
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <Skeleton className="h-4 w-20 rounded" />
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <Skeleton className="h-5 w-24 rounded-full" />
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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-6 pt-6">
          <CardTitle className="text-base font-bold text-zinc-900">
            {data?.title || "Recent Applications"}
          </CardTitle>
          <Link href="/applications" passHref legacyBehavior>
            <button className="flex items-center gap-1 text-xs font-semibold text-amber-700 transition-colors hover:text-amber-800 cursor-pointer">
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-b border-zinc-100">
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Application
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Customer
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Type
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Date
                  </TableHead>
                  <TableHead className="px-6 py-4 w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedApps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="px-6 py-10 text-center text-zinc-500 font-medium">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedApps.map((app) => {
                    const frontendUrl = app.detailApi
                      ? mapApiUrlToFrontend(app.detailApi)
                      : `/applications/${app.id}`;

                    return (
                      <TableRow
                        key={app.id || app.applicationNumber}
                        className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200"
                      >
                        <TableCell className="px-6 py-4.5 font-bold text-zinc-800">
                          {app.applicationNumber}
                        </TableCell>
                        <TableCell className="px-6 py-4.5">
                          <div className="flex items-center gap-2.5">
                            {app.customer?.initials && (
                              <div className="h-7 w-7 rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-650 flex items-center justify-center border border-zinc-200/50">
                                {app.customer.initials}
                              </div>
                            )}
                            <span className="text-zinc-500 font-medium truncate max-w-[150px]" title={app.customerName}>
                              {app.customerName || app.customer?.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4.5 text-zinc-500 font-medium">
                          {app.type || app.loanType?.shortName || app.loanType?.name}
                        </TableCell>
                        <TableCell className="px-6 py-4.5 font-bold text-zinc-800">
                          {app.amountDisplay}
                        </TableCell>
                        <TableCell className="px-6 py-4.5">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs ${getStatusStyles(
                              app.statusBadgeType,
                              app.status
                            )}`}
                          >
                            {app.statusLabel || app.status}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4.5 text-zinc-400 font-medium">
                          {app.dateDisplay}
                        </TableCell>
                        <TableCell className="px-6 py-4.5 text-right">
                          <Link 
                            href={frontendUrl}
                            className="inline-flex items-center justify-center text-zinc-300 hover:text-zinc-600 transition-colors duration-300 group/btn p-1"
                          >
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Footer */}
      {items.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          className="justify-end py-2 px-1"
        />
      )}
    </div>
  );
}
