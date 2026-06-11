import React, { useState } from "react";
import { ArrowLeft, Check, Plus, GripVertical, Pencil, Trash2, X } from "lucide-react";
import { LoanTemplate, LoanTemplateSection } from "@/types/loan";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface TemplateDetailEditProps {
  template: LoanTemplate;
  onBack: () => void;
  onPublish: (id: string) => void;
  onAddSection: (templateId: string, title: string, content: string) => void;
  onUpdateSection: (templateId: string, sectionId: string, title: string, content: string) => void;
  onDeleteSection: (templateId: string, sectionId: string) => void;
  onReorderSections: (templateId: string, sections: LoanTemplateSection[]) => void;
}

export default function TemplateDetailEdit({
  template,
  onBack,
  onPublish,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onReorderSections
}: TemplateDetailEditProps) {
  // Modal states for section add/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<LoanTemplateSection | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionContent, setSectionContent] = useState("");
  const [error, setError] = useState<{ title?: string; content?: string }>({});

  // Drag and drop states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setEditingSection(null);
    setSectionTitle("");
    setSectionContent("");
    setError({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sec: LoanTemplateSection) => {
    setEditingSection(sec);
    setSectionTitle(sec.title);
    setSectionContent(sec.content);
    setError({});
    setIsModalOpen(true);
  };

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof error = {};
    if (!sectionTitle.trim()) newErrors.title = "Section title is required";
    if (!sectionContent.trim()) newErrors.content = "Section content is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    if (editingSection) {
      onUpdateSection(template.id, editingSection.id, sectionTitle.trim(), sectionContent.trim());
    } else {
      onAddSection(template.id, sectionTitle.trim(), sectionContent.trim());
    }

    setIsModalOpen(false);
    setSectionTitle("");
    setSectionContent("");
    setEditingSection(null);
    setError({});
  };

  // HTML5 Drag-and-Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set a ghost image or simple styling helper
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5";
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const sectionsCopy = [...template.sections];
    const draggedItem = sectionsCopy[draggedIndex];

    // Remove item and insert at new index
    sectionsCopy.splice(draggedIndex, 1);
    sectionsCopy.splice(index, 0, draggedItem);

    onReorderSections(template.id, sectionsCopy);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const isPublished = template.status === "Published";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
              {template.name}
            </h2>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Edit template structure and sections
            </p>
          </div>
        </div>

        {/* Badges & Actions */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Badge
            variant={isPublished ? "default" : "warning"}
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border-0"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-emerald-600" : "bg-amber-600"}`} />
            {template.status}
          </Badge>

          {!isPublished && (
            <Button
              onClick={() => onPublish(template.id)}
              className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer"
            >
              <Check className="h-4 w-4" />
              Publish
            </Button>
          )}
        </div>
      </div>

      {/* Editor Box */}
      <Card className="bg-white border border-zinc-200/70 shadow-sm rounded-2xl p-6">
        <div className="flex items-center justify-between pb-5 border-b border-zinc-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-zinc-900">Template Sections</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Drag sections to reorder structure</p>
          </div>
          <Button
            onClick={handleOpenAdd}
            className="bg-transparent border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-bold flex items-center gap-1.5 h-9 rounded-xl px-3 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#A31D1D]" />
            Add Section
          </Button>
        </div>

        {/* Reorderable List */}
        <div className="space-y-4">
          {template.sections.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
              No sections created yet. Click &quot;Add Section&quot; to build this template.
            </div>
          ) : (
            template.sections.map((sec, index) => {
              const isOver = dragOverIndex === index;
              return (
                <div
                  key={sec.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`flex gap-4 p-4 rounded-xl border bg-white transition-all duration-200 ${
                    isOver ? "border-dashed border-[#A31D1D] scale-[1.01] bg-[#A31D1D]/2" : "border-zinc-200/70 hover:border-zinc-300"
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="flex items-center justify-center cursor-grab active:cursor-grabbing text-zinc-300 hover:text-zinc-500 shrink-0">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {/* Section Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{sec.title}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 self-start sm:self-auto shrink-0 bg-zinc-50 border border-zinc-100 rounded px-1.5 py-0.5">
                        Section {index + 1}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-500 mt-1.5 leading-relaxed">
                      {sec.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 shrink-0 self-start sm:self-center pl-2">
                    <button
                      onClick={() => handleOpenEdit(sec)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
                      title="Edit Section"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteSection(template.id, sec.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Section"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-white border border-zinc-200 shadow-xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-900 text-base">
                {editingSection ? "Edit Section Details" : "Add Template Section"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSectionTitle("");
                  setSectionContent("");
                  setEditingSection(null);
                  setError({});
                }}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSaveSection} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">
                  Section Title <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={sectionTitle}
                  onChange={(e) => {
                    setSectionTitle(e.target.value);
                    if (error.title) setError({ ...error, title: undefined });
                  }}
                  placeholder="e.g., Loan Amount"
                  className={error.title ? "border-rose-500" : ""}
                  autoFocus
                />
                {error.title && (
                  <p className="text-xs font-semibold text-rose-500 mt-1">{error.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">
                  Section Content / Clause Description <span className="text-rose-500">*</span>
                </label>
                <Textarea
                  value={sectionContent}
                  onChange={(e) => {
                    setSectionContent(e.target.value);
                    if (error.content) setError({ ...error, content: undefined });
                  }}
                  placeholder="Describe the clauses, legal descriptions, or options associated with this template section..."
                  className={`resize-none min-h-[140px] ${error.content ? "border-rose-500" : ""}`}
                />
                {error.content && (
                  <p className="text-xs font-semibold text-rose-500 mt-1">{error.content}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSectionTitle("");
                    setSectionContent("");
                    setEditingSection(null);
                    setError({});
                  }}
                  className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-9 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-9 px-4 rounded-lg cursor-pointer"
                >
                  Save
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
