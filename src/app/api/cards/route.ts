import { NextResponse } from "next/server";
import { db } from "@/db";
import { parseCardsQuery } from "@/lib/cards-query";
import type { FlashcardDTO } from "@/lib/taxonomy";

// GET /api/cards?level=<levelName>&type=<typeLabel?>
//
// level — required level name (e.g. "Red", "Dark Green")
// type  — optional pack label (e.g. "Pack 1"). Omit for untyped levels.
//
// Status codes:
//   200 — { flashcards } (may be empty only if leaf exists with zero cards)
//   400 — missing/empty required params
//   404 — level or leaf not found
//   500 — unexpected server/DB error
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = parseCardsQuery(searchParams);

  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.error },
      { status: parsed.status }
    );
  }

  try {
    const level = await db.level.findUnique({
      where: { name: parsed.level },
      select: { id: true },
    });

    if (!level) {
      return NextResponse.json(
        { error: "Card set not found for the given selection." },
        { status: 404 }
      );
    }

    const flashcards: FlashcardDTO[] = await db.flashcard.findMany({
      where: {
        levelId: level.id,
        type: parsed.type,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        hebrew: true,
        english: true,
        transliteration: true,
        order: true,
      },
    });

    if (flashcards.length === 0) {
      return NextResponse.json(
        { error: "Card set not found for the given selection." },
        { status: 404 }
      );
    }

    return NextResponse.json({ flashcards });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
