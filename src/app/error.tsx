"use client";

import Card from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Pulse table crashed", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
      <Card className="space-y-6 text-pulse-text">
        <h1 className="text-2xl font-semibold">Something went sideways</h1>
        <p className="text-sm text-pulse-text-muted">
          Pulse could not render. We logged the error ({error.message}). Try again in a
          second.
        </p>
        <Button onClick={reset}>Retry</Button>
      </Card>
    </main>
  );
};

export default ErrorPage;
