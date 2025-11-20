"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/tooltip";
import { TABLE_COLUMNS } from "@/lib/design-tokens";
import useSort from "@/hooks/useSort";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";

const TableHead = () => {
  const { field, direction, onToggleSort } = useSort();

  return (
    <div
      role="row"
      className="grid grid-cols-[minmax(220px,2fr)_repeat(4,minmax(110px,1fr))_80px] items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs uppercase tracking-widest text-pulse-text-muted"
    >
      {TABLE_COLUMNS.map((column) => {
        const { key, label, tooltip, isNumeric } = column;
        const isSortable = key !== "actions";
        const isActive = field === key;

        const handleClick = () => {
          if (!isSortable) return;
          onToggleSort(key);
        };

        return (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleClick}
                className={cn(
                  "flex items-center gap-2 text-left transition-colors",
                  isNumeric ? "justify-end" : "",
                  isSortable ? "hover:text-pulse-text" : "cursor-default",
                  isActive ? "text-pulse-text" : "",
                )}
                aria-label={
                  isSortable
                    ? `Sort by ${label} (${direction === "asc" ? "ascending" : "descending"})`
                    : label
                }
              >
                <span>{label}</span>
                {isSortable ? (
                  direction === "asc" && isActive ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : direction === "desc" && isActive ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3 opacity-30" />
                  )
                ) : null}
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default TableHead;
