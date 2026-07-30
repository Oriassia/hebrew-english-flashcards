import { beforeEach, describe, expect, it, vi } from "vitest";

const { findUnique, findMany } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  findMany: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    level: { findUnique },
    flashcard: { findMany },
  },
}));

import { GET } from "./route";

function request(query: string) {
  return new Request(`http://localhost/api/cards?${query}`);
}

describe("GET /api/cards", () => {
  beforeEach(() => {
    findUnique.mockReset();
    findMany.mockReset();
  });

  it("returns 400 when level is missing", async () => {
    const res = await GET(request(""));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Query parameter level is required.",
    });
  });

  it("returns 404 when level does not exist", async () => {
    findUnique.mockResolvedValueOnce(null);
    const res = await GET(request("level=Missing"));
    expect(res.status).toBe(404);
  });

  it("returns 404 when the leaf has no cards", async () => {
    findUnique.mockResolvedValueOnce({ id: "level-1" });
    findMany.mockResolvedValueOnce([]);
    const res = await GET(request("level=Red"));
    expect(res.status).toBe(404);
  });

  it("returns 200 with flashcards for level + type", async () => {
    findUnique.mockResolvedValueOnce({ id: "level-1" });
    findMany.mockResolvedValueOnce([
      {
        id: "c1",
        hebrew: "שָׁלוֹם",
        english: "Hello",
        transliteration: "shalom",
        order: 0,
      },
    ]);

    const res = await GET(request("level=Dark%20Green&type=Pack%201"));
    expect(res.status).toBe(200);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          levelId: "level-1",
          type: "Pack 1",
        },
      })
    );
    await expect(res.json()).resolves.toEqual({
      flashcards: [
        {
          id: "c1",
          hebrew: "שָׁלוֹם",
          english: "Hello",
          transliteration: "shalom",
          order: 0,
        },
      ],
    });
  });

  it("queries type null for untyped levels", async () => {
    findUnique.mockResolvedValueOnce({ id: "level-1" });
    findMany.mockResolvedValueOnce([
      {
        id: "c1",
        hebrew: "שָׁלוֹם",
        english: "Hello",
        transliteration: "shalom",
        order: 0,
      },
    ]);

    await GET(request("level=Red"));
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          levelId: "level-1",
          type: null,
        },
      })
    );
  });

  it("returns 500 when the database throws", async () => {
    findUnique.mockRejectedValueOnce(new Error("db down"));
    const res = await GET(request("level=Red"));
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Internal server error.",
    });
  });
});
