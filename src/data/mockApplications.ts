import { 
  FileText, 
  Brain, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import { LoanApplication } from "@/types/application";

export const INITIAL_APPLICATIONS: LoanApplication[] = [
  {
    code: "LS-2024-001",
    customer: "Sarah Johnson",
    type: "Home Loan",
    amount: "$350,000",
    amountNumber: 350000,
    status: "Approved",
    dti: 32,
    date: "Jan 20, 2024",
    details: {
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      creditScore: 745,
      monthlyIncome: 8500,
      monthlyDebt: 2720,
      employment: "Senior Software Engineer at Google (5 years)",
      term: "30 Years Fixed",
      rate: "6.5%",
      purpose: "Primary Residence Purchase",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: true,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Jan 10, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "AI Underwriting Cleared", date: "Jan 12, 2024", icon: Brain, color: "text-purple-600 bg-purple-50" },
        { label: "Income & Tax Audited", date: "Jan 18, 2024", icon: ShieldCheck, color: "text-blue-600 bg-blue-50" },
        { label: "Final Approval Issued", date: "Jan 20, 2024", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" }
      ]
    }
  },
  {
    code: "LS-2024-002",
    customer: "Sarah Johnson",
    type: "Personal Loan",
    amount: "$15,000",
    amountNumber: 15000,
    status: "Under Review",
    dti: 38,
    date: "Mar 10, 2024",
    details: {
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      creditScore: 690,
      monthlyIncome: 8500,
      monthlyDebt: 3230,
      employment: "Senior Software Engineer at Google (5 years)",
      term: "3 Years Fixed",
      rate: "10.2%",
      purpose: "Home Improvement",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: false,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Mar 08, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "Referred to Manual Underwriting", date: "Mar 10, 2024", icon: Clock, color: "text-amber-600 bg-amber-50" }
      ]
    }
  },
  {
    code: "LS-2024-003",
    customer: "Marcus Davis",
    type: "Vehicle Loan",
    amount: "$42,000",
    amountNumber: 42000,
    status: "AI Assessment",
    dti: 42,
    date: "Mar 15, 2024",
    details: {
      email: "marcus.davis@example.com",
      phone: "+1 (555) 987-6543",
      creditScore: 710,
      monthlyIncome: 5800,
      monthlyDebt: 2436,
      employment: "Sales Director at Salesforce (2 years)",
      term: "5 Years Fixed",
      rate: "7.8%",
      purpose: "Electric Vehicle Purchase",
      checklist: {
        idVerified: true,
        incomeVerified: false,
        taxReturnsVerified: false,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Mar 14, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "AI Running Calculations", date: "Mar 15, 2024", icon: Brain, color: "text-purple-600 bg-purple-50" }
      ]
    }
  },
  {
    code: "LS-2024-004",
    customer: "Emily Chen",
    type: "Business Loan",
    amount: "$120,000",
    amountNumber: 120000,
    status: "Submitted",
    dti: 29,
    date: "Mar 18, 2024",
    details: {
      email: "emily.chen@example.com",
      phone: "+1 (555) 456-7890",
      creditScore: 780,
      monthlyIncome: 15400,
      monthlyDebt: 4466,
      employment: "CEO at Solaria Tech (4 years)",
      term: "7 Years Fixed",
      rate: "8.9%",
      purpose: "Inventory & Hardware Expansion",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: true,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Mar 17, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "Submitted for Initial Check", date: "Mar 18, 2024", icon: Clock, color: "text-blue-600 bg-blue-50" }
      ]
    }
  },
  {
    code: "LS-2024-005",
    customer: "Robert Williams",
    type: "Education Loan",
    amount: "$45,000",
    amountNumber: 45000,
    status: "Pending Documents",
    dti: 35,
    date: "Mar 20, 2024",
    details: {
      email: "robert.w@example.com",
      phone: "+1 (555) 789-0123",
      creditScore: 660,
      monthlyIncome: 4200,
      monthlyDebt: 1470,
      employment: "Graduate Student & Research Assistant",
      term: "10 Years Fixed",
      rate: "5.5%",
      purpose: "Tuition Fees & Rent Support",
      checklist: {
        idVerified: true,
        incomeVerified: false,
        taxReturnsVerified: false,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Mar 15, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "Additional Bank Statements Requested", date: "Mar 20, 2024", icon: AlertCircle, color: "text-orange-600 bg-orange-50" }
      ]
    }
  },
  {
    code: "LS-2024-006",
    customer: "Lisa Park",
    type: "Debt Consolidation",
    amount: "$28,000",
    amountNumber: 28000,
    status: "Rejected",
    dti: 58,
    date: "Feb 5, 2024",
    details: {
      email: "lisa.park@example.com",
      phone: "+1 (555) 234-5678",
      creditScore: 590,
      monthlyIncome: 5100,
      monthlyDebt: 2958,
      employment: "Nurse Practitioner at General Hospital (1 year)",
      term: "5 Years Fixed",
      rate: "12.5%",
      purpose: "Credit Card Debt Consolidation",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: false,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Feb 01, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "AI Screening Failed", date: "Feb 03, 2024", icon: Brain, color: "text-rose-600 bg-rose-50" },
        { label: "Rejected due to DTI and Credit Score limit", date: "Feb 05, 2024", icon: XCircle, color: "text-rose-600 bg-rose-50" }
      ]
    }
  },
  {
    code: "LS-2024-007",
    customer: "David Martinez",
    type: "Personal Loan",
    amount: "$8,500",
    amountNumber: 8500,
    status: "Draft",
    dti: 30,
    date: "Mar 25, 2024",
    details: {
      email: "david.m@example.com",
      phone: "+1 (555) 890-1234",
      creditScore: 640,
      monthlyIncome: 3900,
      monthlyDebt: 1170,
      employment: "Freelance Designer (3 years)",
      term: "2 Years Fixed",
      rate: "11.0%",
      purpose: "Medical Expenses",
      checklist: {
        idVerified: false,
        incomeVerified: false,
        taxReturnsVerified: false,
        creditChecked: false
      },
      timeline: [
        { label: "Draft Saved by Applicant", date: "Mar 25, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" }
      ]
    }
  },
  {
    code: "LS-2024-008",
    customer: "Marcus Davis",
    type: "Home Loan",
    amount: "$480,000",
    amountNumber: 480000,
    status: "Cond. Approved",
    dti: 48,
    date: "Feb 1, 2024",
    details: {
      email: "marcus.davis@example.com",
      phone: "+1 (555) 987-6543",
      creditScore: 725,
      monthlyIncome: 12000,
      monthlyDebt: 5760,
      employment: "Sales Director at Salesforce (2 years)",
      term: "30 Years Fixed",
      rate: "6.8%",
      purpose: "Investment Property Purchase",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: true,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Jan 22, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "AI Screening Passed", date: "Jan 24, 2024", icon: Brain, color: "text-purple-600 bg-purple-50" },
        { label: "Underwriting Conditional Approval Issued", date: "Feb 01, 2024", icon: CheckCircle2, color: "text-teal-600 bg-teal-50" }
      ]
    }
  },
  {
    code: "LS-2024-009",
    customer: "James Wilson",
    type: "Business Loan",
    amount: "$250,000",
    amountNumber: 250000,
    status: "Approved",
    dti: 33,
    date: "Apr 1, 2024",
    details: {
      email: "james.wilson@example.com",
      phone: "+1 (555) 345-6789",
      creditScore: 760,
      monthlyIncome: 18500,
      monthlyDebt: 6105,
      employment: "Co-owner at Craft Brewing Co. (6 years)",
      term: "10 Years Fixed",
      rate: "7.95%",
      purpose: "Brewery Equipment Upgrade",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: true,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Mar 20, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "AI Valuation Completed", date: "Mar 22, 2024", icon: Brain, color: "text-purple-600 bg-purple-50" },
        { label: "Final Committee Approval", date: "Apr 01, 2024", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" }
      ]
    }
  },
  {
    code: "LS-2024-010",
    customer: "Patricia Taylor",
    type: "Education Loan",
    amount: "$32,000",
    amountNumber: 32000,
    status: "Under Review",
    dti: 41,
    date: "Apr 5, 2024",
    details: {
      email: "patricia.t@example.com",
      phone: "+1 (555) 456-1122",
      creditScore: 675,
      monthlyIncome: 4800,
      monthlyDebt: 1968,
      employment: "School Teacher at District Prep (3 years)",
      term: "7 Years Fixed",
      rate: "6.2%",
      purpose: "Master's Degree Funding",
      checklist: {
        idVerified: true,
        incomeVerified: true,
        taxReturnsVerified: false,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Apr 02, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "Assigned for Manual Review", date: "Apr 05, 2024", icon: Clock, color: "text-amber-600 bg-amber-50" }
      ]
    }
  },
  {
    code: "LS-2024-011",
    customer: "Michael Brown",
    type: "Home Loan",
    amount: "$190,000",
    amountNumber: 190000,
    status: "Submitted",
    dti: 25,
    date: "Apr 12, 2024",
    details: {
      email: "michael.b@example.com",
      phone: "+1 (555) 789-4455",
      creditScore: 740,
      monthlyIncome: 6900,
      monthlyDebt: 1725,
      employment: "Operations Manager at Amazon (2 years)",
      term: "15 Years Fixed",
      rate: "5.99%",
      purpose: "Condo Refinance",
      checklist: {
        idVerified: true,
        incomeVerified: false,
        taxReturnsVerified: false,
        creditChecked: true
      },
      timeline: [
        { label: "Application Created", date: "Apr 10, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" },
        { label: "Submitted for Processing", date: "Apr 12, 2024", icon: Clock, color: "text-blue-600 bg-blue-50" }
      ]
    }
  },
  {
    code: "LS-2024-012",
    customer: "Linda Davis",
    type: "Vehicle Loan",
    amount: "$18,000",
    amountNumber: 18000,
    status: "Draft",
    dti: 19,
    date: "Apr 15, 2024",
    details: {
      email: "linda.d@example.com",
      phone: "+1 (555) 999-8888",
      creditScore: 630,
      monthlyIncome: 3500,
      monthlyDebt: 665,
      employment: "Retail Store Assistant (1 year)",
      term: "4 Years Fixed",
      rate: "8.5%",
      purpose: "Used Car Purchase",
      checklist: {
        idVerified: true,
        incomeVerified: false,
        taxReturnsVerified: false,
        creditChecked: false
      },
      timeline: [
        { label: "Draft Saved by Applicant", date: "Apr 15, 2024", icon: FileText, color: "text-zinc-500 bg-zinc-100" }
      ]
    }
  }
];
