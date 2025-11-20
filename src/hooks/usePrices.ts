"use client";

import { useMemo } from "react";
import type { Token } from "@/lib/types";
import { useTokensQuery } from "@/queries/useTokensQuery";
import useWebsocketMock from "./useWebsocketMock";

const usePrices = (initialTokens?: Token[]) => {
  const query = useTokensQuery(initialTokens);
  const ws = useWebsocketMock();

  const hydratedTokens = useMemo(() => {
    if (!query.data) {
      return [];
    }

    return query.data.map((token) => {
      const liveUpdate = ws.latestPrices[token.pair];
      if (!liveUpdate) {
        return token;
      }

      return {
        ...token,
        price: liveUpdate.price,
        priceChange24h: Number((token.priceChange24h + liveUpdate.delta).toFixed(2)),
      };
    });
  }, [query.data, ws.latestPrices]);

  return {
    tokens: hydratedTokens,
    query,
    ws,
  };
};

export default usePrices;
