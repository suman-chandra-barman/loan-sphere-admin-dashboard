"use client";

import React from "react";
import { ClipboardCheck, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import LoanOverviewStats from "@/components/dashboard/LoanOverviewStats";
import MonthlyDisbursementsChart from "@/components/dashboard/MonthlyDisbursementsChart";
import LoanTypeDistributionChart from "@/components/dashboard/LoanTypeDistributionChart";
import StatusOverviewCard from "@/components/dashboard/StatusOverviewCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import ApprovalRateCard from "@/components/dashboard/ApprovalRateCard";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";

export default function DashboardPage() {
  const { data, isLoading, error, refetch, isFetching } = useGetDashboardDataQuery();

  const dashboardData = data?.data;

  if (error) {
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
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-200/60 shadow-sm rounded-2xl min-h-[350px] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900">Error Loading Dashboard</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              We encountered a problem fetching the dashboard analytics. Please verify your connection or session and try again.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer mt-2"
          >
            <span>Retry Fetching</span>
          </button>
        </div>
      </div>
    );
  }

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

        <div className="flex items-center gap-2">
          {isFetching && !isLoading && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-xs">
              <RefreshCw className="h-4 w-4 animate-spin text-zinc-400" />
            </div>
          )}
          <Link href="/applications" passHref legacyBehavior>
            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              <ClipboardCheck className="h-4.5 w-4.5" />
              <span>Review Applications</span>
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Stats section */}
      <LoanOverviewStats data={dashboardData?.summaryCards} isLoading={isLoading} />

      {/* Charts Grid: Monthly Disbursements & Loan Type Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <MonthlyDisbursementsChart data={dashboardData?.monthlyDisbursements} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-4">
          <LoanTypeDistributionChart data={dashboardData?.loanTypeDistribution} isLoading={isLoading} />
        </div>
      </div>

      {/* Info Cards Grid: Status Overview, Quick Actions & Approval Rate */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatusOverviewCard data={dashboardData?.statusOverview} isLoading={isLoading} />
        <QuickActionsCard data={dashboardData?.quickActions} isLoading={isLoading} />
        <ApprovalRateCard data={dashboardData?.approvalRate} isLoading={isLoading} />
      </div>

      {/* Recent Applications Table */}
      <div className="pt-2">
        <RecentApplicationsTable data={dashboardData?.recentApplications} isLoading={isLoading} />
      </div>
    </div>
  );
}
