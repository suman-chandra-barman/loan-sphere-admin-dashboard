"use client";

import { ArrowRight, Calendar, UserCheck, ShieldCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { KycVerificationItem } from "@/types/kyc";

interface KycTableProps {
  verifications: KycVerificationItem[];
  isLoading?: boolean;
}

export function getKycStatusStyles(status: string) {
  const type = (status || "").toLowerCase().replace(/[\s_]+/g, " ");
  switch (type) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
    case "under review":
    case "pending verification":
      return "bg-amber-50 text-amber-700 border-amber-200/50";
    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    default:
      return "bg-zinc-50 text-zinc-600 border-zinc-200";
  }
}

export function getDocumentBadgeStyles(docType: string) {
  const type = (docType || "").toLowerCase();
  if (type === "passport") {
    return "bg-indigo-50 text-indigo-700 border-indigo-200/40";
  }
  return "bg-sky-50 text-sky-700 border-sky-200/40";
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

export default function KycTable({ verifications, isLoading }: KycTableProps) {
  if (isLoading) {
    return (
      <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-b border-zinc-100">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableHead key={i} className="px-6 py-4.5">
                      <Skeleton className="h-4 w-20 rounded" />
                    </TableHead>
                  ))}
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b border-zinc-100">
                    <TableCell className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-28 rounded" />
                          <Skeleton className="h-3.5 w-36 rounded" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-20 rounded" />
                        <Skeleton className="h-3.5 w-24 rounded" />
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-24 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4 w-16 rounded" />
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
                  Customer
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Document Type
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Loan Application
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Submitted At
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Provider
                </TableHead>
                <TableHead className="px-6 py-4.5 w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {verifications.length > 0 ? (
                verifications.map((kyc) => {
                  const dateDisplay = kyc.submittedAt
                    ? new Date(kyc.submittedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";

                  return (
                    <TableRow
                      key={kyc.id}
                      className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200"
                    >
                      {/* Customer info */}
                      <TableCell className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 bg-zinc-200 border border-zinc-300/30">
                            <AvatarFallback className="text-xs font-bold text-zinc-700 bg-zinc-200">
                              {kyc.customer?.initials || getInitials(kyc.customer?.name || "")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-800 text-sm">
                              {kyc.customer?.name || "Unknown Customer"}
                            </span>
                            <span className="text-zinc-400 text-xs font-medium">
                              {kyc.customer?.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Document Type */}
                      <TableCell className="px-6 py-4.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold shadow-3xs ${getDocumentBadgeStyles(
                            kyc.documentType
                          )}`}
                        >
                          {kyc.documentTypeLabel || kyc.documentType}
                        </span>
                      </TableCell>

                      {/* Application Info */}
                      <TableCell className="px-6 py-4.5">
                        {kyc.application ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-zinc-700 text-xs group-hover:text-[#e05638] transition-colors">
                              {kyc.application.applicationNumber}
                            </span>
                            <span className="text-zinc-400 text-xs font-medium">
                              {kyc.application.loanType}
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-400 text-xs">—</span>
                        )}
                      </TableCell>

                      {/* Verification Status */}
                      <TableCell className="px-6 py-4.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold shadow-3xs ${getKycStatusStyles(
                            kyc.status
                          )}`}
                        >
                          {kyc.statusLabel || kyc.status}
                        </span>
                      </TableCell>

                      {/* Date Submitted */}
                      <TableCell className="px-6 py-4.5 text-zinc-500 font-medium text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                          <span>{dateDisplay}</span>
                        </div>
                      </TableCell>

                      {/* Verification Provider */}
                      <TableCell className="px-6 py-4.5 text-zinc-500 font-bold text-xs uppercase tracking-wider">
                        <span className="bg-zinc-100 border border-zinc-200/60 px-2 py-0.5 rounded-md">
                          {kyc.provider}
                        </span>
                      </TableCell>

                      {/* Navigation Detail Button */}
                      <TableCell className="px-6 py-4.5 text-right">
                        <Link
                          href={`/kyc/${kyc.id}`}
                          className="inline-flex items-center justify-center text-zinc-300 hover:text-[#e05638] transition-colors duration-300 group/btn p-1"
                        >
                          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-zinc-400 font-semibold text-sm">
                    No KYC verification requests matches your filters.
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
