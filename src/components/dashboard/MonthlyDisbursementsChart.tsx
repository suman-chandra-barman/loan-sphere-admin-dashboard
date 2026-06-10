"use client";

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

const DATA = [
  { month: "Oct", value: 1.25 },
  { month: "Nov", value: 0.95 },
  { month: "Dec", value: 1.50 },
  { month: "Jan", value: 2.10 },
  { month: "Feb", value: 1.85 },
  { month: "Mar", value: 2.40 },
];

export default function MonthlyDisbursementsChart() {
  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 px-6 pt-6">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-bold text-zinc-900">
            Monthly Disbursements
          </CardTitle>
          <CardDescription className="text-xs font-medium text-zinc-400">
            Last 6 months
          </CardDescription>
        </div>
        <BarChart3 className="h-4 w-4 text-zinc-300" />
      </CardHeader>
      <CardContent className="px-3 pb-4 flex-1">
        <div className="h-[240px] w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={DATA}
              margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
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
                domain={[0, 2.4]}
                ticks={[0.0, 0.6, 1.2, 1.8, 2.4]}
                tickFormatter={(val) => `$${val.toFixed(1)}M`}
                dx={-4}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                          {payload[0].payload.month}
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-900">
                          ${Number(payload[0].value).toFixed(2)}M
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
        </div>
      </CardContent>
    </Card>
  );
}
