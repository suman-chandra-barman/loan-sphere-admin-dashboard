"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApplications } from "@/hooks/useApplications";
import { getStatusStyles, getDtiStyles, getInitials } from "@/components/applications/ApplicationsTable";
import { 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Brain, 
  AlertCircle, 
  Home, 
  User, 
  Car, 
  Briefcase, 
  GraduationCap, 
  RefreshCw, 
  FileText,
  TrendingUp,
  Upload,
  StickyNote,
  ShieldCheck,
  TrendingDown,
  Info,
  Calendar,
  DollarSign,
  Plus
} from "lucide-react";
import { LoanApplication } from "@/types/application";

// Helper for mapping loan types to Lucide Icons
function getLoanTypeIcon(type: string) {
  switch (type) {
    case "Home Loan":
      return Home;
    case "Personal Loan":
      return User;
    case "Vehicle Loan":
      return Car;
    case "Business Loan":
      return Briefcase;
    case "Education Loan":
      return GraduationCap;
    case "Debt Consolidation":
      return RefreshCw;
    default:
      return FileText;
  }
}

// Helper for getting status badge message in header
function getHeaderStatusInfo(status: string) {
  switch (status) {
    case "Approved":
      return { label: "Application Approved", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 };
    case "Under Review":
      return { label: "Application Under Review", color: "bg-amber-50 text-amber-700 border-amber-100", icon: Clock };
    case "AI Assessment":
      return { label: "AI Assessing Risk", color: "bg-purple-50 text-purple-700 border-purple-100", icon: Brain };
    case "Submitted":
      return { label: "Application Submitted", color: "bg-blue-50 text-blue-700 border-blue-100", icon: Clock };
    case "Pending Documents":
      return { label: "Pending Documents", color: "bg-orange-50 text-orange-700 border-orange-100", icon: FileText };
    case "Rejected":
      return { label: "Application Rejected", color: "bg-rose-50 text-rose-700 border-rose-100", icon: XCircle };
    case "Draft":
      return { label: "Application Draft", color: "bg-slate-100 text-slate-600 border-slate-200", icon: FileText };
    case "Cond. Approved":
      return { label: "Conditionally Approved", color: "bg-teal-50 text-teal-700 border-teal-100", icon: CheckCircle2 };
    default:
      return { label: "Status Unknown", color: "bg-zinc-50 text-zinc-600 border-zinc-100", icon: Info };
  }
}

// Financial formula for Monthly Payment amortization
function calculateMonthlyPayment(amountStr: string, rateStr: string, termStr: string) {
  const amount = parseFloat(amountStr.replace(/[^0-9.]/g, "")) || 0;
  const rate = parseFloat(rateStr.replace(/[^0-9.]/g, "")) / 100 || 0.06;
  let months = 360;
  if (termStr.toLowerCase().includes("year")) {
    const years = parseInt(termStr) || 30;
    months = years * 12;
  } else if (termStr.toLowerCase().includes("month")) {
    months = parseInt(termStr) || 360;
  }
  const monthlyRate = rate / 12;
  if (monthlyRate === 0) return (amount / months).toFixed(0);
  const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return isNaN(payment) ? "0" : Math.round(payment).toLocaleString();
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  
  const { 
    applications, 
    handleUpdateStatus, 
    handleToggleChecklist,
    handleUpdateDocumentStatus,
    handleAddNote
  } = useApplications();

  const [activeTab, setActiveTab] = useState("overview");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find current application
  const app = applications.find(a => a.code === id);

  if (!mounted) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-900" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-6 space-y-4">
        <Link href="/applications" className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 transition-colors font-bold text-sm mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Applications
        </Link>
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center space-y-2">
          <h3 className="font-extrabold text-zinc-900 text-lg">Application Not Found</h3>
          <p className="text-zinc-500 text-sm">We couldn't locate a loan application with code "{id}".</p>
        </div>
      </div>
    );
  }

  const LoanIcon = getLoanTypeIcon(app.type);
  const statusInfo = getHeaderStatusInfo(app.status);
  
  // Calculate monthly payment and annual income
  const monthlyPaymentVal = calculateMonthlyPayment(app.amount, app.details.rate, app.details.term);
  const annualIncomeVal = (app.details.monthlyIncome * 12).toLocaleString();
  
  // Parse Employer Name from employment string (e.g. "Full Time at TechCorp Inc." -> "TechCorp Inc.")
  let employer = "Not specified";
  let employmentType = app.details.employment;
  if (app.details.employment.includes("at")) {
    const parts = app.details.employment.split("at");
    employmentType = parts[0].trim();
    employer = parts[1].trim();
  }

  // Calculate Radial Progress dashboard parameters for AI risk score
  const riskScore = app.details.creditScore >= 740 ? 78 : app.details.creditScore >= 700 ? 65 : 42;
  const radius = 36;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  // AI Checks list derived dynamically
  const aiChecks = [
    {
      title: "Credit Score",
      desc: `Credit score of ${app.details.creditScore} is ${app.details.creditScore >= 700 ? "above" : "below"} the 700 threshold for preferred rates.`,
      status: app.details.creditScore >= 700 ? "success" : "warning"
    },
    {
      title: "DTI Ratio",
      desc: `Debt-to-income ratio of ${app.dti}% is ${app.dti <= 43 ? "well within" : "above"} the acceptable range of 43%.`,
      status: app.dti <= 43 ? "success" : "danger"
    },
    {
      title: "Employment Stability",
      desc: `Employment: ${employmentType} ${employer !== "Not specified" ? `with ${employer}` : ""} indicates credit stability.`,
      status: "success"
    },
    {
      title: "Loan-to-Value",
      desc: `LTV of 85% is standard for first-time home buyers with PMI.`,
      status: "info"
    },
    {
      title: "Savings Reserve",
      desc: `Applicant has 6+ months of mortgage payments in reserve.`,
      status: "success"
    }
  ];

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    handleAddNote(app.code, newNoteContent.trim());
    setNewNoteContent("");
  };

  return (
    <div className="space-y-6 pb-12">
      
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
            {/* Box Icon dynamic by loan type */}
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#9c2415]/10 border border-[#9c2415]/15 flex items-center justify-center text-[#9c2415]">
              <LoanIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-black text-zinc-900 tracking-tight">{app.type}</h2>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(app.status)}`}>
                  {app.status}
                </span>
              </div>
              <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                {app.code} • Applied {app.date}
              </p>
              <p className="text-sm font-semibold text-zinc-800 mt-0.5">{app.customer}</p>
            </div>
          </div>

          {/* Right hand check banner */}
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
            <p className="text-xl font-black text-zinc-900 mt-1">{app.amount}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Monthly Payment</span>
            <p className="text-xl font-black text-zinc-900 mt-1">${monthlyPaymentVal}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Interest Rate</span>
            <p className="text-xl font-black text-zinc-900 mt-1">{app.details.rate}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Term</span>
            <p className="text-xl font-black text-zinc-900 mt-1">
              {app.details.term.toLowerCase().includes("month") 
                ? app.details.term 
                : app.details.term.toLowerCase().includes("year")
                  ? `${parseInt(app.details.term) * 12} months`
                  : app.details.term}
            </p>
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
                    {getInitials(app.customer)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-900 text-base">{app.customer}</h4>
                    <p className="text-xs font-semibold text-zinc-400 mt-0.5">{app.details.email}</p>
                  </div>
                </div>

                <hr className="border-zinc-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Phone</span>
                    <p className="font-semibold text-zinc-800 mt-1">{app.details.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Credit Score</span>
                    <div className="mt-1 flex items-center">
                      <span className={`font-extrabold text-xs px-2.5 py-0.5 rounded-md ${
                        app.details.creditScore >= 720 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : app.details.creditScore >= 620 
                            ? "bg-amber-50 text-amber-700 border border-amber-100" 
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>{app.details.creditScore}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Annual Income</span>
                    <p className="font-semibold text-zinc-800 mt-1">${annualIncomeVal}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Employer</span>
                    <p className="font-semibold text-zinc-800 mt-1">{employer}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Employment</span>
                    <p className="font-semibold text-zinc-800 mt-1">{employmentType}</p>
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
                      <span className="font-extrabold text-zinc-800">{app.amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Annual Income</span>
                      <span className="font-extrabold text-zinc-800">${annualIncomeVal}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Monthly Expenses</span>
                      <span className="font-extrabold text-zinc-800">${app.details.monthlyDebt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Monthly Payment</span>
                      <span className="font-extrabold text-zinc-800">${monthlyPaymentVal}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm gap-4">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs mt-0.5">Purpose</span>
                      <span className="font-semibold text-zinc-800 text-right leading-relaxed max-w-[280px]">
                        {app.details.purpose}
                      </span>
                    </div>
                  </div>
                </div>

                {/* DTI highlight bar at bottom */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4.5 flex justify-between items-center shadow-3xs mt-2">
                  <span className="font-bold text-emerald-800 text-sm">Debt-to-Income Ratio</span>
                  <span className="font-black text-emerald-700 text-xl">{app.dti}%</span>
                </div>
              </div>

            </div>

            {/* AI Risk Assessment Card */}
            <div className="bg-[#5c24b8] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              {/* Decorative radial blur background */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
              
              {/* Radial score indicator */}
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
                    <span className="text-2xl font-black leading-none">{riskScore}</span>
                    <span className="text-[10px] font-bold opacity-60 mt-0.5">Risk Score</span>
                  </div>
                </div>
                
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-3xs">
                  Approve Recommended
                </span>
              </div>

              {/* Assessment list checks */}
              <div className="flex-1 space-y-4 z-10">
                <div className="space-y-1">
                  <h3 className="font-black text-base tracking-tight flex items-center gap-1.5">
                    <Brain className="h-5 w-5 shrink-0" /> AI Risk Assessment
                  </h3>
                  <p className="text-xs font-semibold text-purple-200/90 leading-relaxed">
                    {app.customer} presents a low-risk profile for this {app.amount} {app.type.toLowerCase()}. Strong credit history, stable income, and reasonable DTI ratio support an approval recommendation. Loan-to-value ratio is typical for the market segment.
                  </p>
                </div>

                <hr className="border-white/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-semibold">
                  {aiChecks.map((check, idx) => {
                    let arrowIcon = TrendingUp;
                    let iconColor = "text-emerald-400";
                    if (check.status === "warning" || check.status === "danger") {
                      arrowIcon = TrendingDown;
                      iconColor = "text-amber-400";
                    } else if (check.status === "info") {
                      arrowIcon = Info;
                      iconColor = "text-zinc-300";
                    }
                    const IconComp = arrowIcon;
                    return (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className={`p-0.5 rounded-md bg-white/10 ${iconColor} shrink-0 mt-0.5`}>
                          <IconComp className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-[11px] leading-relaxed text-white/95">
                          <strong className="font-extrabold">{check.title}</strong>: {check.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Admin Notes Summary Box */}
            {app.details.notes && app.details.notes.length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-5 shadow-3xs flex gap-3.5">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-amber-900 text-sm">Admin Notes</h4>
                  <p className="text-sm font-semibold text-amber-800 mt-1 leading-relaxed">
                    {app.details.notes[0].content}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-0 shadow-sm overflow-hidden">
            <div className="divide-y divide-zinc-100">
              {(app.details.documents || []).length > 0 ? (
                (app.details.documents || []).map((doc) => (
                  <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-zinc-50/20 transition-colors">
                    <div className="flex items-center gap-3.5">
                      {/* Red/Amber doc icon */}
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

                    {/* Right side document status badge and action triggers */}
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
                        onClick={() => handleUpdateDocumentStatus(app.code, doc.id, "Approved")}
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
                        onClick={() => handleUpdateDocumentStatus(app.code, doc.id, "Rejected")}
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
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm">
            <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100/80">
              {app.details.timeline.map((event, index) => {
                // event.icon is mapped to React.ComponentType by our deserializer
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
          <div className="space-y-6">
            
            {/* Notes List */}
            <div className="space-y-4">
              {(app.details.notes || []).length > 0 ? (
                (app.details.notes || []).map((note) => (
                  <div key={note.id} className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-[10px] uppercase shadow-3xs">
                          {getInitials(note.author)}
                        </div>
                        <span className="font-extrabold text-zinc-800 text-xs">{note.author}</span>
                        <span className="bg-amber-50 text-amber-700 border border-amber-100/50 rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-3xs">
                          Admin Note
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400">{note.date}</span>
                    </div>
                    
                    <p className="text-sm font-semibold text-zinc-600 leading-relaxed pl-8">
                      {note.content}
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
          </div>
        )}
      </div>
    </div>
  );
}
