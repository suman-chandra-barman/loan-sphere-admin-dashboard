"use client";

import { Brain } from "lucide-react";
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

const DATA = [
  { name: "Approve", value: 112, color: "#10b981", percent: "45%" },
  { name: "Review", value: 87, color: "#f59e0b", percent: "35%" },
  { name: "Reject", value: 48, color: "#ef4444", percent: "20%" },
];

export default function RiskScoreDistribution() {
  return (
    <SectionCard
      title="Risk Score Distribution"
      icon={Brain}
      className="w-full"
    >
      <div className="flex flex-col gap-6">
        {/* Bar Chart */}
        <div className="h-[240px] w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DATA}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
              barSize={40}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f1f4"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                domain={[0, 120]}
                ticks={[0, 30, 60, 90, 120]}
                dx={-4}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          {item.value} applications ({item.percent})
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {DATA.map((entry, index) => (
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

        {/* Details section */}
        <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 pt-5 text-center">
          {DATA.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-2xl font-bold text-zinc-900">{item.value}</p>
              <p className="text-xs font-medium text-zinc-400">
                {item.name} ({item.percent})
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
