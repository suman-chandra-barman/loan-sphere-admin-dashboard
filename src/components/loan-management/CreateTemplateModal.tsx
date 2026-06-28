"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useCreateLoanTemplateMutation } from "@/redux/api/loanManagementApi";

interface CreateTemplateModalProps {
  onClose: () => void;
}

export default function CreateTemplateModal({ onClose }: CreateTemplateModalProps) {
  const router = useRouter();
  const [createTemplate, { isLoading }] = useCreateLoanTemplateMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Template name is required";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await createTemplate({
        name: name.trim(),
        description: description.trim(),
        status: "draft",
      }).unwrap();
      onClose();
      if (res.data?.id) {
        router.push(`/loan-management/loan-templates/${res.data.id}`);
      }
    } catch {
      setSubmitError("Failed to create template. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div>
            <h2 className="font-bold text-zinc-900 text-base">Create Loan Template</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Status will be set to <strong>draft</strong> by default
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
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Template Name <span className="text-rose-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="e.g., Standard Home Loan Template"
              autoFocus
              className={errors.name ? "border-rose-500" : ""}
            />
            {errors.name && (
              <p className="text-xs font-semibold text-rose-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Description{" "}
              <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this template..."
              className="resize-none min-h-[80px]"
            />
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
              {isLoading ? "Creating..." : "Create Template"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
