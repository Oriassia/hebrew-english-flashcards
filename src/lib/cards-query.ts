export type CardsQueryOk =
  | { ok: true; mode: "setId"; setId: string }
  | { ok: true; mode: "level"; level: string; type?: string };

export type CardsQueryError = {
  ok: false;
  status: 400;
  error: string;
};

export type CardsQueryResult = CardsQueryOk | CardsQueryError;

/**
 * Parse and validate GET /api/cards query params.
 * Prefer setId when present; otherwise require level (type optional).
 */
export function parseCardsQuery(
  searchParams: URLSearchParams
): CardsQueryResult {
  const rawSetId = searchParams.get("setId");
  const rawLevel = searchParams.get("level");
  const rawType = searchParams.get("type");

  if (rawSetId !== null) {
    const setId = rawSetId.trim();
    if (!setId) {
      return {
        ok: false,
        status: 400,
        error: "Query parameter setId must not be empty.",
      };
    }
    return { ok: true, mode: "setId", setId };
  }

  if (rawLevel !== null) {
    const level = rawLevel.trim();
    if (!level) {
      return {
        ok: false,
        status: 400,
        error: "Query parameter level must not be empty.",
      };
    }

    if (rawType !== null) {
      const type = rawType.trim();
      if (!type) {
        return {
          ok: false,
          status: 400,
          error: "Query parameter type must not be empty.",
        };
      }
      return { ok: true, mode: "level", level, type };
    }

    return { ok: true, mode: "level", level };
  }

  return {
    ok: false,
    status: 400,
    error: "Provide setId, or level (with optional type).",
  };
}
