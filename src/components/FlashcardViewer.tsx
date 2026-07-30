"use client";

import type { FlashcardDTO } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

type FlashcardViewerProps = {
  card?: FlashcardDTO;
  flipped: boolean;
  loading: boolean;
  error?: string | null;
  onFlip: () => void;
  accentColor?: string;
};

export function FlashcardViewer({
  card,
  flipped,
  loading,
  error,
  onFlip,
  accentColor,
}: FlashcardViewerProps) {
  if (loading) {
    return (
      <div className="flex h-72 w-full animate-pulse flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6">
        <div className="h-10 w-40 rounded-lg bg-muted" />
        <div className="h-3 w-24 rounded-full bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center text-muted-foreground"
      >
        {error}
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center text-muted-foreground">
        No cards in this set yet. Try another level.
      </div>
    );
  }

  return (
    <button
      key={card.id}
      type="button"
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `English: ${card.english}. Tap to see Hebrew.`
          : `Hebrew: ${card.hebrew}. Tap to reveal English.`
      }
      className="group h-72 w-full cursor-pointer rounded-2xl outline-none [perspective:1200px] animate-in fade-in-0 slide-in-from-bottom-1 duration-300 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:scale-[0.99]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front: Hebrew */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6 shadow-sm transition-shadow duration-300 [backface-visibility:hidden] group-hover:shadow-lg"
          style={{ borderTop: `4px solid ${accentColor ?? "var(--border)"}` }}
        >
          <span
            dir="rtl"
            lang="he"
            className="font-display text-6xl leading-tight text-foreground sm:text-7xl"
          >
            {card.hebrew}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Tap to flip
          </span>
        </div>

        {/* Back: English + transliteration */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 text-center shadow-sm transition-shadow duration-300 [backface-visibility:hidden] [transform:rotateY(180deg)] group-hover:shadow-lg"
          style={{ borderTop: `4px solid ${accentColor ?? "var(--border)"}` }}
        >
          <span className="font-display text-4xl text-foreground sm:text-5xl">
            {card.english}
          </span>
          {card.transliteration && (
            <span className="text-lg text-muted-foreground">
              {card.transliteration}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
