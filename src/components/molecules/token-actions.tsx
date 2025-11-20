"use client";

import { Button } from "@/components/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Token } from "@/lib/types";
import { BarChart3, ExternalLink, Pin, Share2 } from "lucide-react";

type Props = {
  token: Token;
};

const actions = [
  { icon: BarChart3, label: "Open analytics" },
  { icon: Pin, label: "Pin to Pulse" },
  { icon: Share2, label: "Share insights" },
  { icon: ExternalLink, label: "Trade now" },
];

const TokenActions = ({ token }: Props) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        aria-label={`More actions for ${token.name}`}
        size="icon"
        variant="ghost"
        className="border border-transparent hover:border-pulse-accent/40"
      >
        <span className="sr-only">Open actions</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" className="w-56 space-y-3">
      {actions.map(({ icon: Icon, label }) => (
        <button
          type="button"
          key={label}
          className="flex w-full items-center gap-3 rounded-2xl border border-transparent px-2 py-1.5 text-left text-sm text-pulse-text hover:border-pulse-accent/30 hover:bg-pulse-surfaceSoft/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse-accent"
        >
          <Icon className="h-4 w-4 text-pulse-text-muted" />
          <span>{label}</span>
        </button>
      ))}
    </PopoverContent>
  </Popover>
);

export default TokenActions;
