"use client";

import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CardControlsProps = {
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  disabled?: boolean;
};

export function CardControls({
  total,
  index,
  onPrev,
  onNext,
  onShuffle,
  disabled,
}: CardControlsProps) {
  const position = total === 0 ? 0 : index + 1;
  const progressPercent = total === 0 ? 0 : (position / total) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={position}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Deck progress"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={disabled}
          aria-label="Previous card"
        >
          <ChevronLeft />
          Prev
        </Button>

        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium tabular-nums text-muted-foreground">
            Card {position} of {total}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onShuffle}
            disabled={disabled}
            aria-label="Shuffle deck"
          >
            <Shuffle />
            Shuffle
          </Button>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={disabled}
          aria-label="Next card"
        >
          Next
          <ChevronRight />
        </Button>
      </div>

      <p className="hidden items-center justify-center text-center text-xs text-muted-foreground sm:flex">
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-sans">
          ←
        </kbd>
        <span className="mx-1.5">/</span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-sans">
          →
        </kbd>
        <span className="mx-1.5">to navigate ·</span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-sans">
          Space
        </kbd>
        <span className="ml-1.5">to flip</span>
      </p>
    </div>
  );
}
