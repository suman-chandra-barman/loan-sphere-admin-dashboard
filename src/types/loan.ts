// ─── Shared / Embedded ───────────────────────────────────────────────────────

export interface AssignedTemplate {
  id: string;
  name: string;
  status: "published" | "draft";
}

// ─── Loan Types ───────────────────────────────────────────────────────────────

export interface LoanType {
  id: string;
  name: string;
  iconImageUrl: string;
  description: string;
  isActive: boolean;
  assignedTemplate: AssignedTemplate | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoanTypesFilters {
  search?: string;
  is_active?: string;
  template_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface LoanTypesMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  filters: LoanTypesFilters;
  sorting: { sort_by: string; order: string };
  summary: {
    total_loan_types: number;
    active_loan_types: number;
    inactive_loan_types: number;
  };
}

export interface LoanTypesListResponse {
  success: boolean;
  message: string;
  meta: LoanTypesMeta;
  data: LoanType[];
}

export interface LoanTypeToggleResponse {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: { id: string; name: string; isActive: boolean };
}

// ─── Loan Templates ───────────────────────────────────────────────────────────

export interface LoanTemplateSection {
  id: string;
  templateId: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoanTemplate {
  id: string;
  name: string;
  description: string;
  status: "published" | "draft";
  sectionsCount: number;
  lastUpdated: string;
}

export interface LoanTemplateDetail extends LoanTemplate {
  sections: LoanTemplateSection[];
  createdAt: string;
  updatedAt: string;
}

export interface LoanTemplatesMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  filters: {
    search: string;
    status: string;
    date_from: string;
    date_to: string;
  };
  sorting: { sort_by: string; order: string };
  summary: {
    total_templates: number;
    published_templates: number;
    draft_templates: number;
  };
}

export interface LoanTemplatesListResponse {
  success: boolean;
  message: string;
  meta: LoanTemplatesMeta;
  data: LoanTemplate[];
}

export interface LoanTemplateDetailResponse {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: LoanTemplateDetail;
}

export interface LoanTemplateCreateResponse {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: LoanTemplate;
}

export interface LoanTemplateSectionResponse {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: LoanTemplateSection;
}

// ─── Templates Dropdown ───────────────────────────────────────────────────────

export interface TemplateDropdownItem {
  id: string;
  name: string;
}

export interface TemplateDropdownResponse {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: TemplateDropdownItem[];
}

// ─── Summary / Dashboard ──────────────────────────────────────────────────────

export interface SummaryCard {
  key: string;
  title: string;
  value: number;
  subtitle: string;
}

export interface ManagementCard {
  key: string;
  title: string;
  description: string;
  metricTitle: string;
  metricValue: number;
  api: string;
}

export interface LoanManagementSummaryData {
  summaryCards: SummaryCard[];
  managementCards: ManagementCard[];
  loanTypes: LoanType[];
  totalLoanTypes: number;
  activeLoanTypes: number;
  inactiveLoanTypes: number;
  totalTemplates: number;
  publishedTemplates: number;
  draftTemplates: number;
  averageSectionsPerTemplate: number;
}

export interface LoanManagementSummaryResponse {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: LoanManagementSummaryData;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface LoanTemplatesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort_by?: string;
  order?: string;
}

export interface LoanTypesParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  order?: string;
  is_active?: string;
}
