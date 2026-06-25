import React from "react";
import { Card } from "@/components/ui/card";

function Shimmer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-100 ${className ?? ""}`}
      style={style}
    />
  );
}

// 1. Stats Row Skeleton (4 cards)
export function AiInsightsStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card
          key={idx}
          className="p-5 border border-zinc-200/60 shadow-xs rounded-2xl space-y-4"
        >
          <Shimmer className="h-11 w-11 rounded-xl" />
          <div className="space-y-2">
            <Shimmer className="h-8 w-24" />
            <Shimmer className="h-3 w-32" />
          </div>
        </Card>
      ))}
    </div>
  );
}

// 2. Bar Chart Skeleton (Risk score distribution)
export function RiskScoreDistributionSkeleton() {
  return (
    <Card className="p-6 border border-zinc-200/60 shadow-xs rounded-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Shimmer className="h-5 w-5 rounded-full" />
        <Shimmer className="h-5 w-48" />
      </div>
      
      {/* Recharts chart placeholder */}
      <div className="h-[240px] flex items-end justify-around border-b border-zinc-100 pb-3">
        <Shimmer className="h-[40%] w-10 rounded-t-lg" />
        <Shimmer className="h-[75%] w-10 rounded-t-lg" />
        <Shimmer className="h-[20%] w-10 rounded-t-lg" />
      </div>

      {/* Details breakdown placeholders */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1.5 flex flex-col items-center">
            <Shimmer className="h-6 w-12" />
            <Shimmer className="h-3 w-16" />
          </div>
        ))}
      </div>
    </Card>
  );
}

// 3. Line Chart Skeleton (Monthly AI trends)
export function MonthlyAiTrendsSkeleton() {
  return (
    <Card className="p-6 border border-zinc-200/60 shadow-xs rounded-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Shimmer className="h-5 w-5 rounded-full" />
        <Shimmer className="h-5 w-56" />
      </div>

      {/* Chart line trace placeholder */}
      <div className="h-[240px] flex items-center justify-center bg-zinc-50/50 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-t border-zinc-100 w-full" />
          ))}
        </div>
        <Shimmer className="h-2 w-[85%] rounded-full opacity-60" />
      </div>

      {/* Custom Legend placeholder */}
      <div className="flex items-center justify-center gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Shimmer className="h-1.5 w-4 rounded-full" />
            <Shimmer className="h-3.5 w-14" />
          </div>
        ))}
      </div>
    </Card>
  );
}

// 4. Donut Chart Skeleton (Loan Type Distribution)
export function LoanTypeDistributionSkeleton() {
  return (
    <Card className="p-6 border border-zinc-200/60 shadow-xs rounded-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Shimmer className="h-5 w-44" />
      </div>

      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
        {/* Legend table skeleton */}
        <div className="sm:col-span-6 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shimmer className="h-2.5 w-2.5 rounded-full" />
                <Shimmer className="h-3.5 w-24" />
              </div>
              <Shimmer className="h-3.5 w-10" />
            </div>
          ))}
        </div>

        {/* Donut representation skeleton */}
        <div className="sm:col-span-6 flex items-center justify-center">
          <div className="h-[170px] w-[170px] rounded-full border-[18px] border-zinc-100 flex flex-col items-center justify-center relative bg-white">
            <Shimmer className="h-5 w-12" />
            <Shimmer className="h-3 w-8 mt-1" />
          </div>
        </div>
      </div>
    </Card>
  );
}

// 5. Horizontal Bar Skeleton (Employment Type Distribution)
export function EmploymentTypeDistributionSkeleton() {
  return (
    <Card className="p-6 border border-zinc-200/60 shadow-xs rounded-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Shimmer className="h-5 w-52" />
      </div>

      <div className="space-y-6">
        {/* Chart representation */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Shimmer className="h-3.5 w-20" />
              <Shimmer className="h-4 flex-1 rounded-r-lg" style={{ maxWidth: i === 0 ? "70%" : i === 1 ? "40%" : "20%" }} />
            </div>
          ))}
        </div>

        {/* 2x2 Grid Breakdown metrics */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-zinc-100 pt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shimmer className="h-2.5 w-2.5 rounded-full" />
                <Shimmer className="h-3.5 w-20" />
              </div>
              <Shimmer className="h-3.5 w-8" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// 6. Recent Reports Table Skeleton
export function RecentAiReportsSkeleton() {
  return (
    <Card className="p-6 border border-zinc-200/60 shadow-xs rounded-2xl space-y-6 overflow-hidden">
      <div className="flex items-center gap-3">
        <Shimmer className="h-5 w-5 rounded-full" />
        <Shimmer className="h-5 w-40" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i} className="pb-3 text-left">
                  <Shimmer className="h-3.5 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, rIdx) => (
              <tr key={rIdx} className="border-b border-zinc-100 last:border-0">
                <td className="py-4"><Shimmer className="h-4 w-24" /></td>
                <td className="py-4"><Shimmer className="h-4 w-32" /></td>
                <td className="py-4 flex items-center gap-2"><Shimmer className="h-1.5 w-16" /><Shimmer className="h-3.5 w-6" /></td>
                <td className="py-4"><Shimmer className="h-5 w-16 rounded-md" /></td>
                <td className="py-4"><Shimmer className="h-3.5 w-56" /></td>
                <td className="py-4"><Shimmer className="h-3.5 w-20" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
