"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCards from "@/components/loan-management/StatsCards";
import NavSectionCards from "@/components/loan-management/NavSectionCards";
import LoanTypeCard from "@/components/loan-management/LoanTypeCard";
import LoanManagementSkeleton from "@/components/loan-management/skeletons/LoanManagementSkeleton";
import LoanTypeModal from "@/components/loan-management/LoanTypeModal";
import {
  useGetLoanManagementSummaryQuery,
  useGetTemplatesDropdownQuery,
} from "@/redux/api/loanManagementApi";
import { LoanType } from "@/types/loan";

export default function LoanManagementPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetLoanManagementSummaryQuery();
  const { data: dropdownData } = useGetTemplatesDropdownQuery();
  const templates = dropdownData?.data ?? [];

  // ── Modal State ───────────────────────────────────────────────────────────
  const [modalTarget, setModalTarget] = useState<LoanType | null | false>(false);
  const isModalOpen = modalTarget !== false;

  const openEdit = (loanType: LoanType) => setModalTarget(loanType);
  const closeModal = () => setModalTarget(false);

  const handleNavigate = (key: string) => {
    if (key === "loanTypes") {
      router.push("/loan-management/loan-types");
    } else if (key === "loanTemplates") {
      router.push("/loan-management/loan-templates");
    }
  };

  // ── Loading State ─────────────────────────────────────────────────────────
  if (isLoading) {
    return <LoanManagementSkeleton />;
  }

  // ── Error State ───────────────────────────────────────────────────────────
  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <div className="text-center">
          <p className="text-zinc-900 font-bold text-lg">Failed to load data</p>
          <p className="text-zinc-400 text-sm mt-1">
            Could not fetch loan management summary. Please try again.
          </p>
        </div>
        <Button
          onClick={() => router.refresh()}
          className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold h-10 rounded-xl px-6"
        >
          Retry
        </Button>
      </div>
    );
  }

  const summary = data.data;

  return (
    <div className="space-y-8 pb-12 relative min-h-screen">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Loan Management
          </h1>
          <p className="text-sm font-semibold text-zinc-400">
            Manage loan types, templates, and configurations
          </p>
        </div>

        <Button
          onClick={() => router.push("/loan-management/loan-templates")}
          className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer self-start sm:self-auto shadow-sm transition-colors"
        >
          Manage Templates
        </Button>
      </div>

      {/* ── Stats Cards ───────────────────────────────────────────────────── */}
      <StatsCards summaryCards={summary.summaryCards} />

      {/* ── Navigation Cards ──────────────────────────────────────────────── */}
      <NavSectionCards
        managementCards={summary.managementCards}
        onNavigate={handleNavigate}
      />

      {/* ── Loan Types Section ────────────────────────────────────────────── */}
      <div className="pt-2">
        <div className="flex items-center justify-between border-b border-zinc-200/60 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-zinc-900">Loan Products</h2>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Available loan products and their agreement associations
            </p>
          </div>
          <Button
            onClick={() => router.push("/loan-management/loan-types")}
            className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer shadow-xs transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Loan Type
          </Button>
        </div>

        {/* Loan Types Grid */}
        {summary.loanTypes.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-2xl bg-white shadow-xs">
            No loan types configured.{" "}
            <button
              onClick={() => router.push("/loan-management/loan-types")}
              className="text-[#A31D1D] font-semibold underline"
            >
              Add your first loan type
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {summary.loanTypes.map((loanType) => (
              <LoanTypeCard
                key={loanType.id}
                loanType={loanType}
                onEdit={() => openEdit(loanType)}
                onDelete={() => router.push(`/loan-management/loan-types`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Create / Edit Loan Type Modal ─────────────────────────────────── */}
      {isModalOpen && (
        <LoanTypeModal
          loanType={modalTarget ?? undefined}
          templates={templates}
          onClose={closeModal}
        />
      )}
    </div>
  );
}