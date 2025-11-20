"use client";

import { useEffect, useRef, useState } from "react";
import type { PriceUpdatePayload } from "@/lib/types";

const HISTORY_POINTS = 12;

export interface UseWebsocketMockResult {
  latestPrices: Record<string, PriceUpdatePayload>;
  history: Record<string, number[]>;
  status: "connecting" | "open" | "closed";
  error?: string;
}

const defaultState: UseWebsocketMockResult = {
  latestPrices: {},
  history: {},
  status: "connecting",
};

const useWebsocketMock = (): UseWebsocketMockResult => {
  const [state, setState] = useState<UseWebsocketMockResult>(defaultState);
  const reconnectAttempts = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    let socket: WebSocket | null = null;
    let cancelled = false;

    const connect = () => {
      const url = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000";
      socket = new WebSocket(url);
      setState((prev) => ({ ...prev, status: "connecting", error: undefined }));

      socket.onopen = () => {
        reconnectAttempts.current = 0;
        setState((prev) => ({ ...prev, status: "open", error: undefined }));
      };

      socket.onmessage = (event) => {
        if (typeof event.data !== "string") return;
        try {
          const payload = JSON.parse(event.data) as PriceUpdatePayload;
          if (payload.type !== "price_update") return;
          setState((prev) => {
            const historyBuffer = prev.history[payload.symbol] ?? [];
            const nextHistory = [...historyBuffer, payload.price].slice(-HISTORY_POINTS);

            return {
              latestPrices: {
                ...prev.latestPrices,
                [payload.symbol]: payload,
              },
              history: {
                ...prev.history,
                [payload.symbol]: nextHistory,
              },
              status: prev.status,
              error: undefined,
            };
          });
        } catch (err) {
          console.error("WS payload parse failed", err);
        }
      };

      socket.onerror = () => {
        setState((prev) => ({ ...prev, error: "Live updates unavailable" }));
      };

      socket.onclose = () => {
        if (cancelled) return;
        setState((prev) => ({ ...prev, status: "closed" }));
        reconnectAttempts.current += 1;
        const timeout = Math.min(10_000, 500 * 2 ** reconnectAttempts.current);
        window.setTimeout(connect, timeout);
      };
    };

    connect();

    return () => {
      cancelled = true;
      socket?.close();
    };
  }, []);

  return state;
};

export default useWebsocketMock;
