"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MonthlyDisbursements } from "@/types/dashboard";

interface MonthlyDisbursementsChartProps {
  data?: MonthlyDisbursements;
  isLoading?: boolean;
}

const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const formatTooltipValue = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function MonthlyDisbursementsChart({
  data,
  isLoading,
}: MonthlyDisbursementsChartProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[328px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 px-6 pt-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3.5 w-24 rounded-md" />
          </div>
          <Skeleton className="h-5 w-5 rounded-md" />
        </CardHeader>
        <CardContent className="px-6 pb-6 flex-1 flex flex-col justify-end">
          <div className="flex items-end gap-3 h-[180px] w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <Skeleton
                  className="w-full rounded-t-lg"
                  style={{ height: `${20 + idx * 25}px` }}
                />
                <Skeleton className="h-3 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = (data?.items || []).map((item) => ({
    month: item.label,
    value: parseFloat(item.amount) || 0,
    fullDisplay: item.fullAmountDisplay,
  }));

  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl bg-white h-[328px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 px-6 pt-6">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-bold text-zinc-900">
            {data?.title || "Monthly Disbursements"}
          </CardTitle>
          <CardDescription className="text-xs font-medium text-zinc-400">
            {data?.subtitle || "Last 6 months"}
          </CardDescription>
        </div>
        <BarChart3 className="h-4 w-4 text-zinc-300" />
      </CardHeader>
      <CardContent className="px-3 pb-4 flex-1">
        <div className="h-[240px] w-full text-xs">
          {chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-zinc-400 font-medium">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 15, left: -5, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDisbursements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9c1c1c" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#9c1c1c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f1f4"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  tickFormatter={formatYAxis}
                  dx={-4}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            {item.month}
                          </p>
                          <p className="mt-1 text-sm font-bold text-zinc-900">
                            {formatTooltipValue(item.value)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9c1c1c"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorDisbursements)"
                  activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#9c1c1c" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
