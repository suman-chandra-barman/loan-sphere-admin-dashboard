"use client";

import React, { useState } from "react";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import { LoanType } from "@/types/loan";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToggleLoanTypeStatusMutation } from "@/redux/api/loanManagementApi";

interface LoanTypeCardProps {
  loanType: LoanType;
  onEdit: (loanType: LoanType) => void;
  onDelete: () => void;
}

export default function LoanTypeCard({
  loanType,
  onEdit,
  onDelete,
}: LoanTypeCardProps) {
  const [toggleStatus, { isLoading }] = useToggleLoanTypeStatusMutation();
  const [optimisticActive, setOptimisticActive] = useState(loanType.isActive);

  const handleToggle = async () => {
    const newValue = !optimisticActive;
    setOptimisticActive(newValue); // Optimistic update
    try {
      await toggleStatus({ id: loanType.id, isActive: newValue }).unwrap();
    } catch {
      setOptimisticActive(!newValue); // Revert on error
    }
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return (
    <Card className="flex flex-col bg-white border border-zinc-200/70 shadow-xs rounded-2xl overflow-hidden">
      {/* Upper Content */}
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Icon Image */}
            <div className="h-10 w-10 rounded-xl bg-zinc-100 overflow-hidden flex items-center justify-center shrink-0">
              {loanType.iconImageUrl ? (
                <img
                  src={`${baseUrl}${loanType.iconImageUrl}`}
                  alt={loanType.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <ImageOff className="h-5 w-5 text-zinc-400" />
              )}
            </div>
            <span className="font-bold text-zinc-900 text-base line-clamp-1">
              {loanType.name}
            </span>
          </div>

          <Badge
            variant={optimisticActive ? "default" : "secondary"}
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border-0 shrink-0"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                optimisticActive ? "bg-emerald-600" : "bg-zinc-400"
              }`}
            />
            {optimisticActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Description */}
        {loanType.description && (
          <p className="text-xs text-zinc-500 mt-3 line-clamp-2 leading-relaxed">
            {loanType.description}
          </p>
        )}

        {/* Assigned Template */}
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Assigned Template
          </p>
          <p className="text-sm font-bold text-zinc-800 mt-1 line-clamp-1">
            {loanType.assignedTemplate?.name ?? "No template assigned"}
          </p>
          {loanType.assignedTemplate && (
            <span
              className={`inline-flex items-center gap-1 mt-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                loanType.assignedTemplate.status === "published"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {loanType.assignedTemplate.status}
            </span>
          )}
        </div>
      </div>

      {/* Footer — Toggle & Actions */}
      <div className="px-5 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        {/* Toggle Switch */}
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={optimisticActive}
              onChange={handleToggle}
              disabled={isLoading}
            />
            <div
              className={`w-9 h-5 rounded-full transition-colors peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-zinc-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full ${
                isLoading ? "opacity-60" : ""
              } ${optimisticActive ? "bg-[#A31D1D]" : "bg-zinc-200"}`}
            />
          </div>
          <span className="text-xs font-semibold text-zinc-500">
            {isLoading ? "Updating..." : optimisticActive ? "Active" : "Inactive"}
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => onEdit(loanType)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
            title="Edit Loan Type"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-lg text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
            title="Delete Loan Type"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
