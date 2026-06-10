import React from "react";
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  FileText, 
  AlertCircle, 
  Clock, 
  ShieldCheck 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoanApplication } from "@/types/application";
import { getStatusStyles, getDtiStyles, getInitials } from "./ApplicationsTable";

interface ApplicationDetailDrawerProps {
  selectedApp: LoanApplication;
  onClose: () => void;
  onUpdateStatus: (code: string, newStatus: string) => void;
  onToggleChecklist: (code: string, checklistKey: keyof LoanApplication["details"]["checklist"]) => void;
}

export default function ApplicationDetailDrawer({
  selectedApp,
  onClose,
  onUpdateStatus,
  onToggleChecklist,
}: ApplicationDetailDrawerProps) {
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
            onClick={onClose}
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
                  onChange={() => onToggleChecklist(selectedApp.code, "idVerified")}
                  className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                />
                <span className="text-sm font-semibold text-zinc-700 select-none">ID Verified</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selectedApp.details.checklist.incomeVerified}
                  onChange={() => onToggleChecklist(selectedApp.code, "incomeVerified")}
                  className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                />
                <span className="text-sm font-semibold text-zinc-700 select-none">Income Verified</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selectedApp.details.checklist.taxReturnsVerified}
                  onChange={() => onToggleChecklist(selectedApp.code, "taxReturnsVerified")}
                  className="h-4.5 w-4.5 rounded-md border-zinc-300 text-indigo-900 focus:ring-indigo-900 cursor-pointer"
                />
                <span className="text-sm font-semibold text-zinc-700 select-none">Tax Returns Audited</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selectedApp.details.checklist.creditChecked}
                  onChange={() => onToggleChecklist(selectedApp.code, "creditChecked")}
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
              onClick={() => onUpdateStatus(selectedApp.code, "Approved")}
              className="flex-1 h-11 px-4 rounded-xl bg-indigo-900 text-white font-bold text-sm shadow-xs hover:bg-indigo-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="h-4.5 w-4.5" />
              Approve
            </button>
          )}

          {selectedApp.status !== "Rejected" && (
            <button
              onClick={() => onUpdateStatus(selectedApp.code, "Rejected")}
              className="h-11 px-5 rounded-xl border border-zinc-200 bg-white text-rose-600 hover:bg-rose-50 hover:border-rose-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <XCircle className="h-4.5 w-4.5" />
              Reject
            </button>
          )}

          {selectedApp.status !== "AI Assessment" && (
            <button
              onClick={() => onUpdateStatus(selectedApp.code, "AI Assessment")}
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-purple-600 hover:bg-purple-50 hover:border-purple-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Brain className="h-4.5 w-4.5" />
              AI Re-Review
            </button>
          )}

          {selectedApp.status !== "Pending Documents" && (
            <button
              onClick={() => onUpdateStatus(selectedApp.code, "Pending Documents")}
              className="h-11 px-4 rounded-xl border border-zinc-200 bg-white text-orange-600 hover:bg-orange-50 hover:border-orange-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileText className="h-4.5 w-4.5" />
              Request Docs
            </button>
          )}
        </div>

      </aside>
    </>
  );
}
