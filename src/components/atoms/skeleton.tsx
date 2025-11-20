import { cn } from "@/utils/cn";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-shimmer rounded-md bg-white/5", className)} />
);

export default Skeleton;
