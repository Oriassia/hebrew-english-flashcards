import { beforeEach, describe, expect, it, vi } from "vitest";

const { findUnique, findFirst, findMany } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  findFirst: vi.fn(),
  findMany: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    cardSet: { findUnique, findFirst },
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
    findFirst.mockReset();
    findMany.mockReset();
  });

  it("returns 400 for missing params", async () => {
    const res = await GET(request(""));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Provide setId, or level (with optional type).",
    });
  });

  it("returns 404 when setId does not exist", async () => {
    findUnique.mockResolvedValueOnce(null);
    const res = await GET(request("setId=missing"));
    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({
      error: "Card set not found for the given selection.",
    });
  });

  it("returns 200 with flashcards for a valid setId", async () => {
    findUnique.mockResolvedValueOnce({ id: "set-1" });
    findMany.mockResolvedValueOnce([
      {
        id: "c1",
        hebrew: "שָׁלוֹם",
        english: "Hello",
        transliteration: "shalom",
        order: 0,
      },
    ]);

    const res = await GET(request("setId=set-1"));
    expect(res.status).toBe(200);
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
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { cardSetId: "set-1" } })
    );
  });

  it("resolves level+type and returns 404 when no set matches", async () => {
    findFirst.mockResolvedValueOnce(null);
    const res = await GET(request("level=Red&type=Pack%201"));
    expect(res.status).toBe(404);
  });

  it("returns 500 when the database throws", async () => {
    findUnique.mockRejectedValueOnce(new Error("db down"));
    const res = await GET(request("setId=set-1"));
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Internal server error.",
    });
  });
});
