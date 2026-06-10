"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const DATA = [
  { name: "Home", value: 35, color: "#3b82f6" },
  { name: "Personal", value: 25, color: "#8b5cf6" },
  { name: "Vehicle", value: 20, color: "#10b981" },
  { name: "Business", value: 12, color: "#f59e0b" },
  { name: "Education", value: 5, color: "#06b6d4" },
  { name: "Debt Consol.", value: 3, color: "#e11d48" },
];

export default function LoanTypeDistributionChart() {
  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-base font-bold text-zinc-900">
          Loan Type Distribution
        </CardTitle>
        <CardDescription className="text-xs font-medium text-zinc-400">
          Portfolio breakdown
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-2">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
          {/* Legend Table/List */}
          <div className="space-y-2.5">
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
          <div className="relative flex h-[190px] w-full items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
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
            {/* Center Text (Total Label or Icon) */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-zinc-800">100%</span>
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Total
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
