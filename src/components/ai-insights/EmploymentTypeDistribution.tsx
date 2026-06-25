"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SectionCard } from "@/components/ui/section-card";
import type { EmploymentTypeDistributionItem } from "@/types/aiInsights";

interface EmploymentTypeDistributionProps {
  title?: string;
  items?: EmploymentTypeDistributionItem[];
}

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#06b6d4", "#ef4444"];

export default function EmploymentTypeDistribution({
  title = "Employment Type Distribution",
  items = [],
}: EmploymentTypeDistributionProps) {
  // Map data with colors
  const chartData = items.map((item, idx) => ({
    name: item.label,
    value: item.value,
    percentDisplay: item.percentDisplay,
    color: COLORS[idx % COLORS.length],
  }));

  return (
    <SectionCard title={title} className="w-full">
      <div className="flex flex-col gap-6">
        {/* Horizontal Bar Chart */}
        <div className="h-[190px] w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
              barSize={16}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f1f1f4"
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(val) => `${val}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                dy={6}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                dx={-6}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.01)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          {item.percentDisplay} of portfolio
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-90"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown details (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-zinc-100 pt-5">
          {chartData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-zinc-600">{item.name}</span>
              </div>
              <span className="font-bold text-zinc-900">{item.percentDisplay}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
