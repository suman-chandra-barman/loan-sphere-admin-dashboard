import React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Layers,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LoanTemplate } from "@/types/loan";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

interface TemplatesTableProps {
  templates: LoanTemplate[];
  isFetching: boolean;
}

export default function TemplatesTable({ templates, isFetching }: TemplatesTableProps) {
  const router = useRouter();

  return (
    <Card
      className={`bg-white border border-zinc-200/70 shadow-sm rounded-2xl overflow-hidden transition-opacity duration-200 ${
        isFetching ? "opacity-60" : "opacity-100"
      }`}
    >
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
                <td colSpan={5} className="py-16 text-center text-zinc-400">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-8 w-8 text-zinc-200" />
                    <p className="font-semibold">No templates found</p>
                    <p className="text-xs">Try adjusting filters or create a new template.</p>
                  </div>
                </td>
              </tr>
            ) : (
              templates.map((tpl) => {
                const isPublished = tpl.status === "published";
                const goToDetail = () =>
                  router.push(`/loan-management/loan-templates/${tpl.id}`);

                return (
                  <tr
                    key={tpl.id}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    {/* Name */}
                    <td className="py-4 px-6">
                      <div
                        onClick={goToDetail}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="p-2 rounded-lg bg-rose-50 text-[#A31D1D] shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-zinc-900 font-bold group-hover:text-[#A31D1D] transition-colors line-clamp-1">
                            {tpl.name}
                          </span>
                          {tpl.description && (
                            <p className="text-xs text-zinc-400 font-normal line-clamp-1 mt-0.5">
                              {tpl.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Sections */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-zinc-500 font-medium">
                        <Layers className="h-4 w-4 text-zinc-400" />
                        <span>{tpl.sectionsCount} sections</span>
                      </div>
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-zinc-500 font-medium">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span>{formatDate(tpl.lastUpdated)}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <Badge
                        variant={isPublished ? "default" : "secondary"}
                        className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border-0 w-fit capitalize"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isPublished ? "bg-emerald-600" : "bg-amber-500"
                          }`}
                        />
                        {tpl.status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <button
                          onClick={goToDetail}
                          className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                          title="Edit Template"
                        >
                          <Pencil className="h-4 w-4" />
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
  );
}
