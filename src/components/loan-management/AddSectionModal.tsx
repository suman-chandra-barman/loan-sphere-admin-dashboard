"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useAddTemplateSectionMutation } from "@/redux/api/loanManagementApi";

interface AddSectionModalProps {
  templateId: string;
  onClose: () => void;
}

export default function AddSectionModal({ templateId, onClose }: AddSectionModalProps) {
  const [addSection, { isLoading }] = useAddTemplateSectionMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

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
      await addSection({
        templateId,
        title: title.trim(),
        description: description.trim(),
      }).unwrap();
      onClose();
    } catch {
      setSubmitError("Failed to add section. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg bg-white border border-zinc-200 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div>
            <h2 className="font-bold text-zinc-900 text-base">Add Template Section</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Sections form the structure of this loan agreement template
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
              placeholder="Describe the clauses, legal descriptions, or options associated with this template section..."
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
              {isLoading ? "Adding..." : "Add Section"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
