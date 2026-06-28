import React from "react";
import { ArrowRight, FileText, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ManagementCard } from "@/types/loan";

const iconMap: Record<string, React.ReactNode> = {
  loanTypes: <FileText className="h-6 w-6" />,
  loanTemplates: <Layers className="h-6 w-6" />,
};

const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
  loanTypes: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    hover: "group-hover:bg-rose-100/80",
  },
  loanTemplates: {
    bg: "bg-zinc-100",
    text: "text-zinc-600",
    hover: "group-hover:bg-zinc-200/80",
  },
};

interface NavSectionCardsProps {
  managementCards: ManagementCard[];
  onNavigate: (key: string) => void;
}

export default function NavSectionCards({
  managementCards,
  onNavigate,
}: NavSectionCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {managementCards.map((card) => {
        const colors = colorMap[card.key] ?? {
          bg: "bg-zinc-100",
          text: "text-zinc-600",
          hover: "group-hover:bg-zinc-200/80",
        };

        return (
          <Card
            key={card.key}
            onClick={() => onNavigate(card.key)}
            className="group relative flex flex-col p-6 bg-white border border-zinc-200/70 shadow-xs cursor-pointer hover:border-zinc-300 transition-all duration-200"
          >
            <div className="absolute top-6 right-6">
              <ArrowRight className="h-5 w-5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center h-12 w-12 rounded-xl transition-colors ${colors.bg} ${colors.text} ${colors.hover}`}
              >
                {iconMap[card.key] ?? <FileText className="h-6 w-6" />}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-bold text-zinc-900">{card.title}</h3>
              <p className="text-sm text-zinc-500 mt-1">{card.description}</p>
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-4">
              <p className="text-xs font-semibold text-zinc-400">{card.metricTitle}</p>
              <p className="text-2xl font-extrabold text-zinc-900 mt-0.5">
                {card.metricValue}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
