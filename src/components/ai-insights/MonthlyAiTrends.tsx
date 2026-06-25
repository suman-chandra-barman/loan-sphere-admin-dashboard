"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SectionCard } from "@/components/ui/section-card";
import type { MonthlyAssessmentTrendItem } from "@/types/aiInsights";

interface MonthlyAiTrendsProps {
  title?: string;
  subtitle?: string;
  items?: MonthlyAssessmentTrendItem[];
}

export default function MonthlyAiTrends({
  title = "Monthly AI Assessment Trends",
  items = [],
}: MonthlyAiTrendsProps) {
  // Find max value in lines to set YAxis domain boundary
  const maxVal = Math.max(
    ...items.map((i) => Math.max(i.approve, i.review, i.reject)),
    5
  );
  const yAxisMax = Math.ceil(maxVal * 1.15);

  return (
    <SectionCard
      title={title}
      icon={TrendingUp}
      className="w-full"
    >
      <div className="flex flex-col gap-4">
        {/* Line Chart */}
        <div className="h-[240px] w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={items}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
            >
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
                domain={[0, yAxisMax]}
                allowDecimals={false}
                dx={-4}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {payload[0].payload.label || payload[0].payload.month}
                        </p>
                        {payload.map((p, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-medium">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: p.color }}
                            />
                            <span className="text-zinc-600 capitalize">{p.name}:</span>
                            <span className="font-bold text-zinc-900">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="approve"
                name="approve"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4, stroke: "#10b981", strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2, fill: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="review"
                name="review"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 4, stroke: "#f59e0b", strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2, fill: "#f59e0b" }}
              />
              <Line
                type="monotone"
                dataKey="reject"
                name="reject"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 4, stroke: "#ef4444", strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2, fill: "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
            <span className="h-1.5 w-4 rounded-full bg-[#10b981]" />
            <span>Approve</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
            <span className="h-1.5 w-4 rounded-full bg-[#f59e0b]" />
            <span>Review</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
            <span className="h-1.5 w-4 rounded-full bg-[#ef4444]" />
            <span>Reject</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
