import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from ".";
import type { Token } from "@/lib/types";

export const selectTokensUi = (state: RootState) => state.tokens;

export const selectActiveCategory = (state: RootState) => state.tokens.activeCategory;

export const selectSortState = createSelector(selectTokensUi, (tokens) => ({
  field: tokens.sortField,
  direction: tokens.sortDirection,
}));

export const selectSelectedTokenId = (state: RootState) => state.tokens.selectedTokenId;

export const makeSelectSortedTokens = () =>
  createSelector(
    [
      (_: RootState, tokens: Token[]) => tokens,
      (state: RootState) => state.tokens.sortField,
      (state: RootState) => state.tokens.sortDirection,
      (state: RootState) => state.tokens.activeCategory,
    ],
    (tokens, sortField, direction, filter) =>
      tokens
        .filter((token) => token.category === filter)
        .sort((a, b) => {
          const delta = (a[sortField] as number) - (b[sortField] as number);
          return direction === "asc" ? delta : -delta;
        }),
  );
