import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoanTemplateSection } from "@/types/loan";
import EditSectionModal from "./EditSectionModal";
import DeleteSectionModal from "./DeleteSectionModal";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

interface TemplateSectionsListProps {
  sections: LoanTemplateSection[];
  onAddSection: () => void;
}

export default function TemplateSectionsList({
  sections,
  onAddSection,
}: TemplateSectionsListProps) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);
  const [editTarget, setEditTarget] = useState<LoanTemplateSection | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LoanTemplateSection | null>(null);

  return (
    <Card className="bg-white border border-zinc-200/70 shadow-sm rounded-2xl p-6">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-5 border-b border-zinc-100 mb-6">
        <div>
          <h2 className="text-base font-bold text-zinc-900">Template Sections</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {sections.length} section{sections.length !== 1 ? "s" : ""} in this template
          </p>
        </div>
        <Button
          onClick={onAddSection}
          className="bg-transparent border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-bold flex items-center gap-1.5 h-9 rounded-xl px-3 cursor-pointer"
        >
          <Plus className="h-4 w-4 text-[#A31D1D]" />
          Add Section
        </Button>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sorted.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
            <Plus className="h-8 w-8 text-zinc-200 mx-auto mb-2" />
            <p className="font-semibold">No sections yet</p>
            <p className="text-sm mt-1">Click &ldquo;Add Section&rdquo; to build this template.</p>
          </div>
        ) : (
          sorted.map((sec, index) => (
            <div
              key={sec.id}
              className="flex gap-4 p-4 rounded-xl border border-zinc-200/70 bg-white hover:border-zinc-300 transition-all duration-150"
            >
              {/* Order Badge */}
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-100 text-zinc-500 text-xs font-bold shrink-0 self-start mt-0.5">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <h3 className="text-sm font-bold text-zinc-900 line-clamp-1">
                    {sec.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 self-start sm:self-auto shrink-0 bg-zinc-50 border border-zinc-100 rounded px-1.5 py-0.5">
                    Section {sec.order}
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-500 mt-1.5 leading-relaxed">
                  {sec.description}
                </p>
                <p className="text-[10px] text-zinc-300 mt-2">
                  Created {formatDate(sec.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-2 shrink-0 self-start pl-2 mt-0.5">
                <button
                  onClick={() => setEditTarget(sec)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
                  title="Edit Section"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(sec)}
                  className="p-1.5 text-rose-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Section"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editTarget && (
        <EditSectionModal
          key={editTarget.id}
          section={editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteSectionModal
          section={deleteTarget}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </Card>
  );
}
