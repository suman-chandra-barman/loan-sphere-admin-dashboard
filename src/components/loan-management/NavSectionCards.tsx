import React from "react";
import { ArrowRight, FileText, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NavSectionCardsProps {
  stats: {
    totalTypes: number;
    totalTemplates: number;
  };
  onNavigateToTemplates: () => void;
  onScrollToTypes: () => void;
}

export default function NavSectionCards({
  stats,
  onNavigateToTemplates,
  onScrollToTypes
}: NavSectionCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Loan Types Navigation Card */}
      <Card
        onClick={onScrollToTypes}
        className="group relative flex flex-col p-6 bg-white border border-zinc-200/70 shadow-xs cursor-pointer hover:border-zinc-300 transition-all duration-200"
      >
        <div className="absolute top-6 right-6">
          <ArrowRight className="h-5 w-5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-100/80">
            <FileText className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-zinc-900">Loan Types</h3>
          <p className="text-sm text-zinc-500 mt-1">
            Manage available loan types and their configurations
          </p>
        </div>
        <div className="mt-6 border-t border-zinc-100 pt-4">
          <p className="text-xs font-semibold text-zinc-400">Active Types</p>
          <p className="text-2xl font-extrabold text-zinc-900 mt-0.5">
            {stats.totalTypes}
          </p>
        </div>
      </Card>

      {/* Loan Templates Navigation Card */}
      <Card
        onClick={onNavigateToTemplates}
        className="group relative flex flex-col p-6 bg-white border border-zinc-200/70 shadow-xs cursor-pointer hover:border-zinc-300 transition-all duration-200"
      >
        <div className="absolute top-6 right-6">
          <ArrowRight className="h-5 w-5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200/80">
            <Layers className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-zinc-900">Loan Templates</h3>
          <p className="text-sm text-zinc-500 mt-1">
            Create and manage loan agreement templates
          </p>
        </div>
        <div className="mt-6 border-t border-zinc-100 pt-4">
          <p className="text-xs font-semibold text-zinc-400">Templates</p>
          <p className="text-2xl font-extrabold text-zinc-900 mt-0.5">
            {stats.totalTemplates}
          </p>
        </div>
      </Card>
    </div>
  );
}
