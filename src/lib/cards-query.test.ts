import { describe, expect, it } from "vitest";
import { parseCardsQuery } from "./cards-query";

describe("parseCardsQuery", () => {
  it("returns 400 when neither setId nor level is provided", () => {
    const result = parseCardsQuery(new URLSearchParams());
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "Provide setId, or level (with optional type).",
    });
  });

  it("rejects blank setId after trim", () => {
    const result = parseCardsQuery(new URLSearchParams("setId=%20%20"));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/setId/i);
    }
  });

  it("rejects blank level after trim", () => {
    const result = parseCardsQuery(new URLSearchParams("level=   "));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/level/i);
    }
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

  it("parses setId and prefers it over level/type", () => {
    const result = parseCardsQuery(
      new URLSearchParams("setId=abc&level=Red&type=Pack%201")
    );
    expect(result).toEqual({
      ok: true,
      mode: "setId",
      setId: "abc",
    });
  });

  it("trims setId", () => {
    const result = parseCardsQuery(new URLSearchParams("setId=%20abc%20"));
    expect(result).toEqual({
      ok: true,
      mode: "setId",
      setId: "abc",
    });
  });

  it("parses level without type", () => {
    const result = parseCardsQuery(new URLSearchParams("level=Red"));
    expect(result).toEqual({
      ok: true,
      mode: "level",
      level: "Red",
    });
  });

  it("parses level with type", () => {
    const result = parseCardsQuery(
      new URLSearchParams("level=Dark%20Green&type=Pack%201")
    );
    expect(result).toEqual({
      ok: true,
      mode: "level",
      level: "Dark Green",
      type: "Pack 1",
    });
  });
});
