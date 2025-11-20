## DEV NOTES

### System Diagram

1. **Mock data** → `scripts/generate-mock-data.ts` (seeded) → `src/data/tokens.json`
2. **API route** → `app/api/tokens/route.ts` returns dataset for React Query
3. **Redux Toolkit** (`tokensSlice`) stores UI-only state: active tab, sorting, selected token
4. **React Query** (`useTokensQuery`) hydrates data; `usePrices` combines query data + WS updates
5. **Mock WebSocket** (`scripts/mock-ws-server.js`) streams ticks; `useWebsocketMock` manages connection state, history, exponential backoff
6. **Components** follow atomic architecture:
   - Atoms: shadcn-style button/badge, tooltip, skeleton
   - Molecules: indicators, action popover
   - Organisms: virtualized table, modal, discovery shell

### Performance Considerations

- SSR + Hydration via `HydrationBoundary` to avoid waterfalls.
- `@tanstack/react-virtual` keeps scroll interactions <100 ms even with 1k rows.
- Progressive reveal (20-row batches) mimics streaming hydration and keeps perceived performance high.
- Memoized selectors (via `makeSelectSortedTokens`) prevent redundant sorting.
- WebSocket hook keeps per-symbol history capped to 12 points to avoid memory bloat.
- Animations rely on GPU-friendly transforms and Framer Motion color fades.

### Testing Strategy

- **Unit**: format helpers + `useSort` state transitions.
- **E2E**: Playwright ensures sorting, popover, modal, and closing interactions.
- **Visual**: Snapshot suite across 5 breakpoints with ≤0.5 % diff tolerance (baselines stored under `design/snapshots`).
- **Lighthouse**: `lighthouserc.json` enforces ≥0.90 scores.

### Known Gaps / TODOs

- Baseline PNGs are placeholders—run `npm run snapshots:baseline` after first full render to overwrite with true captures.
- The mock WebSocket server is single-process; for multi-user/demo deployments, consider serverless WS infra or SSE.
- Chart history currently reuses deterministic dataset + short-lived WS buffer; plugging into a real-time backend would warrant a normalized time-series store.
