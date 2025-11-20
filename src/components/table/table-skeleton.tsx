import Skeleton from "@/components/atoms/skeleton";

const TableSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div
        key={`row-${index}`}
        className="grid grid-cols-[minmax(220px,2fr)_repeat(4,minmax(110px,1fr))_80px] items-center gap-3 rounded-2xl border border-pulse-border/40 bg-pulse-surfaceSoft/40 p-4"
      >
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-20 justify-self-end" />
        <Skeleton className="h-6 w-16 justify-self-end" />
        <Skeleton className="h-6 w-24 justify-self-end" />
        <Skeleton className="h-6 w-12 justify-self-end" />
        <Skeleton className="h-10 w-16 justify-self-end" />
      </div>
    ))}
  </div>
);

export default TableSkeleton;
