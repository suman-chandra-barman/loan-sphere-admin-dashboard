"use client";

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SubscribersByPlan } from "@/types/dashboard";

const COLORS = ["#d8b78a", "#c39b63", "#ead7b7", "#b87d4b", "#f5e3c6"];

interface PlanDistributionChartProps {
  data: SubscribersByPlan[];
}

export default function PlanDistributionChart({
  data,
}: PlanDistributionChartProps) {
  const chartData = data.map((plan, i) => ({
    name: plan.plan_name,
    value: plan.count,
    percentage: parseFloat(plan.percentage),
    color: COLORS[i % COLORS.length],
  }));

  const total = data.reduce((acc, p) => acc + p.count, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Subscribers by Plan</CardTitle>
        <p className="text-sm text-zinc-500">Current distribution</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-2">
        <div className="relative h-[210px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #f0ece6",
                  borderRadius: "12px",
                }}
                formatter={(val: number, name: string) => [
                  `${val} subscriber${val !== 1 ? "s" : ""}`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* centre label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-zinc-800">{total}</span>
            <span className="text-xs text-zinc-500">total</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-zinc-600"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </div>
              <span className="text-zinc-500">
                {item.value}{" "}
                <span className="text-zinc-400">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
