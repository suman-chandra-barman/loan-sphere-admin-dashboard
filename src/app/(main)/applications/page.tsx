"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText, 
  Brain, 
  Clock, 
  Sparkles, 
  User, 
  DollarSign, 
  Check,
  TrendingUp,
  Percent,
  Calendar,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Full 12 mock application database matching mockups and layout requirements
interface LoanApplication {
  code: string;
  customer: string;
  type: string;
  amount: string;
  amountNumber: number;
  status: string;
  dti: number;
  date: string;
  details: {
    email: string;
    phone: string;
    creditScore: number;
    monthlyIncome: number;
    monthlyDebt: number;
    employment: string;
    term: string;
    rate: string;
    purpose: string;
    checklist: {
      idVerified: boolean;
      incomeVerified: boolean;
      taxReturnsVerified: boolean;
      creditChecked: boolean;
    };
    timeline: {
      label: string;
      date: string;
      icon: any;
      color: string;
    }[];
  };
}

const INITIAL_APPLICATIONS: LoanApplication[] = [
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

function getStatusStyles(status: string) {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
    case "Under Review":
      return "bg-amber-50 text-amber-700 border-amber-200/50";
    case "AI Assessment":
      return "bg-purple-50 text-purple-700 border-purple-200/50";
    case "Submitted":
      return "bg-blue-50 text-blue-700 border-blue-200/50";
    case "Pending Documents":
      return "bg-orange-50/60 text-orange-700 border-orange-200/50";
    case "Rejected":
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    case "Draft":
      return "bg-slate-100 text-slate-600 border-slate-200/50";
    case "Cond. Approved":
      return "bg-teal-50 text-teal-700 border-teal-200/50";
    default:
      return "bg-zinc-50 text-zinc-600 border-zinc-200";
  }
}

function getDtiStyles(dti: number) {
  if (dti <= 35) return "text-emerald-600 font-semibold";
  if (dti <= 45) return "text-amber-600 font-semibold";
  return "text-rose-600 font-semibold";
}

const ITEMS_PER_PAGE = 8;

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<LoanApplication[]>(INITIAL_APPLICATIONS);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // Drawer Detail State
  const [selectedAppCode, setSelectedAppCode] = useState<string | null>(null);

  // List of unique statuses & loan types for dropdown filter
  const uniqueStatuses = ["All", "Approved", "Under Review", "AI Assessment", "Submitted", "Pending Documents", "Rejected", "Draft", "Cond. Approved"];
  const uniqueTypes = ["All", "Home Loan", "Personal Loan", "Vehicle Loan", "Business Loan", "Education Loan", "Debt Consolidation"];

  // Reset pagination when filter or search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  // Filtered Applications logic
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      const matchesType = typeFilter === "All" || app.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [applications, searchQuery, statusFilter, typeFilter]);

  // Paginated rows logic
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE) || 1;
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApplications, currentPage]);

  const selectedApp = useMemo(() => {
    return applications.find((app) => app.code === selectedAppCode) || null;
  }, [applications, selectedAppCode]);

  // Change Application Status logic
  const handleUpdateStatus = (code: string, newStatus: string) => {
    setApplications(prev => prev.map(app => {
      if (app.code === code) {
        const timestamp = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        
        let timelineIcon = Clock;
        let timelineColor = "text-amber-600 bg-amber-50";
        if (newStatus === "Approved") { timelineIcon = CheckCircle2; timelineColor = "text-emerald-600 bg-emerald-50"; }
        if (newStatus === "Rejected") { timelineIcon = XCircle; timelineColor = "text-rose-600 bg-rose-50"; }
        if (newStatus === "AI Assessment") { timelineIcon = Brain; timelineColor = "text-purple-600 bg-purple-50"; }
        if (newStatus === "Pending Documents") { timelineIcon = AlertCircle; timelineColor = "text-orange-600 bg-orange-50"; }
        
        const updatedTimeline = [
          ...app.details.timeline,
          { label: `Status updated to ${newStatus}`, date: timestamp, icon: timelineIcon, color: timelineColor }
        ];

        return {
          ...app,
          status: newStatus,
          details: {
            ...app.details,
            timeline: updatedTimeline
          }
        };
      }
      return app;
    }));
  };

  // Toggle Document Checklist logic
  const handleToggleChecklist = (code: string, checklistKey: keyof LoanApplication["details"]["checklist"]) => {
    setApplications(prev => prev.map(app => {
      if (app.code === code) {
        const updatedChecklist = {
          ...app.details.checklist,
          [checklistKey]: !app.details.checklist[checklistKey]
        };

        // If checking/unchecking, log it in the timeline
        const timestamp = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const label = `${checklistKey.replace(/([A-Z])/g, " $1")} checklist updated`;

        return {
          ...app,
          details: {
            ...app.details,
            checklist: updatedChecklist,
            timeline: [
              ...app.details.timeline,
              { label, date: timestamp, icon: ShieldCheck, color: "text-blue-600 bg-blue-50" }
            ]
          }
        };
      }
      return app;
    }));
  };

  // Customer Initials Getter
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6 pb-12 relative min-h-screen">
      {/* Header section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Applications
        </h1>
        <p className="text-sm font-semibold text-zinc-400">
          {filteredApplications.length} {filteredApplications.length === 1 ? "application" : "applications"} found
        </p>
      </div>

      {/* Search and Filters Panel */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-200/60 shadow-xs flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name or application number..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-11 w-full rounded-xl border border-zinc-200 pl-11 pr-4 text-sm text-zinc-900 shadow-3xs placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent transition-all"
            />
          </div>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`flex items-center gap-2 h-11 px-4.5 rounded-xl border text-sm font-bold shadow-3xs transition-all hover:bg-zinc-50 cursor-pointer ${
              isFiltersOpen || statusFilter !== "All" || typeFilter !== "All"
                ? "bg-zinc-50 border-indigo-900 text-indigo-900"
                : "bg-white border-zinc-200 text-zinc-700"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {(statusFilter !== "All" || typeFilter !== "All") && (
              <span className="flex h-2 w-2 rounded-full bg-indigo-900" />
            )}
          </button>
        </div>

        {/* Dropdown Filters Panel */}
        {isFiltersOpen && (
          <div className="pt-2 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="w-full h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent"
              >
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Loan Type</label>
              <select
                value={typeFilter}
                onChange={(e) => handleTypeFilter(e.target.value)}
                className="w-full h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-900 focus-visible:border-transparent"
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end pb-0.5">
              {(statusFilter !== "All" || typeFilter !== "All" || searchQuery !== "") && (
                <button
                  onClick={handleResetFilters}
                  className="h-10 px-4 rounded-xl border border-dashed border-zinc-300 text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 transition-colors cursor-pointer w-full flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Clear Active Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Applications Table Card */}
      <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-b border-zinc-100">
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Application #
                  </TableHead>
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Customer
                  </TableHead>
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Loan Type
                  </TableHead>
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    DTI
                  </TableHead>
                  <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Date
                  </TableHead>
                  <TableHead className="px-6 py-4.5 w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedApplications.length > 0 ? (
                  paginatedApplications.map((app) => (
                    <TableRow
                      key={app.code}
                      onClick={() => setSelectedAppCode(app.code)}
                      className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200 cursor-pointer"
                    >
                      <TableCell className="px-6 py-4.5 font-bold text-[#e05638]">
                        {app.code}
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-zinc-200/70 border border-zinc-300/30">
                            <AvatarFallback className="text-xs font-bold text-zinc-700 bg-zinc-200">
                              {getInitials(app.customer)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-zinc-800 text-sm">
                            {app.customer}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4.5 text-zinc-500 font-semibold text-sm">
                        {app.type}
                      </TableCell>
                      <TableCell className="px-6 py-4.5 font-extrabold text-zinc-800 text-sm">
                        {app.amount}
                      </TableCell>
                      <TableCell className="px-6 py-4.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </TableCell>
                      <TableCell className={`px-6 py-4.5 text-sm ${getDtiStyles(app.dti)}`}>
                        {app.dti}%
                      </TableCell>
                      <TableCell className="px-6 py-4.5 text-zinc-400 font-semibold text-sm">
                        {app.date}
                      </TableCell>
                      <TableCell className="px-6 py-4.5 text-right">
                        <button className="text-zinc-300 transition-colors duration-300 group-hover:text-zinc-600">
                          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-zinc-400 font-semibold text-sm">
                      No loan applications matched your search filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Footer */}
      {filteredApplications.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1">
          <div className="text-sm font-semibold text-zinc-400">
            Showing {Math.min(filteredApplications.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}-
            {Math.min(filteredApplications.length, currentPage * ITEMS_PER_PAGE)} of {filteredApplications.length}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-500">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-zinc-900 text-white shadow-xs font-bold"
                    : "hover:bg-zinc-100 hover:text-zinc-800 text-zinc-500 font-semibold"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Custom Pagination Numbers to EXACTLY match mockup design layout for high fidelity representation */}
            {totalPages === 2 && (
              <>
                <span className="px-1 text-zinc-300 select-none">...</span>
                <button
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 font-semibold cursor-not-allowed"
                >
                  67
                </button>
                <button
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-300 font-semibold cursor-not-allowed"
                >
                  68
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Slide-out Drawer Panel overlay & Container */}
      {selectedApp && (
        <>
          {/* Backdrop Overlay */}
          <div 
            onClick={() => setSelectedAppCode(null)}
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-2xs transition-opacity duration-300 animate-in fade-in"
          />

          {/* Side Drawer Content */}
          <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl bg-[#faf7f2] shadow-2xl border-l border-zinc-200 flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 bg-white">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">{selectedApp.code}</span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(selectedApp.status)}`}>
                    {selectedApp.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-400 mt-1">Submitted on {selectedApp.date}</p>
              </div>
              <button 
                onClick={() => setSelectedAppCode(null)}
                className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Applicant Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-zinc-200 border border-zinc-300/30">
                    <AvatarFallback className="text-sm font-black text-zinc-800 bg-zinc-200">
                      {getInitials(selectedApp.customer)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-extrabold text-zinc-900 text-base">{selectedApp.customer}</h3>
                    <p className="text-xs font-semibold text-zinc-400 mt-0.5">{selectedApp.details.email}</p>
                  </div>
                </div>

                <hr className="border-zinc-100" />

                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone Number</span>
                    <p className="font-semibold text-zinc-800 mt-0.5">{selectedApp.details.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Employment</span>
                    <p className="font-semibold text-zinc-800 mt-0.5 leading-relaxed">{selectedApp.details.employment}</p>
                  </div>
                </div>
              </div>

              {/* Financial Profile & Loan Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Financial metrics */}
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                  <h4 className="font-black text-xs text-zinc-400 uppercase tracking-wider">Financial Profile</h4>
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Monthly Income</span>
                      <span className="font-extrabold text-zinc-800">${selectedApp.details.monthlyIncome.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Monthly Debt</span>
                      <span className="font-extrabold text-zinc-800">${selectedApp.details.monthlyDebt.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Debt to Income (DTI)</span>
                      <span className={`font-black ${getDtiStyles(selectedApp.dti)}`}>{selectedApp.dti}%</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Credit Score</span>
                      <span className={`font-extrabold text-sm px-2 py-0.5 rounded-md ${
                        selectedApp.details.creditScore >= 720 
                          ? "bg-emerald-50 text-emerald-700" 
                          : selectedApp.details.creditScore >= 620 
                            ? "bg-amber-50 text-amber-700" 
                            : "bg-rose-50 text-rose-700"
                      }`}>{selectedApp.details.creditScore}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Specifications */}
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                  <h4 className="font-black text-xs text-zinc-400 uppercase tracking-wider">Loan Details</h4>
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Loan Product</span>
                      <span className="font-extrabold text-zinc-800">{selectedApp.type}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Requested Amount</span>
                      <span className="font-black text-zinc-900">{selectedApp.amount}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Loan Term</span>
                      <span className="font-extrabold text-zinc-800">{selectedApp.details.term}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Interest Rate</span>
                      <span className="font-extrabold text-zinc-800">{selectedApp.details.rate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purpose & Description */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-2.5">
                <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">Loan Purpose</span>
                <p className="text-sm font-semibold text-zinc-800 leading-relaxed">
                  {selectedApp.details.purpose} — funds will be disbursed immediately to the verified applicant upon final underwriting signatures.
                </p>
              </div>

              {/* Checklist */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                <h4 className="font-black text-xs text-zinc-400 uppercase tracking-wider">Document Checklist</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedApp.details.checklist.idVerified}
                      onChange={() => handleToggleChecklist(selectedApp.code, "idVerified")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">ID Verified</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedApp.details.checklist.incomeVerified}
                      onChange={() => handleToggleChecklist(selectedApp.code, "incomeVerified")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">Income Verified</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedApp.details.checklist.taxReturnsVerified}
                      onChange={() => handleToggleChecklist(selectedApp.code, "taxReturnsVerified")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">Tax Returns Audited</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedApp.details.checklist.creditChecked}
                      onChange={() => handleToggleChecklist(selectedApp.code, "creditChecked")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">Credit File Pulled</span>
                  </label>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                <h4 className="font-black text-xs text-zinc-400 uppercase tracking-wider">Audit Log & Timeline</h4>
                
                <div className="space-y-4.5 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
                  {selectedApp.details.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4 relative">
                      <div className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border border-white z-10 shadow-3xs ${event.color}`}>
                        <event.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm font-bold text-zinc-800">{event.label}</p>
                        <p className="text-xs font-semibold text-zinc-400 mt-0.5">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Sticky Footer Actions */}
            <div className="p-6 bg-white border-t border-zinc-200 flex flex-wrap gap-3">
              {selectedApp.status !== "Approved" && (
                <button
                  onClick={() => handleUpdateStatus(selectedApp.code, "Approved")}
                  className="flex-1 h-11 px-4 rounded-xl bg-indigo-900 text-white font-bold text-sm shadow-xs hover:bg-indigo-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  Approve
                </button>
              )}

              {selectedApp.status !== "Rejected" && (
                <button
                  onClick={() => handleUpdateStatus(selectedApp.code, "Rejected")}
                  className="h-11 px-5 rounded-xl border border-zinc-200 bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="h-4.5 w-4.5" />
                  Reject
                </button>
              )}

              {selectedApp.status !== "AI Assessment" && (
                <button
                  onClick={() => handleUpdateStatus(selectedApp.code, "AI Assessment")}
                  className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-purple-600 hover:bg-purple-50 hover:border-purple-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Brain className="h-4.5 w-4.5" />
                  AI Re-Review
                </button>
              )}

              {selectedApp.status !== "Pending Documents" && (
                <button
                  onClick={() => handleUpdateStatus(selectedApp.code, "Pending Documents")}
                  className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-orange-600 hover:bg-orange-50 hover:border-orange-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="h-4.5 w-4.5" />
                  Request Docs
                </button>
              )}
            </div>

          </aside>
        </>
      )}

    </div>
  );
}
