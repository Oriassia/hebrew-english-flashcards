"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-prose text-sm leading-6 text-muted-foreground">
        An unexpected error occurred while loading this page. You can try again.
      </p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
