"use client";

import AiInsightsStats from "@/components/ai-insights/AiInsightsStats";
import RiskScoreDistribution from "@/components/ai-insights/RiskScoreDistribution";
import MonthlyAiTrends from "@/components/ai-insights/MonthlyAiTrends";
import LoanTypeDistribution from "@/components/ai-insights/LoanTypeDistribution";
import EmploymentTypeDistribution from "@/components/ai-insights/EmploymentTypeDistribution";
import RecentAiReports from "@/components/ai-insights/RecentAiReports";

export default function AiInsightsPage() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          AI Insights
        </h1>
        <p className="text-sm font-medium text-zinc-500">
          Machine learning risk analysis and loan portfolio intelligence
        </p>
      </div>

      {/* KPI Stats section */}
      <AiInsightsStats />

      {/* Grid: Risk Score Distribution & Monthly AI Assessment Trends */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RiskScoreDistribution />
        <MonthlyAiTrends />
      </div>

      {/* Grid: Loan Type Distribution & Employment Type Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LoanTypeDistribution />
        <EmploymentTypeDistribution />
      </div>

      {/* Recent AI Reports Table */}
      <div className="pt-2">
        <RecentAiReports />
      </div>
    </div>
  );
}
