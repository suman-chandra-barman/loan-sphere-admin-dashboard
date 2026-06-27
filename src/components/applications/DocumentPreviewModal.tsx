import React from "react";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
  onApprove: (doc: any) => void;
  onReject: (doc: any) => void;
  isUpdating?: boolean;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  document,
  onApprove,
  onReject,
  isUpdating = false,
}: DocumentPreviewModalProps) {
  if (!document) return null;

  const mimeType = (document.mimeType || "").toLowerCase();
  const fileUrl = document.fileUrl || "";
  const title = document.documentTitle || document.originalFileName || "Document";

  const isImage = mimeType.startsWith("image/") || /\.(png|jpe?g|gif|webp)$/i.test(fileUrl);
  const isPdf = mimeType === "application/pdf" || /\.pdf$/i.test(fileUrl);

  const fullUrl = fileUrl.startsWith("http")
    ? fileUrl
    : `${process.env.NEXT_PUBLIC_BASE_URL || ""}${fileUrl}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full">
        <DialogCloseButton />
        <DialogHeader>
          <DialogTitle className="text-zinc-900 font-extrabold">{title}</DialogTitle>
          <DialogDescription>
            {document.fileSizeDisplay} • Uploaded on{" "}
            {new Date(document.uploadedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center justify-center w-full">
          {isImage ? (
            <div className="w-full h-[60vh] flex items-center justify-center bg-zinc-50/50 rounded-xl border border-zinc-100 overflow-hidden p-2">
              <img
                src={fullUrl}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          ) : isPdf ? (
            <div className="w-full h-[60vh] bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
              <iframe
                src={fullUrl}
                className="w-full h-full border-0"
                title={title}
              />
            </div>
          ) : (
            <div className="w-full h-[40vh] flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200 border-dashed rounded-xl p-8 space-y-4">
              <FileText className="h-16 w-16 text-rose-500" />
              <span className="text-sm font-semibold text-zinc-500 text-center">
                Preview not available for this document type ({mimeType})
              </span>
              <a
                href={fullUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-3xs hover:bg-amber-600 transition-colors"
              >
                Open in new tab
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            className="rounded-xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            disabled={isUpdating || !document.actions?.canApprove}
            className={`rounded-xl text-white font-bold transition-colors ${
              !document.actions?.canApprove
                ? "bg-zinc-150 border border-zinc-200 text-zinc-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
            onClick={() => onApprove(document)}
          >
            Approve...
          </Button>
          <Button
            disabled={isUpdating || !document.actions?.canReject}
            className={`rounded-xl text-white font-bold transition-colors ${
              !document.actions?.canReject
                ? "bg-zinc-150 border border-zinc-200 text-zinc-400 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
            onClick={() => onReject(document)}
          >
            Reject...
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
