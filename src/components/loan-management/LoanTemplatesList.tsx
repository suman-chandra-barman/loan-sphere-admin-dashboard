import React, { useState } from "react";
import { ArrowLeft, Plus, FileText, Layers, Calendar, Pencil, Trash2, X } from "lucide-react";
import { LoanTemplate } from "@/types/loan";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface LoanTemplatesListProps {
  templates: LoanTemplate[];
  onBack: () => void;
  onEditTemplate: (id: string) => void;
  onCreateTemplate: (name: string) => string;
  onDeleteTemplate: (id: string) => void;
}

export default function LoanTemplatesList({
  templates,
  onBack,
  onEditTemplate,
  onCreateTemplate,
  onDeleteTemplate
}: LoanTemplatesListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [error, setError] = useState("");

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim()) {
      setError("Template name is required");
      return;
    }
    const createdId = onCreateTemplate(newTemplateName.trim());
    setNewTemplateName("");
    setIsModalOpen(false);
    setError("");
    // Automatically transition to edit template view for the newly created template
    onEditTemplate(createdId);
  };

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
              Loan Templates
            </h2>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Manage document templates for loan agreements
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Table Card */}
      <Card className="bg-white border border-zinc-200/70 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <th className="py-4 px-6">Template Name</th>
                <th className="py-4 px-6">Sections</th>
                <th className="py-4 px-6">Last Updated</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 text-sm font-semibold text-zinc-800">
              {templates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-400">
                    No templates found. Click &quot;Create Template&quot; to add one.
                  </td>
                </tr>
              ) : (
                templates.map((tpl) => {
                  const isPublished = tpl.status === "Published";
                  return (
                    <tr
                      key={tpl.id}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-4.5 px-6">
                        <div
                          onClick={() => onEditTemplate(tpl.id)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="p-2 rounded-lg bg-rose-50 text-[#A31D1D] shrink-0">
                            <FileText className="h-4.5 w-4.5" />
                          </div>
                          <span className="text-zinc-900 font-bold group-hover:text-[#A31D1D] transition-colors">
                            {tpl.name}
                          </span>
                        </div>
                      </td>

                      {/* Sections Count */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-2 text-zinc-500 font-medium">
                          <Layers className="h-4 w-4 text-zinc-400" />
                          <span>{tpl.sections?.length || 0} sections</span>
                        </div>
                      </td>

                      {/* Last Updated */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-2 text-zinc-500 font-medium">
                          <Calendar className="h-4 w-4 text-zinc-400" />
                          <span>{tpl.lastUpdated}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4.5 px-6">
                        <Badge
                          variant={isPublished ? "default" : "warning"}
                          className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border-0 w-fit"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isPublished ? "bg-emerald-600" : "bg-amber-600"
                            }`}
                          />
                          {tpl.status}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-3.5">
                          <button
                            onClick={() => onEditTemplate(tpl.id)}
                            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                            title="Edit Sections"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDeleteTemplate(tpl.id)}
                            className="p-1 rounded-lg text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete Template"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200">
          <Card className="w-full max-w-md bg-white border border-zinc-200 shadow-xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-900 text-base">Create Loan Template</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNewTemplateName("");
                  setError("");
                }}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">
                  Template Name <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={newTemplateName}
                  onChange={(e) => {
                    setNewTemplateName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g., Commercial Loan Template"
                  autoFocus
                  className={error ? "border-rose-500" : ""}
                />
                {error && (
                  <p className="text-xs font-semibold text-rose-500 mt-1">{error}</p>
                )}
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewTemplateName("");
                    setError("");
                  }}
                  className="border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 h-9 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-9 px-4 rounded-lg cursor-pointer"
                >
                  Create
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
