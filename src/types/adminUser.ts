export interface ListUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface UserSummaryCard {
  key: string;
  title: string;
  value: number;
  subtitle: string;
}

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  initials: string;
  role: string;
  roleLabel: string;
  status: string;
  statusLabel: string;
  applicationsCount: number;
  creditScore: number | null;
  creditScoreDisplay: string;
  annualIncome: string | null;
  annualIncomeDisplay: string;
  employment: string | null;
  employmentDisplay: string;
  joined: string;
  memberSince: string;
  createdAt: string;
  actions: {
    canView: boolean;
    canSuspend: boolean;
    canActivate: boolean;
    detailApi: string;
    activityApi: string;
  };
}

export interface AdminUsersResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    filters: {
      search: string;
      role: string;
      status: string;
    };
    sorting: {
      sort_by: string;
      order: string;
    };
    summary: {
      totalUsers: number;
      customers: number;
      administrators: number;
      activeUsers: number;
      suspendedUsers: number;
    };
  };
  data: {
    summaryCards: UserSummaryCard[];
    users: UserListItem[];
  };
  requestId: string;
}

export interface UserDetailData {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  initials: string;
  role: string;
  roleLabel: string;
  status: string;
  statusLabel: string;
  applicationsCount: number;
  creditScore: number | null;
  creditScoreDisplay: string;
  annualIncome: string | null;
  annualIncomeDisplay: string;
  employment: string | null;
  employmentDisplay: string;
  joined: string;
  memberSince: string;
  createdAt: string;
  actions: {
    canView: boolean;
    canSuspend: boolean;
    canActivate: boolean;
    detailApi: string;
    activityApi: string;
  };
  drawer: {
    title: string;
    subtitle: string;
  };
  stats: {
    applications: number;
    creditScore: number | null;
    creditScoreDisplay: string;
    annualIncome: string | null;
    annualIncomeDisplay: string;
    memberSince: string;
  };
  profile: {
    phone: string | null;
    employer: string;
    address: string;
    employment: string | null;
    employmentDisplay: string;
  };
  latestApplication?: {
    id: string;
    applicationNumber: string;
    loanType: string;
    amount: string;
    amountDisplay: string;
    status: string;
    statusLabel: string;
  } | null;
}

export interface AdminUserDetailResponse {
  success: boolean;
  message: string;
  meta: any;
  data: UserDetailData;
  requestId: string;
}
