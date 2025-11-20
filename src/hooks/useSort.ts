"use client";

import { useCallback } from "react";
import type { TokenSortField } from "@/lib/types";
import { setSortField } from "@/store/tokensSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSortState } from "@/store/selectors";

const useSort = () => {
  const dispatch = useAppDispatch();
  const { field, direction } = useAppSelector(selectSortState);

  const onToggleSort = useCallback(
    (nextField: TokenSortField) => {
      dispatch(setSortField(nextField));
    },
    [dispatch],
  );

  return { field, direction, onToggleSort };
};

export default useSort;
