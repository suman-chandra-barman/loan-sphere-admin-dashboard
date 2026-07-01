"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import { LoanTemplateSection } from "@/types/loan";
import { useUpdateTemplateSectionMutation } from "@/redux/api/loanManagementApi";

interface EditSectionModalProps {
  section: LoanTemplateSection;
  onClose: () => void;
}

export default function EditSectionModal({ section, onClose }: EditSectionModalProps) {
  const [updateSection, { isLoading }] = useUpdateTemplateSectionMutation();

  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setTitle(section.title);
    setDescription(section.description);
    setErrors({});
    setSubmitError("");
  }, [section]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Section title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await updateSection({
        id: section.id,
        templateId: section.templateId,
        title: title.trim(),
        description: description.trim(),
      }).unwrap();

      toast.success(res.message || "Section updated successfully!");
      onClose();
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to update section. Please try again.";
      toast.error(message);
      setSubmitError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg bg-white border border-zinc-200 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div>
            <h2 className="font-bold text-zinc-900 text-base">Edit Template Section</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Update the section header and content guidelines
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Section Title <span className="text-rose-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((p) => ({ ...p, title: "" }));
              }}
              placeholder="e.g., Loan Amount"
              autoFocus
              className={errors.title ? "border-rose-500" : ""}
            />
            {errors.title && (
              <p className="text-xs font-semibold text-rose-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Section Description <span className="text-rose-500">*</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((p) => ({ ...p, description: "" }));
              }}
              placeholder="Describe the clauses, guidelines, or options..."
              className={`resize-none min-h-[120px] ${
                errors.description ? "border-rose-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-xs font-semibold text-rose-500">{errors.description}</p>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <p className="text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {submitError}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-9 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-9 px-4 rounded-lg cursor-pointer disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
