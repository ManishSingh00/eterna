"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/atoms/button";
import type { Token } from "@/lib/types";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatPercent } from "@/utils/formatters";
import TokenIndicators from "@/components/molecules/token-indicators";
import { ExternalLink } from "lucide-react";

type Props = {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TokenModal = ({ token, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      {token ? (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <DialogTitle>{token.name}</DialogTitle>
              <DialogDescription>{token.pair}</DialogDescription>
              <div className="mt-2 text-2xl font-semibold">
                {formatCurrency(token.price)}
              </div>
              <p className="text-sm text-pulse-text-muted">
                Change (24h): {formatPercent(token.priceChange24h)}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="md">
                <ExternalLink className="mr-2 h-4 w-4" />
                Explorer
              </Button>
              <Button size="md">Trade {token.symbol}</Button>
            </div>
          </div>
          <DialogClose asChild>
            <button
              aria-label="Close modal"
              className="absolute right-6 top-6 text-pulse-text-muted transition-colors hover:text-pulse-text"
            >
              ×
            </button>
          </DialogClose>
          <TokenIndicators token={token} />

          <div className="h-64 rounded-2xl bg-pulse-surfaceSoft p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={token.history.map((value, index) => ({ index, value }))}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E9BF0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1E9BF0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="index" hide />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <RechartsTooltip
                  contentStyle={{
                    background: "rgba(17,19,29,0.95)",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1E9BF0"
                  fillOpacity={1}
                  fill="url(#pulseGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}
    </DialogContent>
  </Dialog>
);

export default TokenModal;
