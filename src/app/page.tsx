import TokenDiscovery from "@/components/organisms/token-discovery";
import { getTokens } from "@/lib/token-data";
import { TOKENS_QUERY_KEY } from "@/queries/useTokensQuery";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const tokens = await getTokens();
  const queryClient = new QueryClient();
  queryClient.setQueryData(TOKENS_QUERY_KEY, tokens);

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-8 px-4 pb-16 pt-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TokenDiscovery initialTokens={tokens} />
      </HydrationBoundary>
    </main>
  );
}
