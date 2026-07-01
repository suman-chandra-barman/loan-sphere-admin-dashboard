"use client";

import React, { useState, useCallback, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoanTypeCard from "@/components/loan-management/LoanTypeCard";
import LoanTypesSkeleton from "@/components/loan-management/skeletons/LoanTypesSkeleton";
import LoanTypeModal from "@/components/loan-management/LoanTypeModal";
import Pagination from "@/components/loan-management/Pagination";
import {
  useGetLoanTypesQuery,
  useGetTemplatesDropdownQuery,
} from "@/redux/api/loanManagementApi";
import { LoanType } from "@/types/loan";

const SORT_OPTIONS = [
  { label: "Name (A–Z)", sort_by: "name", order: "asc" },
  { label: "Name (Z–A)", sort_by: "name", order: "desc" },
  { label: "Newest First", sort_by: "date", order: "desc" },
  { label: "Oldest First", sort_by: "date", order: "asc" },
];

const LIMIT = 9;

function LoanTypesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const editSearch = searchParams.get("search");

  // ── Filters ───────────────────────────────────────────────────────────────
  const [search, setSearch] = useState(editSearch || "");
  const [debouncedSearch, setDebouncedSearch] = useState(editSearch || "");
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

  // ── Queries ───────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching } = useGetLoanTypesQuery({
    page,
    limit: LIMIT,
    search: debouncedSearch || undefined,
    sort_by: currentSort.sort_by,
    order: currentSort.order,
  });

  const { data: dropdownData } = useGetTemplatesDropdownQuery();
  const templates = dropdownData?.data ?? [];

  // ── Modal State ───────────────────────────────────────────────────────────
  // null  = modal closed
  // false = create mode (no pre-fill)
  // LoanType object = edit mode
  const [modalTarget, setModalTarget] = useState<LoanType | null | false>(false);
  const isModalOpen = modalTarget !== false;

  const openCreate = () => setModalTarget(null);
  const openEdit = (loanType: LoanType) => setModalTarget(loanType);
  const closeModal = () => setModalTarget(false);

  const loanTypes = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;
  const totalPage = meta?.totalPage ?? 1;
  const total = meta?.total ?? 0;

  useEffect(() => {
    if (editId && loanTypes.length > 0) {
      const found = loanTypes.find((lt) => lt.id === editId);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setModalTarget(found);
        // Clear the edit/search query params from the URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete("edit");
        params.delete("search");
        const newQs = params.toString();
        router.replace(`/loan-management/loan-types${newQs ? `?${newQs}` : ""}`);
      }
    }
  }, [editId, loanTypes, router, searchParams]);
  const summary = meta?.summary;

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) return <LoanTypesSkeleton />;

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
              Loan Types
            </h1>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Manage all available loan types and their configurations
            </p>
          </div>
        </div>
        <Button
          onClick={openCreate}
          className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Loan Type
        </Button>
      </div>

      {/* ── Summary Pills ──────────────────────────────────────────────────── */}
      {summary && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600">
            Total: {summary.total_loan_types}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700">
            Active: {summary.active_loan_types}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-rose-600">
            Inactive: {summary.inactive_loan_types}
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
            placeholder="Search loan types..."
            className="pl-9 h-10 rounded-xl border-zinc-200 bg-white"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
                setPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <select
          value={sortIndex}
          onChange={(e) => {
            setSortIndex(Number(e.target.value));
            setPage(1);
          }}
          className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#A31D1D] cursor-pointer"
        >
          {SORT_OPTIONS.map((opt, i) => (
            <option key={i} value={i}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Loan Types Grid ─────────────────────────────────────────────────── */}
      <div
        className={`transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}
      >
        {loanTypes.length === 0 ? (
          <div className="py-20 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-2xl bg-white shadow-xs">
            <p className="font-semibold">No loan types found.</p>
            <p className="text-sm mt-1">Try adjusting filters or add a new loan type.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loanTypes.map((loanType) => (
              <LoanTypeCard
                key={loanType.id}
                loanType={loanType}
                onEdit={openEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Pagination ──────────────────────────────────────────────────────── */}
      <Pagination
        page={page}
        totalPage={totalPage}
        total={total}
        limit={LIMIT}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* ── Create / Edit Loan Type Modal ─────────────────────────────────── */}
      {isModalOpen && (
        <LoanTypeModal
          key={modalTarget ? modalTarget.id : "create"}
          loanType={modalTarget ?? undefined}
          templates={templates}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default function LoanTypesPage() {
  return (
    <Suspense fallback={<LoanTypesSkeleton />}>
      <LoanTypesContent />
    </Suspense>
  );
}
