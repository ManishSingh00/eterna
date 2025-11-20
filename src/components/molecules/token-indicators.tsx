"use client";

import { Badge } from "@/components/atoms/badge";
import type { Token } from "@/lib/types";

type Props = {
  token: Token;
};

const TokenIndicators = ({ token }: Props) => (
  <div className="flex flex-wrap gap-2">
    {token.indicators.trending ? <Badge variant="info">Trending</Badge> : null}
    {token.indicators.hot ? <Badge variant="danger">Hot</Badge> : null}
    <Badge
      variant={
        token.indicators.risk === "low"
          ? "success"
          : token.indicators.risk === "medium"
            ? "warning"
            : "danger"
      }
    >
      {token.indicators.risk} risk
    </Badge>
  </div>
);

export default TokenIndicators;
