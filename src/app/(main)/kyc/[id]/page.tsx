"use client";

import { useParams } from "next/navigation";
import { useGetKycDetailsQuery } from "@/redux/api/kycApi";
import KycDetailHeader from "@/components/kyc/KycDetailHeader";
import KycDocumentViewer from "@/components/kyc/KycDocumentViewer";
import KycDecisionActions from "@/components/kyc/KycDecisionActions";
import KycVerificationSteps from "@/components/kyc/KycVerificationSteps";
import ErrorState from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";

export default function KycDetailPage() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, error, refetch } = useGetKycDetailsQuery(id);

  const kyc = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-48 rounded" />
          <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 rounded" />
                <Skeleton className="h-4 w-72 rounded" />
              </div>
            </div>
            <div className="space-y-2 md:text-right">
              <Skeleton className="h-4 w-52 rounded" />
              <Skeleton className="h-4 w-40 rounded" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Skeleton className="h-[550px] w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-60 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !kyc) {
    return (
      <div className="space-y-6 pb-12 min-h-screen">
        <ErrorState
          title="Failed to Load KYC Details"
          description="We couldn't fetch the detailed audit information for this KYC verification. It might have been deleted, or you may have lost permission."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Detail Header Section */}
      <KycDetailHeader kyc={kyc} />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Hand: Document Gallery Inspector */}
        <div className="lg:col-span-8">
          <KycDocumentViewer files={kyc.files} />
        </div>

        {/* Right Hand: Progress steps and decision actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Auditor Decision Actions */}
          <KycDecisionActions kyc={kyc} />

          {/* Verification steps status, guidelines checklists and logs */}
          <KycVerificationSteps kyc={kyc} />
        </div>
      </div>
    </div>
  );
}
