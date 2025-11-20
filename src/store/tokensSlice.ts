import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SortDirection, TokenCategory, TokenSortField } from "@/lib/types";

export interface TokensUiState {
  activeCategory: TokenCategory;
  sortField: TokenSortField;
  sortDirection: SortDirection;
  selectedTokenId: string | null;
}

const initialState: TokensUiState = {
  activeCategory: "new_pairs",
  sortField: "liquidityUSD",
  sortDirection: "desc",
  selectedTokenId: null,
};

const tokensSlice = createSlice({
  name: "tokensUi",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<TokenCategory>) {
      state.activeCategory = action.payload;
    },
    setSortField(state, action: PayloadAction<TokenSortField>) {
      if (state.sortField === action.payload) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
        return;
      }

      state.sortField = action.payload;
      state.sortDirection = "desc";
    },
    setSelectedToken(state, action: PayloadAction<string | null>) {
      state.selectedTokenId = action.payload;
    },
  },
});

export const { setCategory, setSortField, setSelectedToken } = tokensSlice.actions;

export default tokensSlice.reducer;
