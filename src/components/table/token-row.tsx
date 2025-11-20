"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock4, Link2 } from "lucide-react";
import type { Token } from "@/lib/types";
import TokenIndicators from "@/components/molecules/token-indicators";
import TokenActions from "@/components/molecules/token-actions";
import {
  formatAge,
  formatCurrency,
  formatLiquidity,
  formatPercent,
  trendClass,
} from "@/utils/formatters";
import { cn } from "@/utils/cn";

type Props = {
  token: Token;
  onSelect: (token: Token) => void;
  isActive: boolean;
};

const TokenRow = ({ token, onSelect, isActive }: Props) => {
  const changeClass = trendClass(token.priceChange24h);

  return (
    <div
      role="row"
      tabIndex={0}
      onClick={() => onSelect(token)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(token);
        }
      }}
      className={cn(
        "group grid cursor-pointer grid-cols-[minmax(220px,2fr)_repeat(4,minmax(110px,1fr))_80px] items-center gap-3 rounded-2xl border border-transparent px-4 py-3 transition-all hover:border-pulse-accent/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse-accent",
        isActive ? "border-pulse-accent/60 bg-white/5" : "",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-pulse-border bg-pulse-surfaceSoft">
          <Image
            src={token.logoUrl}
            alt={`${token.name} logo`}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-pulse-text">{token.name}</p>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-pulse-text-muted">
              {token.chain}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-pulse-text-muted">
            <Link2 className="h-3.5 w-3.5" />
            <span>{token.pair}</span>
          </div>
          <TokenIndicators token={token} />
        </div>
      </div>

      <div className="text-right text-sm font-semibold text-pulse-text">
        <motion.span
          key={`${token.pair}-${token.price}`}
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{
            backgroundColor:
              token.priceChange24h >= 0
                ? "rgba(50,213,131,0.08)"
                : "rgba(249,112,102,0.08)",
          }}
          transition={{ duration: 0.8 }}
          className="rounded-md px-2 py-1"
        >
          {formatCurrency(token.price)}
        </motion.span>
      </div>

      <p className={cn("text-right text-sm font-semibold", changeClass)}>
        {formatPercent(token.priceChange24h)}
      </p>

      <p className="text-right text-sm font-semibold text-pulse-text">
        {formatLiquidity(token.liquidityUSD)}
      </p>

      <div className="flex items-center justify-end gap-2 text-sm text-pulse-text-muted">
        <Clock4 className="h-4 w-4" />
        <span>{formatAge(token.ageDays)}</span>
      </div>

      <div className="flex items-center justify-end gap-2">
        <TokenActions token={token} />
        <ArrowUpRight className="h-4 w-4 text-pulse-text-muted" />
      </div>
    </div>
  );
};

export default TokenRow;
