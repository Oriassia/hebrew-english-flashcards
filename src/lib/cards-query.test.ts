import { describe, expect, it } from "vitest";
import { parseCardsQuery } from "./cards-query";

describe("parseCardsQuery", () => {
  it("returns 400 when level is missing", () => {
    const result = parseCardsQuery(new URLSearchParams());
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "Query parameter level is required.",
    });
  });

  it("rejects blank level after trim", () => {
    const result = parseCardsQuery(new URLSearchParams("level=%20%20"));
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "Query parameter level must not be empty.",
    });
  });

  it("rejects blank type when type is present", () => {
    const result = parseCardsQuery(
      new URLSearchParams("level=Red&type=%20")
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/type/i);
    }
  });

  it("parses level without type as null leaf", () => {
    const result = parseCardsQuery(new URLSearchParams("level=%20Red%20"));
    expect(result).toEqual({
      ok: true,
      level: "Red",
      type: null,
    });
  });

  it("parses level + type", () => {
    const result = parseCardsQuery(
      new URLSearchParams("level=Dark%20Green&type=Pack%201")
    );
    expect(result).toEqual({
      ok: true,
      level: "Dark Green",
      type: "Pack 1",
    });
  });
});
