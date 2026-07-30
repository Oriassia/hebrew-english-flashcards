import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-4 px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="max-w-prose text-sm leading-6 text-muted-foreground">
        That path doesn’t exist. Head back to the flashcards and keep studying.
      </p>
      <Button render={<Link href="/" />}>Back to flashcards</Button>
    </main>
  );
}
