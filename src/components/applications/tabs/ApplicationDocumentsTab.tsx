import React, { useState } from "react";
import { FileText } from "lucide-react";
import {
  useGetApplicationDocumentsQuery,
  useUpdateDocumentStatusMutation,
} from "@/redux/api/applicationsApi";
import { DocumentsTabSkeleton } from "@/components/skeleton/TabContentSkeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DocumentPreviewModal from "@/components/applications/DocumentPreviewModal";

interface ApplicationDocumentsTabProps {
  applicationId: string;
}

export default function ApplicationDocumentsTab({ applicationId }: ApplicationDocumentsTabProps) {
  const { data, isLoading, error } = useGetApplicationDocumentsQuery(applicationId);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateDocumentStatusMutation();

  // Modal / Dialog States
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [actionType, setActionType] = useState<"approved" | "rejected" | null>(null);
  const [actionDoc, setActionDoc] = useState<any | null>(null);
  const [actionNote, setActionNote] = useState("");

  if (isLoading) {
    return <DocumentsTabSkeleton />;
  }

  if (error || !data?.success) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-8 text-center text-zinc-500 font-semibold shadow-3xs">
        Failed to load application documents.
      </div>
    );
  }

  const documents = data?.data?.documents || [];

  const handleOpenActionModal = (doc: any, type: "approved" | "rejected") => {
    setActionDoc(doc);
    setActionType(type);
    setActionNote(
      type === "approved"
        ? "Document verified and approved."
        : "Document is unclear. Please upload a clearer copy."
    );
    setActionOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!actionDoc || !actionType) return;

    try {
      const response = await updateStatus({
        id: applicationId,
        documentId: actionDoc.id,
        status: actionType,
        note: actionNote.trim() || undefined,
      }).unwrap();

      if (response?.success) {
        const { toast } = await import("react-toastify");
        toast.success(`Document status updated to ${actionType}`);
        setActionOpen(false);
      }
    } catch (err: any) {
      const { toast } = await import("react-toastify");
      toast.error(err?.data?.message || "Failed to update document status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-0 shadow-sm overflow-hidden animate-in fade-in duration-200">
        <div className="divide-y divide-zinc-100">
          {documents.length > 0 ? (
            documents.map((doc: any) => {
              const isApproved = doc.status?.toLowerCase() === "approved";
              const isRejected = doc.status?.toLowerCase() === "rejected";

              return (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-zinc-50/20 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-10.5 w-10.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                      <FileText className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm tracking-tight">
                        {doc.documentTitle || doc.originalFileName}
                      </h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                        {doc.fileSizeDisplay} •{" "}
                        {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold shadow-3xs ${isApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : isRejected
                          ? "bg-rose-50 text-rose-700 border-rose-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}
                  >
                    {doc.statusLabel || doc.status}
                  </span>

                  <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">


                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="h-9 px-3 rounded-xl font-bold text-xs border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition-all cursor-pointer shadow-3xs hover:border-zinc-350"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleOpenActionModal(doc, "approved")}
                      disabled={isUpdating || !doc.actions?.canApprove}
                      className={`h-9 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${!doc.actions?.canApprove || isUpdating
                          ? "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
                          : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
                        }`}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleOpenActionModal(doc, "rejected")}
                      disabled={isUpdating || !doc.actions?.canReject}
                      className={`h-9 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${!doc.actions?.canReject || isUpdating
                          ? "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
                          : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300"
                        }`}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-zinc-400 text-sm font-semibold">
              No documents found for this application.
            </div>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        document={previewDoc}
        onApprove={(doc) => {
          setPreviewDoc(null);
          handleOpenActionModal(doc, "approved");
        }}
        onReject={(doc) => {
          setPreviewDoc(null);
          handleOpenActionModal(doc, "rejected");
        }}
        isUpdating={isUpdating}
      />

      {/* Action Dialog (Approve/Reject confirmation with note) */}
      <Dialog open={actionOpen} onOpenChange={setActionOpen}>
        <DialogContent className="max-w-md">
          <DialogCloseButton />
          {actionDoc && (
            <>
              <DialogHeader>
                <DialogTitle className="text-zinc-900 font-extrabold">
                  {actionType === "approved" ? "Approve Document" : "Reject Document"}
                </DialogTitle>
                <DialogDescription>
                  {actionType === "approved"
                    ? "You are approving this document. Enter an optional verification note below."
                    : "You are rejecting this document. Please provide the reason below so the customer can upload a corrected version."}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  Verification Note
                </label>
                <Textarea
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  placeholder="Enter verification notes..."
                  className="rounded-xl border border-zinc-200/80 p-4 text-sm font-semibold focus:border-amber-500 focus:outline-none resize-none leading-relaxed text-zinc-700 bg-zinc-50/25 focus:bg-white transition-colors"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50"
                  onClick={() => setActionOpen(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isUpdating}
                  className={`rounded-xl text-white font-bold transition-colors ${actionType === "approved"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-rose-600 hover:bg-rose-700"
                    }`}
                  onClick={handleConfirmAction}
                >
                  {isUpdating ? "Processing..." : actionType === "approved" ? "Approve" : "Reject"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
