"use client";

import { ClipboardCheck } from "lucide-react";

import LoanOverviewStats from "@/components/dashboard/LoanOverviewStats";
import MonthlyDisbursementsChart from "@/components/dashboard/MonthlyDisbursementsChart";
import LoanTypeDistributionChart from "@/components/dashboard/LoanTypeDistributionChart";
import StatusOverviewCard from "@/components/dashboard/StatusOverviewCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import ApprovalRateCard from "@/components/dashboard/ApprovalRateCard";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="text-sm font-medium text-zinc-500">
            Welcome back, <span className="text-zinc-800 font-semibold">Admin</span>. Here's what's happening today.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0">
          <ClipboardCheck className="h-4.5 w-4.5" />
          <span>Review Applications</span>
        </button>
      </div>

      {/* KPI Stats section */}
      <LoanOverviewStats />

      {/* Charts Grid: Monthly Disbursements & Loan Type Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <MonthlyDisbursementsChart />
        </div>
        <div className="lg:col-span-4">
          <LoanTypeDistributionChart />
        </div>
      </div>

      {/* Info Cards Grid: Status Overview, Quick Actions & Approval Rate */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatusOverviewCard />
        <QuickActionsCard />
        <ApprovalRateCard />
      </div>

      {/* Recent Applications Table */}
      <div className="pt-2">
        <RecentApplicationsTable />
      </div>
    </div>
  );
}
