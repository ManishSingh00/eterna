import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-3xl border border-pulse-border bg-gradient-to-br from-pulse-surface to-pulse-surfaceSoft/80 p-6 shadow-pulse",
      className,
    )}
    {...props}
  />
);

export default Card;
