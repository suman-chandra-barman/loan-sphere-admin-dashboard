import React from "react";

export interface TimelineEvent {
  label: string;
  date: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface Checklist {
  idVerified: boolean;
  incomeVerified: boolean;
  taxReturnsVerified: boolean;
  creditChecked: boolean;
}

export interface LoanApplicationDetails {
  email: string;
  phone: string;
  creditScore: number;
  monthlyIncome: number;
  monthlyDebt: number;
  employment: string;
  term: string;
  rate: string;
  purpose: string;
  checklist: Checklist;
  timeline: TimelineEvent[];
}

export interface LoanApplication {
  code: string;
  customer: string;
  type: string;
  amount: string;
  amountNumber: number;
  status: string;
  dti: number;
  date: string;
  details: LoanApplicationDetails;
}
