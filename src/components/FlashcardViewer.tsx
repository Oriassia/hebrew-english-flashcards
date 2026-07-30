"use client";

import type { FlashcardDTO } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

type FlashcardViewerProps = {
  card?: FlashcardDTO;
  flipped: boolean;
  loading: boolean;
  onFlip: () => void;
  accentColor?: string;
};

export function FlashcardViewer({
  card,
  flipped,
  loading,
  onFlip,
  accentColor,
}: FlashcardViewerProps) {
  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground">
        Loading cards…
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
      type="button"
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `English: ${card.english}. Tap to see Hebrew.`
          : `Hebrew: ${card.hebrew}. Tap to reveal English.`
      }
      className="group h-72 w-full rounded-2xl outline-none [perspective:1200px] focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front: Hebrew */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6 [backface-visibility:hidden]"
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
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
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
