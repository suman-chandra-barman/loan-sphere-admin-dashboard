"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetApplicationDetailsQuery } from "@/redux/api/applicationsApi";
import { getStatusStyles, getDtiStyles, getInitials } from "@/components/applications/ApplicationsTable";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Brain, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  DollarSign, 
  Plus,
  User,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  StickyNote
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function getLoanTypeIcon(type: string) {
  const t = (type || "").toLowerCase();
  if (t.includes("home")) return Home;
  if (t.includes("personal")) return User;
  if (t.includes("vehicle") || t.includes("car")) return Car;
  if (t.includes("business")) return Briefcase;
  if (t.includes("education")) return GraduationCap;
  if (t.includes("consolidation") || t.includes("debt")) return RefreshCw;
  return FileText;
}

function getHeaderStatusInfo(status: string) {
  const type = (status || "").toLowerCase().replace(/[\s_]+/g, " ");
  switch (type) {
    case "approved":
      return { label: "Application Approved", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 };
    case "under review":
      return { label: "Application Under Review", color: "bg-amber-50 text-amber-700 border-amber-100", icon: Clock };
    case "ai assessment":
      return { label: "AI Assessing Risk", color: "bg-purple-50 text-purple-700 border-purple-100", icon: Brain };
    case "submitted":
      return { label: "Application Submitted", color: "bg-blue-50 text-blue-700 border-blue-100", icon: Clock };
    case "pending documents":
    case "pending docs":
      return { label: "Pending Documents", color: "bg-orange-50 text-orange-700 border-orange-100", icon: FileText };
    case "rejected":
      return { label: "Application Rejected", color: "bg-rose-50 text-rose-700 border-rose-100", icon: XCircle };
    case "draft":
      return { label: "Application Draft", color: "bg-slate-100 text-slate-600 border-slate-200", icon: FileText };
    case "cond. approved":
    case "conditionally approved":
      return { label: "Conditionally Approved", color: "bg-teal-50 text-teal-700 border-teal-100", icon: CheckCircle2 };
    default:
      return { label: "Status Unknown", color: "bg-zinc-50 text-zinc-600 border-zinc-100", icon: Info };
  }
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { data, isLoading, error } = useGetApplicationDetailsQuery(id);
  const app = data?.data;

  const [activeTab, setActiveTab] = useState("overview");
  const [newNoteContent, setNewNoteContent] = useState("");

  // States for local simulated mutations
  const [localStatus, setLocalStatus] = useState<string | null>(null);
  const [localChecklist, setLocalChecklist] = useState({
    idVerified: true,
    incomeVerified: true,
    taxReturnsVerified: true,
    creditChecked: true,
  });
  const [localDocuments, setLocalDocuments] = useState<any[]>([]);
  const [localNotes, setLocalNotes] = useState<any[]>([]);

  useEffect(() => {
    if (app) {
      setLocalStatus(app.header.statusLabel || app.header.status);
      setLocalNotes(app.overview.adminNotes.items || []);

      // Mock documents array matching the uploaded Count
      const count = app.rawApplication.documentsSummary.uploadedCount || 5;
      const docNames = [
        "Proof of Identity (Passport/Driver's License).pdf",
        "Recent Paystubs (Last 2 Months).pdf",
        "Bank Statements (Last 3 Months).pdf",
        "W-2 Tax Forms (Last 2 Years).pdf",
        "Property Purchase Agreement.pdf",
        "Utility Bill (Proof of Address).pdf",
      ];
      const items = Array.from({ length: count }).map((_, idx) => ({
        id: `doc-${idx}`,
        name: docNames[idx] || `Uploaded Document ${idx + 1}.pdf`,
        size: idx === 0 ? "1.2 MB" : idx === 1 ? "450 KB" : "890 KB",
        date: new Date(app.rawApplication.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "Approved",
      }));
      setLocalDocuments(items);
    }
  }, [app]);

  const handleUpdateStatus = (newStatus: string) => {
    setLocalStatus(newStatus);
    const notify = async () => {
      const { toast } = await import("react-toastify");
      toast.success(`Status updated to ${newStatus}`);
    };
    notify();
  };

  const handleToggleChecklist = (key: keyof typeof localChecklist) => {
    setLocalChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    const notify = async () => {
      const { toast } = await import("react-toastify");
      toast.success("Checklist status changed");
    };
    notify();
  };

  const handleUpdateDocumentStatus = (docId: string, status: string) => {
    setLocalDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, status } : doc))
    );
    const notify = async () => {
      const { toast } = await import("react-toastify");
      toast.success(`Document status updated to ${status}`);
    };
    notify();
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    const newNoteItem = {
      id: `note-${Date.now()}`,
      note: newNoteContent.trim(),
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setLocalNotes((prev) => [newNoteItem, ...prev]);
    setNewNoteContent("");

    const notify = async () => {
      const { toast } = await import("react-toastify");
      toast.success("Admin note added successfully");
    };
    notify();
  };

  if (error) {
    return (
      <div className="p-6 space-y-4">
        <Link href="/applications" className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 transition-colors font-bold text-sm mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Applications
        </Link>
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center space-y-2">
          <h3 className="font-extrabold text-zinc-900 text-lg">Error Loading Application</h3>
          <p className="text-zinc-500 text-sm">We couldn't retrieve details for the application with ID "{id}".</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-in fade-in duration-300">
        <div>
          <Skeleton className="h-5 w-44 rounded-md" />
        </div>
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            </div>
            <Skeleton className="h-11 w-44 rounded-2xl" />
          </div>
          <hr className="border-zinc-100" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-11 w-[380px] rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-4">
            <Skeleton className="h-5 w-32 rounded" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3 w-40 rounded" />
              </div>
            </div>
            <hr className="border-zinc-100" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between"><Skeleton className="h-3.5 w-20 rounded" /><Skeleton className="h-3.5 w-28 rounded" /></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-4">
            <Skeleton className="h-5 w-32 rounded" />
            <div className="space-y-3.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between"><Skeleton className="h-3.5 w-24 rounded" /><Skeleton className="h-3.5 w-16 rounded" /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!app) return null;

  const LoanIcon = getLoanTypeIcon(app.header.title);
  const statusInfo = getHeaderStatusInfo(localStatus || "");

  const radius = 36;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (app.overview.aiRiskAssessment.riskScore / 100) * circumference;

  const timelineEvents = ([
    {
      label: "Application submitted by customer",
      date: `${app.header.customerName} • ${new Date(app.rawApplication.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
      icon: FileText,
      color: "text-zinc-500 bg-zinc-50",
    },
    app.rawApplication.submittedAt && {
      label: "Referred to manual underwriting review",
      date: `System • ${new Date(app.rawApplication.submittedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: `AI assessment score generated: ${app.overview.aiRiskAssessment.riskScore}`,
      date: `AI Engine • ${new Date(app.rawApplication.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
      icon: Brain,
      color: "text-purple-600 bg-purple-50",
    },
    localStatus !== (app.header.statusLabel || app.header.status) && {
      label: `Status manually updated to ${localStatus}`,
      date: `Admin • Just now`,
      icon: ShieldCheck,
      color: "text-indigo-600 bg-indigo-50",
    },
  ].filter(Boolean) as any[]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top back navigation */}
      <div>
        <Link 
          href="/applications" 
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 transition-colors font-bold text-sm"
        >
          <ArrowLeft className="h-4.5 w-4.5" /> Back to Applications
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#9c2415]/10 border border-[#9c2415]/15 flex items-center justify-center text-[#9c2415]">
              <LoanIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-black text-zinc-900 tracking-tight">{app.header.title}</h2>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(localStatus || "")}`}>
                  {localStatus}
                </span>
              </div>
              <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                {app.applicationNumber} • Applied {new Date(app.rawApplication.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <p className="text-sm font-semibold text-zinc-800 mt-0.5">{app.header.customerName}</p>
            </div>
          </div>

          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${statusInfo.color} md:w-auto w-full justify-center shadow-3xs`}>
            <statusInfo.icon className="h-5 w-5 shrink-0" />
            <span className="font-bold text-sm tracking-tight">{statusInfo.label}</span>
          </div>
        </div>

        <hr className="border-zinc-100" />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Loan Amount</span>
            <p className="text-xl font-black text-zinc-900 mt-1">{app.header.loanAmountDisplay}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Monthly Payment</span>
            <p className="text-xl font-black text-zinc-900 mt-1">{app.header.monthlyPaymentDisplay}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Interest Rate</span>
            <p className="text-xl font-black text-zinc-900 mt-1">{app.header.interestRate}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Term</span>
            <p className="text-xl font-black text-zinc-900 mt-1">{app.header.term}</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-start">
        <div className="inline-flex p-1 bg-white border border-zinc-200/60 rounded-2xl gap-1 shadow-3xs">
          {[
            { id: "overview", label: "Overview" },
            { id: "documents", label: "Documents" },
            { id: "timeline", label: "Timeline" },
            { id: "notes", label: "Notes" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#9c2415] text-white shadow-3xs"
                  : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div>
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Customer Profile Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-zinc-400" />
                  <h3 className="font-extrabold text-zinc-900 text-sm tracking-tight uppercase">Customer Profile</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#9c2415] text-white font-black flex items-center justify-center text-sm shadow-3xs">
                    {getInitials(app.overview.customerProfile.customer?.name || "")}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-900 text-base">{app.overview.customerProfile.customer?.name}</h4>
                    <p className="text-xs font-semibold text-zinc-400 mt-0.5">{app.overview.customerProfile.customer?.email}</p>
                  </div>
                </div>

                <hr className="border-zinc-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Phone</span>
                    <p className="font-semibold text-zinc-800 mt-1">{app.overview.customerProfile.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Credit Score</span>
                    <div className="mt-1 flex items-center">
                      <span className={`font-extrabold text-xs px-2.5 py-0.5 rounded-md ${
                        app.overview.customerProfile.creditScore >= 720 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : app.overview.customerProfile.creditScore >= 620 
                            ? "bg-amber-50 text-amber-700 border border-amber-100" 
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>{app.overview.customerProfile.creditScore}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Annual Income</span>
                    <p className="font-semibold text-zinc-800 mt-1">{app.overview.customerProfile.annualIncomeDisplay}</p>
                  </div>
                  {app.overview.customerProfile.employer && (
                    <div>
                      <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Employer</span>
                      <p className="font-semibold text-zinc-800 mt-1">{app.overview.customerProfile.employer}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Employment</span>
                    <p className="font-semibold text-zinc-800 mt-1">{app.overview.customerProfile.employment}</p>
                  </div>
                </div>
              </div>

              {/* Financial Summary Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm flex flex-col justify-between space-y-5">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-zinc-400" />
                    <h3 className="font-extrabold text-zinc-900 text-sm tracking-tight uppercase">Financial Summary</h3>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Requested Amount</span>
                      <span className="font-extrabold text-zinc-800">{app.overview.financialSummary.requestedAmountDisplay}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Annual Income</span>
                      <span className="font-extrabold text-zinc-800">{app.overview.financialSummary.annualIncomeDisplay}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Monthly Payment</span>
                      <span className="font-extrabold text-zinc-800">{app.overview.financialSummary.monthlyPaymentDisplay}</span>
                    </div>
                    {app.overview.financialSummary.purpose && (
                      <div className="flex justify-between items-start text-sm gap-4">
                        <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs mt-0.5">Purpose</span>
                        <span className="font-semibold text-zinc-800 text-right leading-relaxed max-w-[280px]">
                          {app.overview.financialSummary.purpose}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* DTI highlight bar at bottom */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4.5 flex justify-between items-center shadow-3xs mt-2">
                  <span className="font-bold text-emerald-800 text-sm">Debt-to-Income Ratio</span>
                  <span className="font-black text-emerald-700 text-xl">{app.overview.financialSummary.dtiRatioDisplay}</span>
                </div>
              </div>

            </div>

            {/* AI Risk Assessment Card */}
            <div className="bg-[#5c24b8] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
              
              <div className="flex flex-col items-center shrink-0 gap-3 z-10">
                <div className="relative flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="#ffffff"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black leading-none">{app.overview.aiRiskAssessment.riskScore}</span>
                    <span className="text-[10px] font-bold opacity-60 mt-0.5">Risk Score</span>
                  </div>
                </div>
                
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-3xs">
                  {app.overview.aiRiskAssessment.recommendation}
                </span>
              </div>

              <div className="flex-1 space-y-4 z-10">
                <div className="space-y-1">
                  <h3 className="font-black text-base tracking-tight flex items-center gap-1.5">
                    <Brain className="h-5 w-5 shrink-0" /> AI Risk Assessment
                  </h3>
                  <p className="text-xs font-semibold text-purple-200/90 leading-relaxed">
                    {app.overview.aiRiskAssessment.summary}
                  </p>
                </div>

                <hr className="border-white/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-semibold">
                  {app.overview.aiRiskAssessment.factors.map((factor, idx) => {
                    const isPositive = factor.type === "positive";
                    const IconComp = isPositive ? CheckCircle2 : Info;
                    const iconColor = isPositive ? "text-emerald-400" : "text-amber-400";
                    return (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className={`p-0.5 rounded-md bg-white/10 ${iconColor} shrink-0 mt-0.5`}>
                          <IconComp className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-[11px] leading-relaxed text-white/95">
                          <strong className="font-extrabold">{factor.label}</strong>: {factor.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Admin Notes Summary Box */}
            {localNotes.length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-5 shadow-3xs flex gap-3.5">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-amber-900 text-sm">Admin Notes</h4>
                  <p className="text-sm font-semibold text-amber-800 mt-1 leading-relaxed">
                    {localNotes[0].note}
                  </p>
                </div>
              </div>
            )}

            {/* Actions Grid in overview */}
            <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-zinc-900 text-sm uppercase tracking-tight">Decisions & Actions</h3>
              <div className="flex flex-wrap gap-3">
                {app.actions.canApprove && localStatus !== "Approved" && (
                  <button
                    onClick={() => handleUpdateStatus("Approved")}
                    className="flex-1 h-11 px-4 rounded-xl bg-indigo-900 text-white font-bold text-sm shadow-xs hover:bg-indigo-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5" />
                    Approve Application
                  </button>
                )}
                {app.actions.canReject && localStatus !== "Rejected" && (
                  <button
                    onClick={() => handleUpdateStatus("Rejected")}
                    className="h-11 px-5 rounded-xl border border-zinc-200 bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="h-4.5 w-4.5" />
                    Reject Application
                  </button>
                )}
                {localStatus !== "AI Assessment" && (
                  <button
                    onClick={() => handleUpdateStatus("AI Assessment")}
                    className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-purple-600 hover:bg-purple-50 hover:border-purple-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Brain className="h-4.5 w-4.5" />
                    AI Re-Review
                  </button>
                )}
                {app.actions.canRequestDocuments && localStatus !== "Pending Documents" && (
                  <button
                    onClick={() => handleUpdateStatus("Pending Documents")}
                    className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-orange-600 hover:bg-orange-50 hover:border-orange-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="h-4.5 w-4.5" />
                    Request Documents
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-0 shadow-sm overflow-hidden animate-in fade-in duration-200">
            <div className="divide-y divide-zinc-100">
              {localDocuments.length > 0 ? (
                localDocuments.map((doc) => (
                  <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-zinc-50/20 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="h-10.5 w-10.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                        <FileText className="h-5.5 w-5.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm tracking-tight">{doc.name}</h4>
                        <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                          {doc.size} • {doc.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold shadow-3xs ${
                        doc.status === "Approved" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : doc.status === "Rejected" 
                            ? "bg-rose-50 text-rose-700 border-rose-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {doc.status}
                      </span>
                      
                      <button
                        onClick={() => handleUpdateDocumentStatus(doc.id, "Approved")}
                        disabled={doc.status === "Approved"}
                        className={`h-9 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                          doc.status === "Approved"
                            ? "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300"
                        }`}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleUpdateDocumentStatus(doc.id, "Rejected")}
                        disabled={doc.status === "Rejected"}
                        className={`h-9 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                          doc.status === "Rejected"
                            ? "border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed"
                            : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300"
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-zinc-400 text-sm font-semibold">
                  No documents found for this application.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === "timeline" && (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm animate-in fade-in duration-200">
            <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100/80">
              {timelineEvents.map((event, index) => {
                const TimelineIconComp = event.icon;
                return (
                  <div key={index} className="flex gap-4 relative">
                    <div className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border border-white z-10 shadow-3xs ${event.color || "text-zinc-500 bg-zinc-100"}`}>
                      <TimelineIconComp className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-extrabold text-zinc-800 leading-tight">{event.label}</p>
                      <p className="text-xs font-semibold text-zinc-400 mt-1">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === "notes" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Notes List */}
            <div className="space-y-4">
              {localNotes.length > 0 ? (
                localNotes.map((note) => (
                  <div key={note.id} className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-[10px] uppercase shadow-3xs">
                          {getInitials(note.createdBy || "")}
                        </div>
                        <span className="font-extrabold text-zinc-800 text-xs">{note.createdBy}</span>
                        <span className="bg-amber-50 text-amber-700 border border-amber-100/50 rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-3xs">
                          Admin Note
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400">
                        {new Date(note.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    
                    <p className="text-sm font-semibold text-zinc-600 leading-relaxed pl-8">
                      {note.note}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 text-center text-zinc-400 text-sm font-semibold shadow-3xs">
                  No internal notes listed yet.
                </div>
              )}
            </div>

            {/* Note Input Form */}
            {app.actions.canAddNote && (
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-4">
                <h3 className="font-extrabold text-zinc-900 text-sm uppercase tracking-tight">Add Note</h3>
                <form onSubmit={handleNoteSubmit} className="space-y-4">
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Add an internal note about this application..."
                    rows={4}
                    className="w-full rounded-xl border border-zinc-200/80 p-4 text-sm font-semibold focus:border-[#9c2415] focus:outline-none placeholder-zinc-300 resize-none leading-relaxed text-zinc-700 bg-zinc-50/25 focus:bg-white transition-colors"
                  />
                  
                  <button
                    type="submit"
                    disabled={!newNoteContent.trim()}
                    className={`h-10 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-3xs transition-all cursor-pointer ${
                      newNoteContent.trim()
                        ? "bg-[#9c2415] text-white hover:bg-[#851e11] active:scale-98"
                        : "bg-zinc-100 text-zinc-400 border border-zinc-200/50 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="h-4 w-4" /> Add Note
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
