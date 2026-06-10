import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-emerald-500/15 text-emerald-600",
        secondary: "bg-zinc-100 text-zinc-700",
        warning: "bg-amber-500/15 text-amber-700",
        destructive: "bg-rose-500/15 text-rose-600",
        info: "bg-sky-500/15 text-sky-600",
        muted: "bg-zinc-200/60 text-zinc-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
