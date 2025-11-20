"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({
  className,
  ...props
}: TooltipPrimitive.TooltipContentProps) => (
  <TooltipPrimitive.Content
    sideOffset={8}
    className={cn(
      "rounded-xl border border-pulse-border bg-pulse-surface px-3 py-2 text-xs text-pulse-text shadow-lg",
      className,
    )}
    {...props}
  />
);

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
