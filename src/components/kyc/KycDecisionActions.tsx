"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useUpdateKycStatusMutation } from "@/redux/api/kycApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog";
import type { KycVerificationItem } from "@/types/kyc";

interface KycDecisionActionsProps {
  kyc: KycVerificationItem;
}

export default function KycDecisionActions({ kyc }: KycDecisionActionsProps) {
  const [updateKycStatus, { isLoading }] = useUpdateKycStatusMutation();
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [note, setNote] = useState("Document authenticity and facial match checked.");
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = async () => {
    try {
      const response = await updateKycStatus({
        id: kyc.id,
        status: "approved",
        note: note.trim(),
      }).unwrap();

      if (response.success) {
        toast.success("KYC request approved successfully");
        setIsApproveOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve KYC request");
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.warning("Please provide a rejection reason");
      return;
    }
    try {
      const response = await updateKycStatus({
        id: kyc.id,
        status: "rejected",
        note: rejectionReason.trim(),
      }).unwrap();

      if (response.success) {
        toast.success("KYC request rejected successfully");
        setIsRejectOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reject KYC request");
    }
  };

  // If already processed, show visual audit summary banner
  if (kyc.status === "approved") {
    return (
      <div className="bg-emerald-50 border border-emerald-200/60 p-5 rounded-2xl flex items-start gap-3 shadow-3xs">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-extrabold text-emerald-800 uppercase tracking-wider">
            Verification Approved
          </h4>
          <p className="text-emerald-700 font-medium leading-relaxed">
            This customer has been successfully verified. Authenticity audits on identity documents and selfie biometric matching have passed.
          </p>
          {kyc.adminNote && (
            <p className="text-emerald-900 mt-2 font-mono text-[11px] bg-white/70 p-2 rounded border border-emerald-100/50">
              <span className="font-bold">Audit Note: </span>
              {kyc.adminNote}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (kyc.status === "rejected") {
    return (
      <div className="bg-rose-50 border border-rose-200/60 p-5 rounded-2xl flex items-start gap-3 shadow-3xs">
        <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-extrabold text-rose-800 uppercase tracking-wider">
            Verification Rejected
          </h4>
          <p className="text-rose-700 font-medium leading-relaxed">
            This verification application has been marked invalid. The customer will need to correct and upload valid details/images based on the auditor notes.
          </p>
          {kyc.adminNote && (
            <p className="text-rose-900 mt-2 font-mono text-[11px] bg-white/70 p-2 rounded border border-rose-100/50">
              <span className="font-bold">Rejection Note: </span>
              {kyc.adminNote}
            </p>
          )}
        </div>
      </div>
    );
  }

  const canApprove = kyc.adminActions?.canApprove;
  const canReject = kyc.adminActions?.canReject;

  return (
    <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-xs space-y-4">
      <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider">
        Auditor KYC Decision
      </h3>
      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
        Verify that the face details matches the document photograph, names on loan applications align with the ID details, and images have sufficient clarity.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {canApprove && (
          <Button
            onClick={() => {
              setNote("Document authenticity and facial match checked.");
              setIsApproveOpen(true);
            }}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            Approve Verification
          </Button>
        )}

        {canReject && (
          <Button
            onClick={() => {
              setRejectionReason("");
              setIsRejectOpen(true);
            }}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white cursor-pointer flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 active:scale-98"
          >
            <ShieldAlert className="h-4.5 w-4.5" />
            Reject Verification
          </Button>
        )}
      </div>

      {/* Approve Dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm KYC Approval</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this verification request? Please provide any additional internal audit notes below.
            </DialogDescription>
          </DialogHeader>
          <DialogCloseButton />

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Internal Audit Notes
              </label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter audit check note..."
                className="min-h-[90px] text-sm rounded-xl border border-zinc-200 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="secondary"
                onClick={() => setIsApproveOpen(false)}
                className="h-10 px-4 rounded-xl text-xs font-bold text-zinc-600 border border-zinc-200/60 bg-zinc-50 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="h-10 px-5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center gap-1.5"
              >
                {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Confirm Approval
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm KYC Rejection</DialogTitle>
            <DialogDescription>
              Please specify the precise reason for rejecting this verification request. This explanation is critical and will help the customer correct the issues.
            </DialogDescription>
          </DialogHeader>
          <DialogCloseButton />

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Rejection Reason (Required)
              </label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Document image is blurry, Selfie face mismatch, expired ID document..."
                className="min-h-[100px] text-sm rounded-xl border border-zinc-200 focus-visible:ring-rose-500"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="secondary"
                onClick={() => setIsRejectOpen(false)}
                className="h-10 px-4 rounded-xl text-xs font-bold text-zinc-600 border border-zinc-200/60 bg-zinc-50 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading || !rejectionReason.trim()}
                className="h-10 px-5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer flex items-center gap-1.5"
              >
                {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
