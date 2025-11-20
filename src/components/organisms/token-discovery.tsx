"use client";

import Card from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenTable from "./token-table";
import TokenModal from "./token-modal";
import { CATEGORY_TABS } from "@/lib/design-tokens";
import type { Token } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectActiveCategory, selectSelectedTokenId } from "@/store/selectors";
import { setCategory, setSelectedToken } from "@/store/tokensSlice";
import usePrices from "@/hooks/usePrices";
import { useEffect, useMemo, useState } from "react";
import { makeSelectSortedTokens } from "@/store/selectors";
import { Badge } from "@/components/atoms/badge";
import { Sparkles, RefreshCcw, WifiOff, Wifi } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { cn } from "@/utils/cn";

type Props = {
  initialTokens: Token[];
};

const TokenDiscovery = ({ initialTokens }: Props) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectActiveCategory);
  const selectedTokenId = useAppSelector(selectSelectedTokenId);
  const { tokens, query, ws } = usePrices(initialTokens);
  const [visibleCount, setVisibleCount] = useState(20);
  const [modalToken, setModalToken] = useState<Token | null>(null);
  const selectSortedTokens = useMemo(() => makeSelectSortedTokens(), []);

  const sortedTokens = useAppSelector((state) => selectSortedTokens(state, tokens));

  useEffect(() => {
    if (!tokens.length) return;
    setVisibleCount(20);
    const interval = window.setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= sortedTokens.length) {
          window.clearInterval(interval);
          return prev;
        }
        return prev + 20;
      });
    }, 260);

    return () => window.clearInterval(interval);
  }, [tokens.length, sortedTokens.length]);

  useEffect(() => {
    if (!selectedTokenId) return;
    const current = sortedTokens.find((token) => token.id === selectedTokenId);
    if (current) {
      setModalToken(current);
    }
  }, [selectedTokenId, sortedTokens]);

  const tokensToRender = sortedTokens.slice(0, visibleCount);
  const anchorPair = sortedTokens[0]?.pair;
  const lastTick = anchorPair ? ws.latestPrices[anchorPair]?.ts : undefined;

  const onSelectRow = (token: Token) => {
    dispatch(setSelectedToken(token.id));
    setModalToken(token);
  };

  const wsHealthy = ws.status === "open" && !ws.error;

  return (
    <TooltipProvider delayDuration={150}>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pulse-text-muted">
              Axiom Pulse
            </p>
            <h1 className="text-3xl font-semibold text-pulse-text">
              Token discovery radar
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-pulse-text-muted">
              Live order-flow, curated signals, and institutional-grade liquidity metrics
              rendered within 2px of the reference system.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant={wsHealthy ? "success" : "warning"}
                  className="flex items-center gap-2"
                >
                  {wsHealthy ? (
                    <Wifi className="h-4 w-4" />
                  ) : (
                    <WifiOff className="h-4 w-4" />
                  )}
                  {wsHealthy ? "Live feed" : "Reconnecting"}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {wsHealthy
                  ? "Streaming simulated ticks every 250-2000ms."
                  : (ws.error ?? "Attempting to reconnect to mock WebSocket server.")}
              </TooltipContent>
            </Tooltip>
            <Button
              variant="ghost"
              onClick={() => query.refetch()}
              aria-label="Refresh data"
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Smart alerts
            </Button>
          </div>
        </div>

        <Tabs
          value={category}
          onValueChange={(value) => dispatch(setCategory(value as typeof category))}
        >
          <TabsList className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex !flex-col items-start rounded-3xl px-5 py-3 text-left"
              >
                <span className="text-sm font-semibold">{tab.label}</span>
                <span className="text-xs text-pulse-text-muted">{tab.description}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={category}>
            <Card className="space-y-8 border-transparent bg-pulse-surface/70 p-6 backdrop-blur-xl">
              {query.isError ? (
                <div className="rounded-3xl border border-pulse-danger/60 bg-pulse-danger/10 p-6 text-sm text-pulse-danger">
                  {query.error instanceof Error
                    ? query.error.message
                    : "Unable to reach data source."}
                </div>
              ) : null}

              <TokenTable
                tokens={tokensToRender}
                isLoading={query.isLoading}
                onSelect={onSelectRow}
                selectedId={selectedTokenId}
              />

              <div className="flex items-center justify-between text-xs text-pulse-text-muted">
                <span>
                  Showing {tokensToRender.length} of {sortedTokens.length} tokens
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      wsHealthy ? "bg-pulse-success" : "bg-pulse-warning",
                    )}
                  />
                  Last tick {lastTick ? new Date(lastTick).toLocaleTimeString() : "—"}
                </span>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <TokenModal
          token={modalToken}
          open={Boolean(modalToken)}
          onOpenChange={(next) => {
            if (!next) {
              setModalToken(null);
              dispatch(setSelectedToken(null));
            }
          }}
        />
      </section>
    </TooltipProvider>
  );
};

export default TokenDiscovery;
