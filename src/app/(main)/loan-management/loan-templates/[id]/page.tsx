"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import TemplateDetailSkeleton from "@/components/loan-management/skeletons/TemplateDetailSkeleton";
import TemplateSectionsList from "@/components/loan-management/TemplateSectionsList";
import AddSectionModal from "@/components/loan-management/AddSectionModal";
import {
  useGetLoanTemplateDetailQuery,
  usePublishLoanTemplateMutation,
} from "@/redux/api/loanManagementApi";

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

export default function TemplateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.id as string;

  // ── Query ─────────────────────────────────────────────────────────────────
  const { data, isLoading, isError, refetch } = useGetLoanTemplateDetailQuery(templateId);
  const [publishTemplate, { isLoading: isPublishing }] = usePublishLoanTemplateMutation();

  const handlePublish = async () => {
    const toastId = toast.loading("Publishing template...");
    try {
      const res = await publishTemplate(templateId).unwrap();
      toast.update(toastId, {
        render: res.message || "Template published successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to publish template.";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  };

  // ── Add Section Modal State ───────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) return <TemplateDetailSkeleton />;

  // ── Error ─────────────────────────────────────────────────────────────────
  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <AlertCircle className="h-10 w-10 text-rose-400" />
        <div className="text-center">
          <p className="text-zinc-900 font-bold text-lg">Template not found</p>
          <p className="text-zinc-400 text-sm mt-1">
            The template may have been deleted or the link is invalid.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/loan-management/loan-templates")}
            className="border-zinc-200 h-10 rounded-xl"
          >
            Back to Templates
          </Button>
          <Button
            onClick={() => refetch()}
            className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-10 rounded-xl px-6"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const template = data.data;
  const isPublished = template.status === "published";
  const sections = template.sections ?? [];

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => router.push("/loan-management/loan-templates")}
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 line-clamp-1">
              {template.name}
            </h1>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Edit template structure and sections
            </p>
          </div>
        </div>

        {/* Status Badge + Publish Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Badge
            variant={isPublished ? "default" : "secondary"}
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1 border-0 capitalize"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isPublished ? "bg-emerald-600" : "bg-amber-500"
              }`}
            />
            {template.status}
          </Badge>

          {!isPublished && (
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Check className="h-4 w-4" />
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          )}
        </div>
      </div>

      {/* ── Template Meta Card ──────────────────────────────────────────────── */}
      <Card className="bg-white border border-zinc-200/70 shadow-xs rounded-2xl p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Description
            </p>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {template.description || "—"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Sections
              </p>
              <p className="text-2xl font-extrabold text-zinc-900">{sections.length}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Last Updated
              </p>
              <p className="text-xs font-semibold text-zinc-600">
                {formatDate(template.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Template Sections List Component ─────────────────────────────────── */}
      <TemplateSectionsList
        sections={sections}
        onAddSection={() => setIsModalOpen(true)}
      />

      {/* ── Add Section Modal Component ──────────────────────────────────────── */}
      {isModalOpen && (
        <AddSectionModal
          templateId={templateId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
