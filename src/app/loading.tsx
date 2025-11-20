import Card from "@/components/atoms/card";
import TableSkeleton from "@/components/table/table-skeleton";

const LoadingPage = () => (
  <main className="mx-auto min-h-screen max-w-6xl space-y-8 px-4 pb-16 pt-12">
    <Card className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-full bg-white/10" />
      <TableSkeleton rows={8} />
    </Card>
  </main>
);

export default LoadingPage;
