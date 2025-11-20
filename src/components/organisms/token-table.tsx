"use client";

import { useRef } from "react";
import type { Token } from "@/lib/types";
import TokenRow from "@/components/table/token-row";
import TableHead from "@/components/table/table-head";
import TableSkeleton from "@/components/table/table-skeleton";
import { useVirtualizer } from "@tanstack/react-virtual";

type Props = {
  tokens: Token[];
  isLoading: boolean;
  onSelect: (token: Token) => void;
  selectedId?: string | null;
};

const ESTIMATED_ROW_HEIGHT = 120;

const TokenTable = ({ tokens, isLoading, onSelect, selectedId }: Props) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 8,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TableHead />
        <TableSkeleton />
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div className="rounded-3xl border border-dashed border-pulse-border/60 p-12 text-center text-sm text-pulse-text-muted">
        No tokens match the current filters. Try another tab or reset your sorting.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableHead />
      <div
        ref={parentRef}
        className="no-scrollbar relative max-h-[70vh] overflow-auto"
        role="table"
        aria-label="Token discovery table"
      >
        <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const token = tokens[virtualRow.index];
            if (!token) return null;

            return (
              <div
                key={token.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TokenRow
                  token={token}
                  onSelect={onSelect}
                  isActive={selectedId === token.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
