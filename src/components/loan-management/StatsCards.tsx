import React from "react";
import { Card } from "@/components/ui/card";
import { SummaryCard } from "@/types/loan";

interface StatsCardsProps {
  summaryCards: SummaryCard[];
}

export default function StatsCards({ summaryCards }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {summaryCards.map((card) => (
        <Card
          key={card.key}
          className="flex flex-col gap-2 p-5 bg-white border border-zinc-200/70 shadow-xs"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              {card.title}
            </p>
            <p className="text-3xl font-extrabold text-zinc-900 mt-1">
              {card.value}
            </p>
          </div>
          <div className="text-xs font-semibold text-zinc-500 mt-auto">
            {card.subtitle}
          </div>
        </Card>
      ))}
    </div>
  );
}
