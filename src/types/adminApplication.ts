export interface ListApplicationsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  loan_type?: string;
  date_from?: string;
  date_to?: string;
  amount_min?: string;
  amount_max?: string;
}

export interface SummaryCounts {
  total_applications: number;
  draft: number;
  submitted: number;
  under_review: number;
  pending_documents: number;
  approved: number;
  rejected: number;
}

export interface ApplicationCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
}

export interface ApplicationLoanTypeSummary {
  id: string;
  name: string;
}

export interface ListApplicationItem {
  id: string;
  applicationNumber: string;
  customer: ApplicationCustomer;
  loanType: ApplicationLoanTypeSummary;
  amount: string;
  amountDisplay: string;
  status: string;
  statusLabel: string;
  statusBadgeType: string;
  dtiRatio: number;
  dtiRatioDisplay: string;
  date: string;
  appliedAt: string;
  updatedAt: string;
  actions: {
    canView: boolean;
    detailApi: string;
  };
}

export interface ApplicationsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    filters: {
      search: string;
      status: string;
      loan_type: string;
      date_from: string;
      date_to: string;
      amount_min: string;
      amount_max: string;
    };
    sorting: {
      sort_by: string;
      order: string;
    };
    summary: SummaryCounts;
  };
  data: ListApplicationItem[];
  requestId: string;
}

export interface ApplicationHeader {
  id: string;
  applicationNumber: string;
  title: string;
  customerName: string;
  status: string;
  statusLabel: string;
  statusBadgeType: string;
  appliedAt: string;
  loanAmount: string;
  loanAmountDisplay: string;
  monthlyPayment: string;
  monthlyPaymentDisplay: string;
  interestRate: string;
  term: string;
  progressPercent: number;
}

export interface CustomerProfile {
  customer: ApplicationCustomer;
  phone: string;
  creditScore: number;
  annualIncome: string;
  annualIncomeDisplay: string;
  employer: string | null;
  employment: string;
}

export interface FinancialSummary {
  requestedAmount: string;
  requestedAmountDisplay: string;
  annualIncome: string;
  annualIncomeDisplay: string;
  monthlyPayment: string;
  monthlyPaymentDisplay: string;
  purpose: string | null;
  dtiRatio: number;
  dtiRatioDisplay: string;
}

export interface AiRiskFactor {
  label: string;
  description: string;
  type: "positive" | "negative" | "warning" | "danger" | string;
}

export interface AiRiskAssessment {
  riskScore: number;
  recommendation: string;
  summary: string;
  factors: AiRiskFactor[];
}

export interface AdminNoteItem {
  id: string;
  note: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminNotes {
  text: string;
  items: AdminNoteItem[];
}

export interface ApplicationDetailOverview {
  customerProfile: CustomerProfile;
  financialSummary: FinancialSummary;
  aiRiskAssessment: AiRiskAssessment;
  adminNotes: AdminNotes;
}

export interface RawApplicationLoanType {
  id: string;
  name: string;
  iconImageUrl: string | null;
  description: string | null;
}

export interface RawApplication {
  id: string;
  applicationNumber: string;
  loanType: RawApplicationLoanType;
  loanAmount: string;
  loanTerm: string;
  notes: string | null;
  propertyValue: string | null;
  mortgageBalance: string | null;
  mortgagePayment: string | null;
  mortgageLender: string | null;
  termRemaining: string | null;
  interestRate: string;
  employmentType: string;
  employmentDisplay: string;
  annualIncome: string;
  hasCcj: boolean;
  hasDefaults: boolean;
  hasActiveDmp: boolean;
  hasActiveIva: boolean;
  status: string;
  currentStep: number;
  totalSteps: number;
  progressPercent: number;
  estimatedRate: string;
  estimatedMonthlyPayment: string;
  dtiRatio: number;
  dtiRatioDisplay: string;
  documentsSummary: {
    requiredCount: number;
    uploadedCount: number;
    remainingCount: number;
    progressPercent: number;
    uploadedText: string;
    statusText: string;
  };
  reviewSummary: {
    loanType: string;
    loanAmount: string;
    loanTerm: string;
    estimatedRate: string;
    estimatedMonthlyPayment: string;
    employment: string;
    annualIncome: string;
    dtiRatio: number;
    dtiRatioDisplay: string;
    documents: {
      requiredCount: number;
      uploadedCount: number;
      remainingCount: number;
      progressPercent: number;
      uploadedText: string;
      statusText: string;
    };
  };
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  actions: {
    canEdit: boolean;
    canSubmit: boolean;
    canUploadDocuments: boolean;
    canViewMyLoan: boolean;
  };
}

export interface ApplicationDetailData {
  id: string;
  applicationNumber: string;
  header: ApplicationHeader;
  tabs: {
    overview: boolean;
    documents: boolean;
    timeline: boolean;
    notes: boolean;
  };
  overview: ApplicationDetailOverview;
  actions: {
    canApprove: boolean;
    canReject: boolean;
    canRequestDocuments: boolean;
    canAddNote: boolean;
  };
  rawApplication: RawApplication;
}

export interface ApplicationDetailResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: ApplicationDetailData;
  requestId: string;
}
