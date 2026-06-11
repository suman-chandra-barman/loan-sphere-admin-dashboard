export interface AdminUser {
  id: string | number;
  profile_image: string | null;
  full_name: string;
  email: string;
  whatsapp_number?: string | null;
  initials: string;
  role: string;
  plan?: {
    name: string;
    price: number | string;
    billing_cycle: string;
  } | null;
  family?: {
    name: string;
  } | null;
  members_count?: number;
  membership?: {
    relation_display: string;
  } | null;
  join_date_display: string;
  is_email_verified: boolean;
  status: string;
  status_display: string;
}

export interface StaticUser {
  id: string;
  fullName: string;
  email: string;
  initials: string;
  role: "customer" | "joint customer" | "admin";
  status: "active" | "inactive";
  profileImage: string | null;
  phone: string;
  employer: string;
  address: string;
  employment: string;
  income: string;
  memberSince: string;
  creditScore: number | string;
  applications: number;
  joined: string;
}

