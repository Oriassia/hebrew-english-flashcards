"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DeckSelector } from "@/components/DeckSelector";
import { FlashcardViewer } from "@/components/FlashcardViewer";
import { CardControls } from "@/components/CardControls";
import { shuffle } from "@/lib/shuffle";
import {
  TIER_ORDER,
  type FlashcardDTO,
  type TaxonomyLevel,
  type TierName,
} from "@/lib/taxonomy";

type StudyAppProps = {
  taxonomy: TaxonomyLevel[];
};

export function StudyApp({ taxonomy }: StudyAppProps) {
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
  const [levelName, setLevelName] = useState<string>(firstLevel?.name ?? "");
  const [type, setType] = useState<string | null>(
    firstLevel?.types[0] ?? null
  );

  const [deck, setDeck] = useState<FlashcardDTO[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const levelsForTier = useMemo(
    () => taxonomy.filter((l) => l.tier === tier),
    [taxonomy, tier]
  );
  const currentLevel = useMemo(
    () => taxonomy.find((l) => l.name === levelName),
    [taxonomy, levelName]
  );

  const handleTierChange = useCallback(
    (nextTier: TierName) => {
      setTier(nextTier);
      const nextLevel = taxonomy.find((l) => l.tier === nextTier);
      setLevelName(nextLevel?.name ?? "");
      setType(nextLevel?.types[0] ?? null);
    },
    [taxonomy]
  );

  const handleLevelChange = useCallback(
    (nextLevelName: string) => {
      setLevelName(nextLevelName);
      const nextLevel = taxonomy.find((l) => l.name === nextLevelName);
      setType(nextLevel?.types[0] ?? null);
    },
    [taxonomy]
  );

  const handleTypeChange = useCallback((nextType: string) => {
    setType(nextType);
  }, []);

  // Refetch whenever the leaf selection (level + type) changes.
  useEffect(() => {
    if (!levelName) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ level: levelName });
        if (type) params.set("type", type);

        const res = await fetch(`/api/cards?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data: { flashcards: FlashcardDTO[] } = await res.json();
        if (cancelled) return;
        setDeck(data.flashcards);
        setIndex(0);
        setFlipped(false);
        setError(null);
      } catch {
        if (!cancelled) {
          setDeck([]);
          setError(
            "Couldn’t load this deck. Check your connection and try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [levelName, type]);

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
        levelName={levelName}
        onLevelChange={handleLevelChange}
        types={currentLevel?.types ?? []}
        type={type}
        onTypeChange={handleTypeChange}
        levelColor={currentLevel?.colorHex}
      />

      <FlashcardViewer
        card={currentCard}
        flipped={flipped}
        loading={loading}
        error={error}
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
