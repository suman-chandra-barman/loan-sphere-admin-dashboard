export interface KycListParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface KycSummary {
  total: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export interface KycCustomer {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export interface KycApplication {
  id: string;
  applicationNumber: string;
  loanType: string;
  status: string;
}

export interface KycFileItem {
  url: string;
  path: string;
  isUploaded: boolean;
}

export interface KycFiles {
  idFront?: KycFileItem;
  idBack?: KycFileItem;
  selfie?: KycFileItem;
}

export interface KycStep {
  step: number;
  key: string;
  title: string;
  status: string;
}

export interface KycDocumentType {
  key: string;
  label: string;
}

export interface KycGuideline {
  key: string;
  label: string;
}

export interface KycScreen {
  title: string;
  subtitle: string;
  underReviewTitle: string;
  underReviewMessage: string;
}

export interface KycActions {
  canUploadId: boolean;
  canUploadSelfie: boolean;
  canSubmit: boolean;
  statusApi: string;
  uploadIdApi: string;
  uploadSelfieApi: string;
  submitApi: string;
}

export interface KycAdminActions {
  canApprove: boolean;
  canReject: boolean;
  statusApi: string;
}

export interface KycProviderResponseCheck {
  provider: string;
  check_id: string;
  status: string;
  result: string | null;
  mode: string;
  note: string;
}

export interface KycProviderResponse {
  applicant: {
    provider: string;
    applicant_id: string;
    mode: string;
  };
  document: {
    provider: string;
    document_id: string;
    mode: string;
  };
  selfie: {
    provider: string;
    selfie_id: string;
    mode: string;
  };
  check: KycProviderResponseCheck;
}

export interface KycProviderData {
  applicantId: string;
  documentId: string;
  selfieId: string;
  checkId: string;
  response: KycProviderResponse;
}

export interface KycVerificationItem {
  id: string;
  status: string;
  statusLabel: string;
  statusBadgeType: string;
  provider: string;
  documentType: string;
  documentTypeLabel: string;
  application: KycApplication;
  customer: KycCustomer;
  files: KycFiles;
  providerData: KycProviderData;
  steps: KycStep[];
  documentTypes: KycDocumentType[];
  guidelines: KycGuideline[];
  screen: KycScreen;
  actions: KycActions;
  submittedAt: string;
  reviewedAt: string | null;
  adminNote: string | null;
  rejectionReason: string | null;
  reviewedBy?: string | null;
  adminActions?: KycAdminActions;
}

export interface KycListResponse {
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
    };
  };
  data: {
    summary: KycSummary;
    kycVerifications: KycVerificationItem[];
  };
  requestId: string;
}

export interface KycDetailsResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: KycVerificationItem;
  requestId: string;
}

export interface KycUpdateParams {
  id: string;
  status: "approved" | "rejected";
  note: string;
}
