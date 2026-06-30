"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, FileText, CheckCircle2, AlertOctagon } from "lucide-react";
import { getKycStatusStyles } from "./KycTable";
import type { KycVerificationItem } from "@/types/kyc";

interface KycDetailHeaderProps {
  kyc: KycVerificationItem;
}

export default function KycDetailHeader({ kyc }: KycDetailHeaderProps) {
  const dateSubmitted = kyc.submittedAt
    ? new Date(kyc.submittedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const dateReviewed = kyc.reviewedAt
    ? new Date(kyc.reviewedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="space-y-4">
      {/* Back Button link */}
      <div>
        <Link
          href="/kyc"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to KYC Verification List
        </Link>
      </div>

      {/* Profile summary header */}
      <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-xs flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-700 font-extrabold text-lg shadow-sm">
            {kyc.customer?.initials || kyc.customer?.name?.substring(0, 2).toUpperCase() || "RO"}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-zinc-900 leading-tight">
                {kyc.customer?.name}
              </h2>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold shadow-3xs ${getKycStatusStyles(
                  kyc.status
                )}`}
              >
                {kyc.statusLabel || kyc.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 font-medium">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4 text-zinc-400" />
                {kyc.customer?.email}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4 text-zinc-400" />
                App: {kyc.application?.applicationNumber || "N/A"} ({kyc.application?.loanType || "N/A"})
              </span>
            </div>
          </div>
        </div>

        {/* Date / Metadata Info */}
        <div className="flex flex-col gap-1.5 text-xs font-semibold text-zinc-500 border-t border-zinc-100 pt-4 md:border-t-0 md:pt-0 md:text-right">
          <div className="flex items-center gap-1.5 md:justify-end">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <span>Submitted: {dateSubmitted}</span>
          </div>
          {dateReviewed && (
            <div className="flex items-center gap-1.5 md:justify-end text-emerald-600 font-bold">
              <CheckCircle2 className="h-4 w-4" />
              <span>Reviewed: {dateReviewed}</span>
            </div>
          )}
          {kyc.adminNote && (
            <div className="text-zinc-500 max-w-sm line-clamp-2 md:text-right mt-1 font-medium bg-zinc-50 px-2 py-1 rounded border border-zinc-100 text-[11px]">
              <span className="font-bold">Note: </span>{kyc.adminNote}
            </div>
          )}
          {kyc.rejectionReason && (
            <div className="text-rose-600 max-w-sm line-clamp-2 md:text-right mt-1 font-semibold bg-rose-50/50 px-2 py-1 rounded border border-rose-100 text-[11px]">
              <span className="font-bold">Rejection Reason: </span>{kyc.rejectionReason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
