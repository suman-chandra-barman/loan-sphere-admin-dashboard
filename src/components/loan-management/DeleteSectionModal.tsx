"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTemplateSectionMutation } from "@/redux/api/loanManagementApi";
import { toast } from "react-toastify";
import { LoanTemplateSection } from "@/types/loan";

interface DeleteSectionModalProps {
  section: LoanTemplateSection;
  onClose: () => void;
}

export default function DeleteSectionModal({ section, onClose }: DeleteSectionModalProps) {
  const [deleteSection, { isLoading: isDeleting }] = useDeleteTemplateSectionMutation();

  const handleConfirm = async () => {
    try {
      await deleteSection({
        id: section.id,
        templateId: section.templateId,
      }).unwrap();
      toast.success("Section deleted successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete section.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md bg-white border border-zinc-200 shadow-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-zinc-900">
            Delete Section
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 mt-2">
            Are you sure you want to delete the section &ldquo;{section.title}&rdquo;? This action cannot be undone and will permanently remove the section from this template.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-9 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold h-9 px-4 rounded-lg cursor-pointer disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
