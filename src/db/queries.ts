import { db } from "@/db";
import type { TaxonomyLevel, TierName } from "@/lib/taxonomy";

// Loads levels + distinct type labels (no card bodies) for cascading selectors.
export async function getTaxonomy(): Promise<TaxonomyLevel[]> {
  const levels = await db.level.findMany({
    orderBy: { order: "asc" },
    include: {
      flashcards: {
        where: { type: { not: null } },
        select: { type: true },
        distinct: ["type"],
        orderBy: { type: "asc" },
      },
    },
  });

  return levels.map((level) => ({
    name: level.name,
    tier: level.tier as TierName,
    colorHex: level.colorHex,
    order: level.order,
    types: level.flashcards
      .map((f) => f.type)
      .filter((t): t is string => t !== null),
  }));
}
