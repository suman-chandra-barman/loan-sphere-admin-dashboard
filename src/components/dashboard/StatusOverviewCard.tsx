"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const STATUS_ITEMS = [
  { label: "Approved", value: 89, color: "bg-emerald-500" },
  { label: "Under Review", value: 23, color: "bg-amber-400" },
  { label: "Pending Docs", value: 15, color: "bg-amber-500" },
  { label: "Rejected", value: 28, color: "bg-rose-500" },
];

export default function StatusOverviewCard() {
  const maxVal = Math.max(...STATUS_ITEMS.map((i) => i.value));
  // Use maxVal or total to determine progress bar widths. Let's use maxVal to make bars span nicely
  // Or let's use the sum of values:
  const total = STATUS_ITEMS.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="flex flex-col border-zinc-200/60 shadow-sm rounded-2xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-sm font-bold text-zinc-800 uppercase tracking-wider">
          Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-6 pb-6 pt-2">
        <div className="space-y-4">
          {STATUS_ITEMS.map((item, idx) => {
            // Determine percentage relative to total
            const pct = (item.value / total) * 100;
            // Let's scale up slightly so it fills the screen more like the screenshot
            const barWidth = Math.max(5, pct * 1.5); // scaled up for visual balance

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-600">
                  <span>{item.label}</span>
                  <span className="text-zinc-800">{item.value}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100/80">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${Math.min(100, barWidth)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
