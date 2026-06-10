import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";

export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  headerAction?: React.ReactNode;
}

const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
  ({ className, title, description, icon: Icon, headerAction, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("flex flex-col border-zinc-200/60 shadow-sm rounded-2xl", className)} {...props}>
        {(title || description || headerAction) && (
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 px-6 pt-6">
            <div className="space-y-1">
              {title && (
                <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  {Icon && <Icon className="h-4.5 w-4.5 text-zinc-400" />}
                  {title}
                </CardTitle>
              )}
              {description && (
                <CardDescription className="text-xs font-medium text-zinc-400">
                  {description}
                </CardDescription>
              )}
            </div>
            {headerAction && <div className="shrink-0">{headerAction}</div>}
          </CardHeader>
        )}
        <CardContent className="flex-1 px-6 pb-6 pt-2">
          {children}
        </CardContent>
      </Card>
    );
  }
);
SectionCard.displayName = "SectionCard";

export { SectionCard };
