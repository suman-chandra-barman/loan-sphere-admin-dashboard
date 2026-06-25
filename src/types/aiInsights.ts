export interface AiInsightSummaryCard {
  key: string;
  title: string;
  value: number;
  valueDisplay: string;
  count?: number;
  subtitle: string;
}

export interface RiskScoreDistributionItem {
  key: string;
  label: string;
  count: number;
  value: number;
  percent: number;
  percentDisplay: string;
  badgeType: string;
}

export interface MonthlyAssessmentTrendItem {
  key: string;
  month: string;
  label: string;
  approve: number;
  review: number;
  reject: number;
  total: number;
}

export interface LoanTypeDistributionItem {
  id: string;
  name: string;
  shortName: string;
  count: number;
  value: number;
  percent: number;
  percentDisplay: string;
  amount: string;
  amountDisplay: string;
}

export interface EmploymentTypeDistributionItem {
  key: string;
  label: string;
  count: number;
  value: number;
  percent: number;
  percentDisplay: string;
}

export interface RecentAiReportItem {
  id: string;
  application: string;
  applicationNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    initials: string;
  };
  customerName: string;
  loanType: {
    id: string;
    name: string;
    shortName: string;
  };
  riskScore: number;
  riskScoreDisplay: string;
  recommendation: string;
  recommendationLabel: string;
  recommendationBadgeType: string;
  summary: string;
  dtiRatio: number;
  dtiRatioDisplay: string;
  amount: string;
  amountDisplay: string;
  date: string;
  dateDisplay: string;
  detailApi: string;
}

export interface AiInsightsDataPayload {
  summaryCards: AiInsightSummaryCard[];
  riskScoreDistribution: {
    title: string;
    items: RiskScoreDistributionItem[];
  };
  monthlyAssessmentTrends: {
    title: string;
    subtitle: string;
    items: MonthlyAssessmentTrendItem[];
  };
  loanTypeDistribution: {
    title: string;
    items: LoanTypeDistributionItem[];
  };
  employmentTypeDistribution: {
    title: string;
    items: EmploymentTypeDistributionItem[];
  };
  recentAIReports: {
    title: string;
    items: RecentAiReportItem[];
  };
}

export interface AiInsightsResponse {
  success: boolean;
  message: string;
  meta: {
    generatedAt: string;
    summary: {
      totalApplications: number;
      avgRiskScore: number;
      approveCount: number;
      reviewCount: number;
      rejectCount: number;
    };
    note: string;
  };
  data: AiInsightsDataPayload;
  requestId: string;
}
