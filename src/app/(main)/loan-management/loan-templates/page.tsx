"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoanTemplatesSkeleton from "@/components/loan-management/skeletons/LoanTemplatesSkeleton";
import TemplatesTable from "@/components/loan-management/TemplatesTable";
import CreateTemplateModal from "@/components/loan-management/CreateTemplateModal";
import Pagination from "@/components/loan-management/Pagination";
import { useGetLoanTemplatesQuery } from "@/redux/api/loanManagementApi";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

const SORT_OPTIONS = [
  { label: "Newest First", sort_by: "date", order: "desc" },
  { label: "Oldest First", sort_by: "date", order: "asc" },
  { label: "Name (A–Z)", sort_by: "name", order: "asc" },
  { label: "Name (Z–A)", sort_by: "name", order: "desc" },
];

const LIMIT = 10;

export default function LoanTemplatesPage() {
  const router = useRouter();

  // ── Filters ───────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  const debounceSearch = useCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    debounceSearch(val);
  };

  const currentSort = SORT_OPTIONS[sortIndex];

  // ── Query ─────────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching } = useGetLoanTemplatesQuery({
    page,
    limit: LIMIT,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
    sort_by: currentSort.sort_by,
    order: currentSort.order,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const templates = data?.data ?? [];
  const meta = data?.meta;
  const totalPage = meta?.totalPage ?? 1;
  const total = meta?.total ?? 0;
  const summary = meta?.summary;

  if (isLoading) return <LoanTemplatesSkeleton />;

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => router.push("/loan-management")}
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
              Loan Templates
            </h1>
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

      {/* ── Summary Pills ──────────────────────────────────────────────────── */}
      {summary && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600">
            Total: {summary.total_templates}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700">
            Published: {summary.published_templates}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700">
            Draft: {summary.draft_templates}
          </span>
        </div>
      )}

      {/* ── Filters ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search templates..."
            className="pl-9 h-10 rounded-xl border-zinc-200 bg-white"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setDebouncedSearch(""); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#A31D1D] cursor-pointer"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={sortIndex}
          onChange={(e) => { setSortIndex(Number(e.target.value)); setPage(1); }}
          className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#A31D1D] cursor-pointer"
        >
          {SORT_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* ── Templates Table ─────────────────────────────────────────────────── */}
      <TemplatesTable templates={templates} isFetching={isFetching} />

      {/* ── Pagination ──────────────────────────────────────────────────────── */}
      <Pagination
        page={page}
        totalPage={totalPage}
        total={total}
        limit={LIMIT}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* ── Create Template Modal ─────────────────────────────────────────── */}
      {isModalOpen && (
        <CreateTemplateModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
