"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RATES = [
  { label: "Approved", value: 73, color: "bg-emerald-400" },
  { label: "Rejected", value: 19, color: "bg-rose-400" },
  { label: "Pending", value: 8, color: "bg-amber-400" },
];

export default function ApprovalRateCard() {
  return (
    <Card className="flex flex-col border-none bg-[#1e222b] text-white shadow-lg rounded-2xl">
      <CardHeader className="pb-2 px-6 pt-6">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Approval Rate
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-6 pb-6 pt-1">
        {/* Large Stat Display */}
        <div className="space-y-1">
          <p className="text-5xl font-extrabold tracking-tight text-white">
            73%
          </p>
          <p className="text-xs font-medium text-zinc-400">
            This month vs <span className="font-semibold text-zinc-300">68%</span> last month
          </p>
        </div>

        {/* Meters */}
        <div className="space-y-3 mt-2">
          {RATES.map((rate, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center gap-3 text-xs">
              <span className="col-span-3 font-semibold text-zinc-400 text-left">
                {rate.label}
              </span>
              <div className="col-span-7 h-1.5 w-full rounded-full bg-zinc-800">
                <div
                  className={`h-full rounded-full ${rate.color} transition-all duration-500`}
                  style={{ width: `${rate.value}%` }}
                />
              </div>
              <span className="col-span-2 text-right font-bold text-zinc-200">
                {rate.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
