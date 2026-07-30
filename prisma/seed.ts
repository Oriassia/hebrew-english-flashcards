// Load .env before importing the db singleton, which reads DATABASE_URL at
// module-eval time. Enables both `npm run seed` and `npx prisma db seed`.
import "dotenv/config";
import { db } from "../src/db";
import { LEAVES, LEVEL_META } from "./data";

async function main() {
  // Idempotent: clear then re-insert.
  await db.flashcard.deleteMany();
  await db.level.deleteMany();

  for (const meta of LEVEL_META) {
    await db.level.create({
      data: {
        name: meta.name,
        tier: meta.tier,
        colorHex: meta.colorHex,
        order: meta.order,
      },
    });
  }

  const levelsByName = Object.fromEntries(
    (await db.level.findMany({ select: { id: true, name: true } })).map((l) => [
      l.name,
      l.id,
    ])
  );

  for (const leaf of LEAVES) {
    const levelId = levelsByName[leaf.level];
    if (!levelId) {
      throw new Error(`Unknown level in leaf: ${leaf.level}`);
    }

    await db.flashcard.createMany({
      data: leaf.pairs.map((pair, index) => ({
        levelId,
        type: leaf.type,
        hebrew: pair.hebrew,
        english: pair.english,
        transliteration: pair.transliteration ?? null,
        order: index,
      })),
    });
  }

  const levels = await db.level.count();
  const cards = await db.flashcard.count();
  const typedLeaves = LEAVES.filter((l) => l.type !== null).length;
  console.log(
    `Seed complete: ${levels} levels, ${LEAVES.length} leaves (${typedLeaves} typed), ${cards} flashcards.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
