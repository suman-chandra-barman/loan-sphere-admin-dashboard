import React, { useState, useEffect } from "react";
import { ArrowLeft, Home, Car, Briefcase, GraduationCap, Wallet } from "lucide-react";
import { LoanType, LoanTemplate } from "@/types/loan";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface LoanTypeFormProps {
  loanType?: LoanType | null;
  templates: LoanTemplate[];
  onSave: (data: Omit<LoanType, "id">) => void;
  onCancel: () => void;
}

const AVAILABLE_ICONS = [
  { key: "Home", label: "Home", icon: Home },
  { key: "Car", label: "Car", icon: Car },
  { key: "Briefcase", label: "Business", icon: Briefcase },
  { key: "GraduationCap", label: "Education", icon: GraduationCap },
  { key: "Wallet", label: "Personal", icon: Wallet }
] as const;

export default function LoanTypeForm({
  loanType,
  templates,
  onSave,
  onCancel
}: LoanTypeFormProps) {
  const isEdit = !!loanType;

  // Form states
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<LoanType["icon"]>("Home");
  const [description, setDescription] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const [errors, setErrors] = useState<{ name?: string; templateId?: string }>({});

  // Populate form if editing
  useEffect(() => {
    if (loanType) {
      setName(loanType.name);
      setIcon(loanType.icon);
      setDescription(loanType.description || "");
      setTemplateId(loanType.templateId);
      setStatus(loanType.status);
    } else {
      setName("");
      setIcon("Home");
      setDescription("");
      setTemplateId(templates[0]?.id || "");
      setStatus("Active");
    }
  }, [loanType, templates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Loan Type Name is required";
    if (!templateId) newErrors.templateId = "Assigned Template is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: name.trim(),
      icon,
      description: description.trim(),
      templateId,
      status
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onCancel}
          className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            {isEdit ? "Edit Loan Type" : "Add New Loan Type"}
          </h2>
          <p className="text-xs font-semibold text-zinc-400 mt-0.5">
            {isEdit ? "Update loan type details and configuration" : "Create a new loan type for your platform"}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="p-6 bg-white border border-zinc-200/70 shadow-sm rounded-2xl max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center">
              Loan Type Name <span className="text-rose-500 ml-1">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="e.g., Home Loan"
              className={errors.name ? "border-rose-500 focus-visible:ring-rose-500" : ""}
            />
            {errors.name && (
              <p className="text-xs font-semibold text-rose-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Select Icon Grid */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">
              Select Icon <span className="text-rose-500 ml-1">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setIcon(item.key)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#A31D1D] bg-[#A31D1D]/5 text-[#A31D1D] font-bold shadow-xs"
                        : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 ${isSelected ? "text-[#A31D1D]" : "text-zinc-400"}`} />
                    <span className="text-xs mt-2">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">
              Short Description <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this loan type..."
              className="resize-none min-h-[100px]"
            />
          </div>

          {/* Assign Template Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center">
              Assign Template <span className="text-rose-500 ml-1">*</span>
            </label>
            <select
              value={templateId}
              onChange={(e) => {
                setTemplateId(e.target.value);
                if (errors.templateId) setErrors({ ...errors, templateId: undefined });
              }}
              className={`h-10 w-full rounded-md border bg-white px-3 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A31D1D] ${
                errors.templateId ? "border-rose-500" : "border-zinc-200"
              }`}
            >
              <option value="" disabled>Select a template...</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.templateId && (
              <p className="text-xs font-semibold text-rose-500 mt-1">{errors.templateId}</p>
            )}
          </div>

          {/* Status Toggle Card */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50/50 border border-zinc-100">
            <div>
              <p className="text-sm font-bold text-zinc-800">Status</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                This loan type is active and visible to customers
              </p>
            </div>
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={status === "Active"}
                onChange={() => setStatus(status === "Active" ? "Inactive" : "Active")}
              />
              <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-10 px-6 rounded-lg transition-colors cursor-pointer"
            >
              {isEdit ? "Save Changes" : "Create Loan Type"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-10 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
