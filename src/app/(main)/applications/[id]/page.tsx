"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetApplicationDetailsQuery } from "@/redux/api/applicationsApi";
import { getStatusStyles } from "@/components/applications/ApplicationsTable";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Brain, 
  FileText, 
  Info, 
  User,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import ApplicationDetailsSkeleton from "@/components/skeleton/ApplicationDetailsSkeleton";
import ApplicationOverviewTab from "@/components/applications/tabs/ApplicationOverviewTab";
import ApplicationDocumentsTab from "@/components/applications/tabs/ApplicationDocumentsTab";
import ApplicationTimelineTab from "@/components/applications/tabs/ApplicationTimelineTab";
import ApplicationNotesTab from "@/components/applications/tabs/ApplicationNotesTab";

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
      return { label: "Approved", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 };
    case "under review":
      return { label: "Under Review", color: "bg-amber-50 text-amber-700 border-amber-100", icon: Clock };
    case "submitted":
      return { label: "Submitted", color: "bg-blue-50 text-blue-700 border-blue-100", icon: Clock };
    case "pending documents":
      return { label: "Pending Documents", color: "bg-orange-50 text-orange-700 border-orange-100", icon: FileText };
    case "kyc required":
      return { label: "KYC Required", color: "bg-purple-50 text-purple-700 border-purple-100", icon: ShieldCheck };
    case "rejected":
      return { label: "Rejected", color: "bg-rose-50 text-rose-700 border-rose-100", icon: XCircle };
    case "draft":
      return { label: "Draft", color: "bg-slate-100 text-slate-600 border-slate-200", icon: FileText };
    case "completed":
      return { label: "Completed", color: "bg-teal-50 text-teal-700 border-teal-100", icon: CheckCircle2 };
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
    return <ApplicationDetailsSkeleton />;
  }

  if (!app) return null;

  const LoanIcon = getLoanTypeIcon(app.header.title);
  const currentStatus = app.header.statusLabel || app.header.status;
  const statusInfo = getHeaderStatusInfo(currentStatus);

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
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(currentStatus)}`}>
                  {currentStatus}
                </span>
              </div>
              <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                {app.applicationNumber} • Applied {new Date(app.rawApplication.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <p className="text-sm font-semibold text-zinc-800 mt-0.5">{app.header.customerName}</p>
            </div>
          </div>

          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${statusInfo.color} md:w-auto w-full justify-center shadow-3xs`}>
            <span className="font-bold text-sm tracking-tight">{currentStatus}</span>
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
        {activeTab === "overview" && (
          <ApplicationOverviewTab
            app={app}
            latestNote={app.overview.adminNotes.items?.[0]?.note || null}
          />
        )}
        {activeTab === "documents" && (
          <ApplicationDocumentsTab applicationId={id} />
        )}
        {activeTab === "timeline" && (
          <ApplicationTimelineTab applicationId={id} />
        )}
        {activeTab === "notes" && (
          <ApplicationNotesTab applicationId={id} canAddNote={app.actions.canAddNote} />
        )}
      </div>
    </div>
  );
}
