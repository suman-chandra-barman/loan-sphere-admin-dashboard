import React from "react";
import { Home, Car, Briefcase, GraduationCap, Wallet, Pencil, Trash2 } from "lucide-react";
import { LoanType } from "@/types/loan";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LoanTypeCardProps {
  loanType: LoanType;
  assignedTemplateName: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

// Custom maps to match mockup colors and icons
const IconMap = {
  Home,
  Car,
  Briefcase,
  GraduationCap,
  Wallet
};

const ColorMap = {
  Home: { bg: "bg-emerald-50", text: "text-emerald-600" },
  Car: { bg: "bg-blue-50", text: "text-blue-600" },
  Briefcase: { bg: "bg-amber-50", text: "text-amber-700" },
  GraduationCap: { bg: "bg-indigo-50", text: "text-indigo-600" },
  Wallet: { bg: "bg-rose-50", text: "text-rose-600" }
};

export default function LoanTypeCard({
  loanType,
  assignedTemplateName,
  onEdit,
  onDelete,
  onToggleStatus
}: LoanTypeCardProps) {
  const IconComponent = IconMap[loanType.icon] || Wallet;
  const styles = ColorMap[loanType.icon] || ColorMap.Wallet;
  const isActive = loanType.status === "Active";

  return (
    <Card className="flex flex-col bg-white border border-zinc-200/70 shadow-xs rounded-2xl overflow-hidden">
      {/* Upper Content */}
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${styles.bg} ${styles.text}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <span className="font-bold text-zinc-900 text-base">{loanType.name}</span>
          </div>

          <Badge
            variant={isActive ? "default" : "secondary"}
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border-0"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-600" : "bg-zinc-400"}`} />
            {loanType.status}
          </Badge>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Assigned Template
          </p>
          <p className="text-sm font-bold text-zinc-800 mt-1 line-clamp-1">
            {assignedTemplateName || "No template assigned"}
          </p>
        </div>
      </div>

      {/* Footer / Toggle & Actions */}
      <div className="px-5 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        {/* Toggle Switch */}
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive}
              onChange={onToggleStatus}
            />
            <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A31D1D]"></div>
          </div>
          <span className="text-xs font-semibold text-zinc-500">
            {isActive ? "Active" : "Disabled"}
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onEdit}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors"
            title="Edit Loan Type"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-lg text-rose-500 hover:text-rose-600 transition-colors"
            title="Delete Loan Type"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
