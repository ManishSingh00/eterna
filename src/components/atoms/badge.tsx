"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        success: "bg-pulse-success/15 text-pulse-success",
        danger: "bg-pulse-danger/15 text-pulse-danger",
        warning: "bg-pulse-warning/15 text-pulse-warning",
        info: "bg-pulse-accent/15 text-pulse-accent",
        subtle: "bg-white/5 text-pulse-text-muted",
      },
    },
    defaultVariants: {
      variant: "subtle",
    },
  },
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
  className?: string;
  children: React.ReactNode;
};

const Badge = ({ variant, className, children }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant, className }))}>{children}</span>
);

export { Badge, badgeVariants };
