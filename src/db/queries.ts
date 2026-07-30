import { db } from "@/db";
import type { TaxonomyLevel, TierName } from "@/lib/taxonomy";

// Loads the full Tier -> Level -> CardSet tree (no card bodies) for the
// cascading selectors. Server-only: imports the db singleton.
export async function getTaxonomy(): Promise<TaxonomyLevel[]> {
  const levels = await db.level.findMany({
    orderBy: { order: "asc" },
    include: {
      cardSets: {
        orderBy: { order: "asc" },
        select: { id: true, typeLabel: true, order: true },
      },
    },
  });

  return levels.map((level) => ({
    id: level.id,
    name: level.name,
    tier: level.tier as TierName,
    colorHex: level.colorHex,
    order: level.order,
    cardSets: level.cardSets,
  }));
}
