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

  return (
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
  );
}
