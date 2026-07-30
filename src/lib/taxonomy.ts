// Client-safe types + constants only. No server/db imports here so this module
// can be pulled into client components without bundling Prisma/pg.

export type TierName = "Foundation" | "Flow" | "Freedom";

export const TIER_ORDER: TierName[] = ["Foundation", "Flow", "Freedom"];

export type TaxonomyCardSet = {
  id: string;
  typeLabel: string | null;
  order: number;
};

export type TaxonomyLevel = {
  id: string;
  name: string;
  tier: TierName;
  colorHex: string;
  order: number;
  cardSets: TaxonomyCardSet[];
};

export type FlashcardDTO = {
  id: string;
  hebrew: string;
  english: string;
  transliteration: string | null;
  order: number;
};
