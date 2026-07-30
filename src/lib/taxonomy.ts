// Client-safe types + constants only. No server/db imports here so this module
// can be pulled into client components without bundling Prisma/pg.

export type TierName = "Foundation" | "Flow" | "Freedom";

export const TIER_ORDER: TierName[] = ["Foundation", "Flow", "Freedom"];

export type TaxonomyLevel = {
  name: string;
  tier: TierName;
  colorHex: string;
  order: number;
  /** Pack labels for this level. Empty => single untyped leaf (no type selector). */
  types: string[];
};

export type FlashcardDTO = {
  id: string;
  hebrew: string;
  english: string;
  transliteration: string | null;
  order: number;
};
