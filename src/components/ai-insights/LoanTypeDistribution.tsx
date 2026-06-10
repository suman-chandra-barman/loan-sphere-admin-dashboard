"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SectionCard } from "@/components/ui/section-card";

const DATA = [
  { name: "Home", value: 35, color: "#3b82f6" },
  { name: "Personal", value: 25, color: "#8b5cf6" },
  { name: "Vehicle", value: 20, color: "#10b981" },
  { name: "Business", value: 12, color: "#f59e0b" },
  { name: "Education", value: 5, color: "#06b6d4" },
  { name: "Debt Consol.", value: 3, color: "#ef4444" },
];

export default function LoanTypeDistribution() {
  return (
    <SectionCard title="Loan Type Distribution" className="w-full">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
        {/* Legend Table/List */}
        <div className="sm:col-span-6 space-y-2.5">
          {DATA.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-zinc-600">{item.name}</span>
              </div>
              <span className="font-bold text-zinc-900">{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="sm:col-span-6 relative flex h-[190px] w-full items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="transparent"
                    className="outline-none transition-all duration-300 hover:opacity-90"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {data.name}
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          {data.value}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-zinc-800">100%</span>
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
              Total
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
