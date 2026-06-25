export interface SummaryCardItem {
  key: string;
  title: string;
  value: number | string;
  valueDisplay: string;
  change: string;
  changeType: "positive" | "negative" | string;
}

export interface MonthlyDisbursementItem {
  key: string;
  month: string;
  label: string;
  amount: string;
  amountDisplay: string;
  fullAmountDisplay: string;
}

export interface MonthlyDisbursements {
  title: string;
  subtitle: string;
  source: string;
  items: MonthlyDisbursementItem[];
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

export interface LoanTypeDistribution {
  title: string;
  subtitle: string;
  items: LoanTypeDistributionItem[];
}

export interface StatusOverviewItem {
  key: string;
  status: string;
  label: string;
  count: number;
  percent: number;
  percentDisplay: string;
  badgeType: string;
}

export interface StatusOverview {
  title: string;
  items: StatusOverviewItem[];
}

export interface QuickActionItem {
  key: string;
  title: string;
  description: string;
  url: string;
}

export interface ApprovalRate {
  title: string;
  rate: number;
  rateDisplay: string;
  subtitle: string;
  previousMonthRate: number;
  approved: number;
  approvedDisplay: string;
  rejected: number;
  rejectedDisplay: string;
  pending: number;
  pendingDisplay: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
}

export interface LoanType {
  id: string;
  name: string;
  shortName: string;
}

export interface RecentApplicationItem {
  id: string;
  applicationNumber: string;
  customer: Customer;
  customerName: string;
  loanType: LoanType;
  type: string;
  amount: string;
  amountDisplay: string;
  status: string;
  statusLabel: string;
  statusBadgeType: string;
  dtiRatio: number;
  dtiRatioDisplay: string;
  date: string;
  dateDisplay: string;
  detailApi: string;
}

export interface RecentApplications {
  title: string;
  viewAllApi: string;
  items: RecentApplicationItem[];
}

export interface DashboardData {
  summaryCards: SummaryCardItem[];
  monthlyDisbursements: MonthlyDisbursements;
  loanTypeDistribution: LoanTypeDistribution;
  statusOverview: StatusOverview;
  quickActions: QuickActionItem[];
  approvalRate: ApprovalRate;
  recentApplications: RecentApplications;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  meta: {
    generatedAt: string;
    filters: Record<string, any>;
    summary: {
      totalApplications: number;
      pendingReview: number;
      approvedThisMonth: number;
      totalPortfolio: string;
    };
  };
  data: DashboardData;
  requestId: string;
}
