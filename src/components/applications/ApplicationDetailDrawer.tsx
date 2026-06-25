"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  FileText, 
  AlertCircle, 
  Clock, 
  ShieldCheck,
  User,
  Info
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetApplicationDetailsQuery } from "@/redux/api/applicationsApi";
import { getStatusStyles, getDtiStyles, getInitials } from "./ApplicationsTable";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicationDetailDrawerProps {
  selectedAppId: string;
  onClose: () => void;
}

export default function ApplicationDetailDrawer({
  selectedAppId,
  onClose,
}: ApplicationDetailDrawerProps) {
  const { data, isLoading, error } = useGetApplicationDetailsQuery(selectedAppId);
  const app = data?.data;

  // Local state overrides for mutations since we are mock-syncing updates
  const [localStatus, setLocalStatus] = useState<string | null>(null);
  const [localChecklist, setLocalChecklist] = useState({
    idVerified: true,
    incomeVerified: true,
    taxReturnsVerified: true,
    creditChecked: true,
  });

  useEffect(() => {
    if (app) {
      setLocalStatus(app.header.statusLabel || app.header.status);
    }
  }, [app]);

  const handleUpdateStatus = (newStatus: string) => {
    setLocalStatus(newStatus);
    // Simple toast simulation
    const notify = async () => {
      const { toast } = await import("react-toastify");
      toast.success(`Application status updated to ${newStatus}`);
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
      toast.success("Document checklist updated");
    };
    notify();
  };

  if (error) {
    return (
      <>
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/35 backdrop-blur-2xs animate-in fade-in" />
        <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl bg-white p-6 shadow-2xl border-l border-zinc-200 flex flex-col justify-center items-center text-center space-y-4 animate-in slide-in-from-right duration-300">
          <div className="text-rose-500 font-bold text-lg">Error Loading Details</div>
          <p className="text-zinc-500 text-sm max-w-md">
            We couldn't retrieve the details for this application. Please check your connection and try again.
          </p>
          <button onClick={onClose} className="px-4 py-2 border rounded-xl font-bold text-xs hover:bg-zinc-50 transition-colors">
            Close Panel
          </button>
        </aside>
      </>
    );
  }

  // Define dynamic timeline log items based on API data when loaded
  const timelineEvents = app
    ? ([
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
      ].filter(Boolean) as any[])
    : [];

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/35 backdrop-blur-2xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Side Drawer Content */}
      <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-2xl bg-[#faf7f2] shadow-2xl border-l border-zinc-200 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-32 rounded" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </>
              ) : (
                <>
                  <span className="text-xl font-black text-zinc-900 tracking-tight">{app?.applicationNumber}</span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(localStatus || "")}`}>
                    {localStatus}
                  </span>
                </>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-3 w-40 mt-1.5 rounded" />
            ) : (
              <p className="text-xs font-semibold text-zinc-400 mt-1">
                Submitted on {app?.rawApplication.createdAt ? new Date(app.rawApplication.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {/* Applicant Card Skeleton */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-3 w-48 rounded" />
                  </div>
                </div>
                <hr className="border-zinc-100" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Skeleton className="h-3 w-16 rounded" /><Skeleton className="h-4 w-28 rounded" /></div>
                  <div className="space-y-2"><Skeleton className="h-3 w-20 rounded" /><Skeleton className="h-4 w-32 rounded" /></div>
                </div>
              </div>

              {/* Financials & Loan Specs skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                  <Skeleton className="h-3 w-24 rounded" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between"><Skeleton className="h-3.5 w-20 rounded" /><Skeleton className="h-3.5 w-16 rounded" /></div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                  <Skeleton className="h-3 w-24 rounded" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between"><Skeleton className="h-3.5 w-24 rounded" /><Skeleton className="h-3.5 w-16 rounded" /></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : app ? (
            <>
              {/* Applicant Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 bg-zinc-200 border border-zinc-300/30">
                    <AvatarFallback className="text-sm font-black text-zinc-800 bg-zinc-200">
                      {app.overview.customerProfile.customer?.initials || getInitials(app.overview.customerProfile.customer?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-extrabold text-zinc-900 text-base">{app.overview.customerProfile.customer?.name}</h3>
                    <p className="text-xs font-semibold text-zinc-400 mt-0.5">{app.overview.customerProfile.customer?.email}</p>
                  </div>
                </div>

                <hr className="border-zinc-100" />

                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone Number</span>
                    <p className="font-semibold text-zinc-800 mt-0.5">{app.overview.customerProfile.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Employment</span>
                    <p className="font-semibold text-zinc-800 mt-0.5 leading-relaxed">
                      {app.overview.customerProfile.employment} {app.overview.customerProfile.employer ? `at ${app.overview.customerProfile.employer}` : ""}
                    </p>
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
                      <span className="text-zinc-500 font-semibold">Annual Income</span>
                      <span className="font-extrabold text-zinc-800">{app.overview.customerProfile.annualIncomeDisplay}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Monthly Expenses</span>
                      <span className="font-extrabold text-zinc-800">{app.overview.financialSummary.monthlyPaymentDisplay}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Debt to Income (DTI)</span>
                      <span className={`font-black ${getDtiStyles(app.overview.financialSummary.dtiRatio)}`}>{app.overview.financialSummary.dtiRatioDisplay}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Credit Score</span>
                      <span className={`font-extrabold text-sm px-2 py-0.5 rounded-md ${
                        app.overview.customerProfile.creditScore >= 720 
                          ? "bg-emerald-50 text-emerald-700" 
                          : app.overview.customerProfile.creditScore >= 620 
                            ? "bg-amber-50 text-amber-700" 
                            : "bg-rose-50 text-rose-700"
                      }`}>{app.overview.customerProfile.creditScore}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Specifications */}
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                  <h4 className="font-black text-xs text-zinc-400 uppercase tracking-wider">Loan Details</h4>
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Loan Product</span>
                      <span className="font-extrabold text-zinc-800">{app.header.title}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Requested Amount</span>
                      <span className="font-black text-zinc-900">{app.header.loanAmountDisplay}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Loan Term</span>
                      <span className="font-extrabold text-zinc-800">{app.header.term}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-semibold">Interest Rate</span>
                      <span className="font-extrabold text-zinc-800">{app.header.interestRate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purpose & Description */}
              {app.rawApplication.notes && (
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-2.5">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">Loan Purpose</span>
                  <p className="text-sm font-semibold text-zinc-800 leading-relaxed">
                    {app.rawApplication.notes}
                  </p>
                </div>
              )}

              {/* Checklist */}
              <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-3xs space-y-4">
                <h4 className="font-black text-xs text-zinc-400 uppercase tracking-wider">Document Checklist</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={localChecklist.idVerified}
                      onChange={() => handleToggleChecklist("idVerified")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">ID Verified</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={localChecklist.incomeVerified}
                      onChange={() => handleToggleChecklist("incomeVerified")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">Income Verified</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={localChecklist.taxReturnsVerified}
                      onChange={() => handleToggleChecklist("taxReturnsVerified")}
                      className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-700 select-none">Tax Returns Audited</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={localChecklist.creditChecked}
                      onChange={() => handleToggleChecklist("creditChecked")}
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
                  {timelineEvents.map((event, index) => {
                    const TimelineIcon = event.icon;
                    return (
                      <div key={index} className="flex gap-4 relative">
                        <div className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border border-white z-10 shadow-3xs ${event.color}`}>
                          <TimelineIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm font-bold text-zinc-800">{event.label}</p>
                          <p className="text-xs font-semibold text-zinc-400 mt-0.5">{event.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Drawer Sticky Footer Actions */}
        {!isLoading && app && (
          <div className="p-6 bg-white border-t border-zinc-200 flex flex-wrap gap-3 shrink-0">
            {app.actions.canApprove && localStatus !== "Approved" && (
              <button
                onClick={() => handleUpdateStatus("Approved")}
                className="flex-1 h-11 px-4 rounded-xl bg-indigo-900 text-white font-bold text-sm shadow-xs hover:bg-indigo-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="h-4.5 w-4.5" />
                Approve
              </button>
            )}

            {app.actions.canReject && localStatus !== "Rejected" && (
              <button
                onClick={() => handleUpdateStatus("Rejected")}
                className="h-11 px-5 rounded-xl border border-zinc-200 bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="h-4.5 w-4.5" />
                Reject
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
                Request Docs
              </button>
            )}
          </div>
        )}

      </aside>
    </>
  );
}
