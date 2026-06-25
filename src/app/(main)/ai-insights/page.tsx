"use client";

import ErrorState from "@/components/ui/ErrorState";
import { RefreshCw } from "lucide-react";
import AiInsightsStats from "@/components/ai-insights/AiInsightsStats";
import RiskScoreDistribution from "@/components/ai-insights/RiskScoreDistribution";
import MonthlyAiTrends from "@/components/ai-insights/MonthlyAiTrends";
import LoanTypeDistribution from "@/components/ai-insights/LoanTypeDistribution";
import EmploymentTypeDistribution from "@/components/ai-insights/EmploymentTypeDistribution";
import RecentAiReports from "@/components/ai-insights/RecentAiReports";
import { useGetAiInsightsQuery } from "@/redux/api/aiInsightsApi";
import {
  AiInsightsStatsSkeleton,
  RiskScoreDistributionSkeleton,
  MonthlyAiTrendsSkeleton,
  LoanTypeDistributionSkeleton,
  EmploymentTypeDistributionSkeleton,
  RecentAiReportsSkeleton,
} from "@/components/skeleton/AiInsightsSkeletons";

export default function AiInsightsPage() {
  const { data: response, isLoading, isFetching, error, refetch } = useGetAiInsightsQuery();
  const insights = response?.data;

  if (error) {
    return (
      <div className="space-y-6">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            AI Insights
          </h1>
        </div>

        <ErrorState
          title="Error Loading AI Insights"
          description="We encountered a problem fetching the AI analytical metrics. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            AI Insights
          </h1>
          <p className="text-sm font-medium text-zinc-500">
            Machine learning risk analysis and loan portfolio intelligence
          </p>
        </div>

        {isFetching && !isLoading && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-xs">
            <RefreshCw className="h-4 w-4 animate-spin text-zinc-400" />
          </div>
        )}
      </div>

      {/* KPI Stats section */}
      {isLoading ? (
        <AiInsightsStatsSkeleton />
      ) : (
        <AiInsightsStats data={insights?.summaryCards} />
      )}

      {/* Grid: Risk Score Distribution & Monthly AI Assessment Trends */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {isLoading ? (
          <RiskScoreDistributionSkeleton />
        ) : (
          <RiskScoreDistribution
            title={insights?.riskScoreDistribution.title}
            items={insights?.riskScoreDistribution.items}
          />
        )}

        {isLoading ? (
          <MonthlyAiTrendsSkeleton />
        ) : (
          <MonthlyAiTrends
            title={insights?.monthlyAssessmentTrends.title}
            items={insights?.monthlyAssessmentTrends.items}
          />
        )}
      </div>

      {/* Grid: Loan Type Distribution & Employment Type Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {isLoading ? (
          <LoanTypeDistributionSkeleton />
        ) : (
          <LoanTypeDistribution
            title={insights?.loanTypeDistribution.title}
            items={insights?.loanTypeDistribution.items}
          />
        )}

        {isLoading ? (
          <EmploymentTypeDistributionSkeleton />
        ) : (
          <EmploymentTypeDistribution
            title={insights?.employmentTypeDistribution.title}
            items={insights?.employmentTypeDistribution.items}
          />
        )}
      </div>

      {/* Recent AI Reports Table */}
      <div className="pt-2">
        {isLoading ? (
          <RecentAiReportsSkeleton />
        ) : (
          <RecentAiReports
            title={insights?.recentAIReports.title}
            items={insights?.recentAIReports.items}
          />
        )}
      </div>
    </div>
  );
}
