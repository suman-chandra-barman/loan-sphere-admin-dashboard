"use client";

import { useState } from "react";
import { CheckCircle2, Circle, HelpCircle, ChevronDown, ChevronUp, Terminal, ShieldAlert } from "lucide-react";
import type { KycVerificationItem } from "@/types/kyc";

interface KycVerificationStepsProps {
  kyc: KycVerificationItem;
}

export default function KycVerificationSteps({ kyc }: KycVerificationStepsProps) {
  const [showRawJson, setShowRawJson] = useState(false);

  return (
    <div className="space-y-6">
      {/* Steps Tracker */}
      <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider">
          Verification Process
        </h3>
        <div className="space-y-4.5">
          {kyc.steps?.map((step) => {
            const isCompleted = step.status === "completed";
            return (
              <div key={step.step} className="flex items-center gap-3.5">
                <div className="flex items-center justify-center shrink-0">
                  {isCompleted ? (
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 border border-zinc-200 font-semibold text-xs">
                      {step.step}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-800 leading-none">
                    {step.title}
                  </p>
                  <p className="text-xs text-zinc-400 font-semibold capitalize mt-0.5">
                    {step.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guidelines Check */}
      <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider">
          Verification Guidelines
        </h3>
        <ul className="space-y-3">
          {kyc.guidelines?.map((item) => (
            <li key={item.key} className="flex items-start gap-2.5 text-xs text-zinc-600 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Provider & Developer Metadata */}
      <div className="bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-wider">
            Provider Logs
          </h3>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase">
            {kyc.provider} Integration
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <p className="text-zinc-400 font-semibold">Applicant ID</p>
            <p className="font-mono text-zinc-700 font-medium truncate select-all" title={kyc.providerData?.applicantId}>
              {kyc.providerData?.applicantId || "—"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-400 font-semibold">Document ID</p>
            <p className="font-mono text-zinc-700 font-medium truncate select-all" title={kyc.providerData?.documentId}>
              {kyc.providerData?.documentId || "—"}
            </p>
          </div>
          <div className="space-y-1 col-span-2 border-t border-zinc-100 pt-3">
            <p className="text-zinc-400 font-semibold">Check status / response</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-zinc-700 font-medium font-mono text-[11px]">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{kyc.providerData?.response?.check?.status || "—"}</span>
              <span className="text-[10px] text-zinc-400">({kyc.providerData?.response?.check?.note})</span>
            </div>
          </div>
        </div>

        {/* Collapsible raw json payload */}
        <div className="border-t border-zinc-100 pt-4 mt-2">
          <button
            onClick={() => setShowRawJson((prev) => !prev)}
            className="flex items-center justify-between w-full text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Terminal className="h-4 w-4" />
              <span>Inspect API Response Metadata</span>
            </div>
            {showRawJson ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showRawJson && (
            <div className="mt-3 bg-zinc-950 text-emerald-400 p-4 rounded-xl font-mono text-[10px] overflow-x-auto border border-zinc-800 shadow-inner max-h-[350px]">
              <pre>{JSON.stringify(kyc.providerData?.response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
