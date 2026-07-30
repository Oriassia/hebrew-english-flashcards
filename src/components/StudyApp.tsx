"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DeckSelector } from "@/components/DeckSelector";
import { FlashcardViewer } from "@/components/FlashcardViewer";
import { CardControls } from "@/components/CardControls";
import {
  TIER_ORDER,
  type FlashcardDTO,
  type TaxonomyLevel,
  type TierName,
} from "@/lib/taxonomy";

type StudyAppProps = {
  taxonomy: TaxonomyLevel[];
};

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function StudyApp({ taxonomy }: StudyAppProps) {
  // Tiers that actually have levels, in canonical order.
  const tiers = useMemo(
    () => TIER_ORDER.filter((t) => taxonomy.some((l) => l.tier === t)),
    [taxonomy]
  );

  const firstTier = tiers[0];
  const firstLevel = useMemo(
    () => taxonomy.find((l) => l.tier === firstTier),
    [taxonomy, firstTier]
  );

  const [tier, setTier] = useState<TierName>(firstTier);
  const [levelId, setLevelId] = useState<string>(firstLevel?.id ?? "");
  const [setId, setSetId] = useState<string>(
    firstLevel?.cardSets[0]?.id ?? ""
  );

  const [deck, setDeck] = useState<FlashcardDTO[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const levelsForTier = useMemo(
    () => taxonomy.filter((l) => l.tier === tier),
    [taxonomy, tier]
  );
  const currentLevel = useMemo(
    () => taxonomy.find((l) => l.id === levelId),
    [taxonomy, levelId]
  );

  // Cascade resets: choosing a tier selects its first level + first set.
  const handleTierChange = useCallback(
    (nextTier: TierName) => {
      setTier(nextTier);
      const nextLevel = taxonomy.find((l) => l.tier === nextTier);
      setLevelId(nextLevel?.id ?? "");
      setSetId(nextLevel?.cardSets[0]?.id ?? "");
    },
    [taxonomy]
  );

  // Choosing a level selects its first set (type).
  const handleLevelChange = useCallback(
    (nextLevelId: string) => {
      setLevelId(nextLevelId);
      const nextLevel = taxonomy.find((l) => l.id === nextLevelId);
      setSetId(nextLevel?.cardSets[0]?.id ?? "");
    },
    [taxonomy]
  );

  const handleTypeChange = useCallback((nextSetId: string) => {
    setSetId(nextSetId);
  }, []);

  // Fetch the deck whenever the selected card set changes.
  useEffect(() => {
    if (!setId) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/cards?setId=${encodeURIComponent(setId)}`
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: { flashcards: FlashcardDTO[] } = await res.json();
        if (cancelled) return;
        setDeck(data.flashcards);
        setIndex(0);
        setFlipped(false);
      } catch {
        if (!cancelled) setDeck([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [setId]);

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (deck.length ? (i + 1) % deck.length : 0));
  }, [deck.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (deck.length ? (i - 1 + deck.length) % deck.length : 0));
  }, [deck.length]);

  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  const shuffleDeck = useCallback(() => {
    setDeck((d) => shuffle(d));
    setIndex(0);
    setFlipped(false);
  }, []);

  // Keyboard navigation: arrows to move, space/up/down to flip.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case " ":
        case "ArrowUp":
        case "ArrowDown":
          e.preventDefault();
          toggleFlip();
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, toggleFlip]);

  const currentCard = deck[index];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
      <DeckSelector
        tiers={tiers}
        tier={tier}
        onTierChange={handleTierChange}
        levels={levelsForTier}
        levelId={levelId}
        onLevelChange={handleLevelChange}
        cardSets={currentLevel?.cardSets ?? []}
        setId={setId}
        onTypeChange={handleTypeChange}
        levelColor={currentLevel?.colorHex}
        levelName={currentLevel?.name}
      />

      <FlashcardViewer
        card={currentCard}
        flipped={flipped}
        loading={loading}
        onFlip={toggleFlip}
        accentColor={currentLevel?.colorHex}
      />

      <CardControls
        total={deck.length}
        index={index}
        onPrev={goPrev}
        onNext={goNext}
        onShuffle={shuffleDeck}
        disabled={loading || deck.length === 0}
      />
    </div>
  );
}
