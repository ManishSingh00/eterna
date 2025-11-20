import { useQuery } from "@tanstack/react-query";
import type { Token } from "@/lib/types";

export const TOKENS_QUERY_KEY = ["tokens"] as const;

const fetchTokens = async (): Promise<Token[]> => {
  const response = await fetch("/api/tokens", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load tokens");
  }

  const data = (await response.json()) as { tokens: Token[] };
  return data.tokens;
};

export const useTokensQuery = (initialData?: Token[]) =>
  useQuery({
    queryKey: TOKENS_QUERY_KEY,
    queryFn: fetchTokens,
    initialData,
  });
