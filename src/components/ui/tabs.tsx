"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/cn";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-full bg-pulse-surfaceSoft/60 p-1 text-sm text-pulse-text",
      className,
    )}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex flex-1 items-center justify-center gap-1 rounded-full px-6 py-2 font-medium transition-all data-[state=active]:bg-pulse-surface data-[state=active]:text-pulse-text data-[state=active]:shadow-pulse/30 data-[state=active]:shadow-glow data-[state=active]:text-shadow",
      className,
    )}
    {...props}
  />
);

const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content
    className={cn("mt-6 focus-visible:outline-none", className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
