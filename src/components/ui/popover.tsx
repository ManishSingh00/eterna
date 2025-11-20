"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
  className,
  align = "end",
  sideOffset = 10,
  ...props
}: PopoverPrimitive.PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-40 min-w-[220px] rounded-2xl border border-pulse-border bg-pulse-surface p-4 text-sm shadow-xl focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

export { Popover, PopoverTrigger, PopoverContent };
