"use client";

import React, { useState } from "react";
import { X, Upload, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import { LoanType, TemplateDropdownItem } from "@/types/loan";
import {
  useCreateLoanTypeMutation,
  useUpdateLoanTypeMutation,
} from "@/redux/api/loanManagementApi";

interface LoanTypeModalProps {
  /** Pass a loanType to open in Edit mode, or null/undefined for Create mode */
  loanType?: LoanType | null;
  templates: TemplateDropdownItem[];
  onClose: () => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export default function LoanTypeModal({
  loanType,
  templates,
  onClose,
}: LoanTypeModalProps) {
  const isEdit = !!loanType;

  const [createLoanType, { isLoading: isCreating }] = useCreateLoanTypeMutation();
  const [updateLoanType, { isLoading: isUpdating }] = useUpdateLoanTypeMutation();
  const isSubmitting = isCreating || isUpdating;

  // ── Form State ────────────────────────────────────────────────────────────
  const [name, setName] = useState(loanType?.name ?? "");
  const [description, setDescription] = useState(loanType?.description ?? "");
  const [templateId, setTemplateId] = useState(loanType?.assignedTemplate?.id ?? (templates[0]?.id ?? ""));
  const [isActive, setIsActive] = useState(loanType?.isActive ?? true);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(
    loanType?.iconImageUrl ? `${BASE_URL}${loanType.iconImageUrl}` : null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Loan Type Name is required";
    if (!templateId) newErrors.templateId = "Assign a template";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("description", description.trim());
    fd.append("templateId", templateId);
    fd.append("isActive", String(isActive));
    if (iconFile) fd.append("iconImage", iconFile);

    try {
      if (isEdit && loanType) {
        await updateLoanType({ id: loanType.id, formData: fd }).unwrap();
      } else {
        await createLoanType(fd).unwrap();
      }
      toast.success(
        isEdit ? "Loan type updated successfully!" : "Loan type created successfully!"
      );
      onClose();
    } catch (err: unknown) {
      const errorObj = err as {
        data?: {
          message?: string;
          data?: Record<string, string[]>;
        };
      };
      let message =
        errorObj?.data?.message ||
        (isEdit ? "Failed to update loan type." : "Failed to create loan type.");

      // Extract specific validation message if available
      const validationErrors = errorObj?.data?.data;
      if (validationErrors) {
        const firstErrorKey = Object.keys(validationErrors)[0];
        if (firstErrorKey) {
          const fieldErrors = validationErrors[firstErrorKey];
          if (Array.isArray(fieldErrors) && fieldErrors[0]) {
            message = fieldErrors[0];
          }
        }
      }

      toast.error(message);
      setSubmitError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg bg-white border border-zinc-200 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div>
            <h2 className="font-bold text-zinc-900 text-base">
              {isEdit ? "Edit Loan Type" : "Add New Loan Type"}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEdit ? "Update the details below" : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Loan Type Name <span className="text-rose-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="e.g., Home Loan"
              className={errors.name ? "border-rose-500" : ""}
              autoFocus
            />
            {errors.name && (
              <p className="text-xs font-semibold text-rose-500">{errors.name}</p>
            )}
          </div>

          {/* Icon Upload */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Icon Image{" "}
              <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 h-10 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors">
                <Upload className="h-4 w-4 text-zinc-400" />
                {iconFile ? "Change Image" : isEdit ? "Replace Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleIconChange}
                />
              </label>

              {/* Preview */}
              <div className="h-12 w-12 rounded-xl overflow-hidden border border-zinc-200 flex items-center justify-center bg-zinc-100 shrink-0">
                {iconPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={iconPreview}
                    alt="Icon preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageOff className="h-5 w-5 text-zinc-300" />
                )}
              </div>

              {iconFile && (
                <span className="text-xs text-zinc-500 truncate max-w-[120px]">
                  {iconFile.name}
                </span>
              )}
            </div>
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
              placeholder="Brief description of this loan type..."
              className="resize-none min-h-[80px]"
            />
          </div>

          {/* Assign Template */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-zinc-700">
              Assign Template <span className="text-rose-500">*</span>
            </label>
            <select
              value={templateId}
              onChange={(e) => {
                setTemplateId(e.target.value);
                if (errors.templateId) setErrors((p) => ({ ...p, templateId: "" }));
              }}
              className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-zinc-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#A31D1D] cursor-pointer ${
                errors.templateId ? "border-rose-500" : "border-zinc-200"
              }`}
            >
              <option value="" disabled>
                Select a template...
              </option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.templateId && (
              <p className="text-xs font-semibold text-rose-500">{errors.templateId}</p>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50/50 border border-zinc-100">
            <div>
              <p className="text-sm font-bold text-zinc-800">Active Status</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Make this loan type visible and available
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isActive}
                onChange={() => setIsActive((v) => !v)}
              />
              <div className="relative w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
            </label>
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
              disabled={isSubmitting}
              className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-9 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-9 px-5 rounded-lg cursor-pointer disabled:opacity-60"
            >
              {isSubmitting
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                ? "Save Changes"
                : "Create Loan Type"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
