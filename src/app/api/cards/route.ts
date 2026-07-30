import { NextResponse } from "next/server";
import { db } from "@/db";
import { parseCardsQuery } from "@/lib/cards-query";
import type { FlashcardDTO } from "@/lib/taxonomy";

// GET /api/cards
//   ?setId=<cardSetId>                          preferred (client knows the id)
//   ?level=<levelName>&type=<typeLabel>         fallback resolution
// `type` is optional; when omitted the first (ordered) set on the level is used.
//
// Status codes:
//   200 — { flashcards } (may be empty)
//   400 — malformed / missing query params
//   404 — card set not found for the given selection
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
    let cardSetId: string | undefined;

    if (parsed.mode === "setId") {
      const existing = await db.cardSet.findUnique({
        where: { id: parsed.setId },
        select: { id: true },
      });
      cardSetId = existing?.id;
    } else {
      const cardSet = await db.cardSet.findFirst({
        where: {
          level: { name: parsed.level },
          ...(parsed.type ? { typeLabel: parsed.type } : {}),
        },
        orderBy: { order: "asc" },
        select: { id: true },
      });
      cardSetId = cardSet?.id;
    }

    if (!cardSetId) {
      return NextResponse.json(
        { error: "Card set not found for the given selection." },
        { status: 404 }
      );
    }

    const flashcards: FlashcardDTO[] = await db.flashcard.findMany({
      where: { cardSetId },
      orderBy: { order: "asc" },
      select: {
        id: true,
        hebrew: true,
        english: true,
        transliteration: true,
        order: true,
      },
    });

    return NextResponse.json({ flashcards });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
