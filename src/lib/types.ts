export type TokenCategory = "new_pairs" | "final_stretch" | "migrated";

export type SortDirection = "asc" | "desc";

export type TokenSortField =
  | "name"
  | "price"
  | "priceChange24h"
  | "liquidityUSD"
  | "ageDays";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  pair: string;
  price: number;
  priceChange24h: number;
  liquidityUSD: number;
  ageDays: number;
  category: TokenCategory;
  logoUrl: string;
  chain: string;
  indicators: {
    trending: boolean;
    hot: boolean;
    risk: "low" | "medium" | "high";
  };
  history: number[];
}

export type TokenResponse = {
  tokens: Token[];
};

export interface PriceUpdatePayload {
  type: "price_update";
  symbol: string;
  price: number;
  delta: number;
  ts: number;
}
