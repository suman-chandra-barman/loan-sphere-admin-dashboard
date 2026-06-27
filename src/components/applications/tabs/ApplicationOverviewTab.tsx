import React from "react";
import { User, DollarSign, Brain, CheckCircle2, Info } from "lucide-react";
import { getInitials } from "@/components/applications/ApplicationsTable";
import { ApplicationDetailData } from "@/types/adminApplication";

interface ApplicationOverviewTabProps {
  app: ApplicationDetailData;
  latestNote: string | null;
}

export default function ApplicationOverviewTab({ app, latestNote }: ApplicationOverviewTabProps) {
  const radius = 36;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (app.overview.aiRiskAssessment.riskScore / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Profile Card */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-zinc-400" />
            <h3 className="font-extrabold text-zinc-900 text-sm tracking-tight uppercase">
              Customer Profile
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#9c2415] text-white font-black flex items-center justify-center text-sm shadow-3xs">
              {getInitials(app.overview.customerProfile.customer?.name || "")}
            </div>
            <div>
              <h4 className="font-extrabold text-zinc-900 text-base">
                {app.overview.customerProfile.customer?.name}
              </h4>
              <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                {app.overview.customerProfile.customer?.email}
              </p>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">
                Phone
              </span>
              <p className="font-semibold text-zinc-800 mt-1">
                {app.overview.customerProfile.phone}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">
                Credit Score
              </span>
              <div className="mt-1 flex items-center">
                <span
                  className={`font-extrabold text-xs px-2.5 py-0.5 rounded-md ${
                    app.overview.customerProfile.creditScore >= 720
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : app.overview.customerProfile.creditScore >= 620
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-rose-50 text-rose-700 border border-rose-100"
                  }`}
                >
                  {app.overview.customerProfile.creditScore}
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">
                Annual Income
              </span>
              <p className="font-semibold text-zinc-800 mt-1">
                {app.overview.customerProfile.annualIncomeDisplay}
              </p>
            </div>
            {app.overview.customerProfile.employer && (
              <div>
                <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">
                  Employer
                </span>
                <p className="font-semibold text-zinc-800 mt-1">
                  {app.overview.customerProfile.employer}
                </p>
              </div>
            )}
            <div>
              <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">
                Employment
              </span>
              <p className="font-semibold text-zinc-800 mt-1">
                {app.overview.customerProfile.employment}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Summary Card */}
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-zinc-400" />
              <h3 className="font-extrabold text-zinc-900 text-sm tracking-tight uppercase">
                Financial Summary
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                  Requested Amount
                </span>
                <span className="font-extrabold text-zinc-800">
                  {app.overview.financialSummary.requestedAmountDisplay}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                  Annual Income
                </span>
                <span className="font-extrabold text-zinc-800">
                  {app.overview.financialSummary.annualIncomeDisplay}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">
                  Monthly Payment
                </span>
                <span className="font-extrabold text-zinc-800">
                  {app.overview.financialSummary.monthlyPaymentDisplay}
                </span>
              </div>
              {app.overview.financialSummary.purpose && (
                <div className="flex justify-between items-start text-sm gap-4">
                  <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs mt-0.5">
                    Purpose
                  </span>
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
            <span className="font-black text-emerald-700 text-xl">
              {app.overview.financialSummary.dtiRatioDisplay}
            </span>
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
              <span className="text-2xl font-black leading-none">
                {app.overview.aiRiskAssessment.riskScore}
              </span>
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
      {latestNote && (
        <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-5 shadow-3xs flex gap-3.5 animate-in fade-in">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-amber-900 text-sm">Admin Notes</h4>
            <p className="text-sm font-semibold text-amber-800 mt-1 leading-relaxed">
              {latestNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
