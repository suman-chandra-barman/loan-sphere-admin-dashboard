"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export interface MonthlyRevenuePoint {
  month: string;
  revenue: string;
  year: string;
}

interface MonthlyRevenueChartProps {
  data: MonthlyRevenuePoint[];
}

export default function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  const chartData = data.map((d) => ({
    name: d.month,
    value: parseFloat(d.revenue),
  }));

  const firstYear = data[0]?.year;
  const lastYear = data[data.length - 1]?.year;
  const firstMonth = data[0]?.month;
  const lastMonth = data[data.length - 1]?.month;

  const rangeLabel =
    firstYear && lastYear
      ? firstYear === lastYear
        ? `${firstMonth} – ${lastMonth} ${firstYear}`
        : `${firstMonth} ${firstYear} – ${lastMonth} ${lastYear}`
      : "";

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Monthly Revenue</CardTitle>
          <p className="text-sm text-zinc-500">Last 6 months performance</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {rangeLabel}
        </span>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
            <XAxis dataKey="name" stroke="#a29b8f" fontSize={12} />
            <YAxis stroke="#a29b8f" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #f0ece6",
                borderRadius: "12px",
              }}
              formatter={(val: number) => [`$${val.toFixed(2)}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#c8a46b"
              strokeWidth={2}
              dot={{ r: 4, fill: "#c8a46b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
