import { NextResponse } from "next/server";
import { db } from "@/db";
import type { FlashcardDTO } from "@/lib/taxonomy";

// GET /api/cards
//   ?setId=<cardSetId>                          preferred (client knows the id)
//   ?level=<levelName>&type=<typeLabel>         fallback resolution
// `type` is optional; when omitted the first (ordered) set on the level is used.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const setId = searchParams.get("setId");
  const level = searchParams.get("level");
  const type = searchParams.get("type");

  let cardSetId = setId ?? undefined;

  if (!cardSetId && level) {
    const cardSet = await db.cardSet.findFirst({
      where: {
        level: { name: level },
        ...(type ? { typeLabel: type } : {}),
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
}
