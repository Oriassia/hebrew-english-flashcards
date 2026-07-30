export type CardsQueryOk = {
  ok: true;
  level: string;
  type: string | null;
};

export type CardsQueryError = {
  ok: false;
  status: 400;
  error: string;
};

export type CardsQueryResult = CardsQueryOk | CardsQueryError;

/**
 * Parse GET /api/cards query params.
 * Requires level name. Type/pack is optional (omit => null leaf).
 */
export function parseCardsQuery(
  searchParams: URLSearchParams
): CardsQueryResult {
  const rawLevel = searchParams.get("level");
  if (rawLevel === null) {
    return {
      ok: false,
      status: 400,
      error: "Query parameter level is required.",
    };
  }

  const level = rawLevel.trim();
  if (!level) {
    return {
      ok: false,
      status: 400,
      error: "Query parameter level must not be empty.",
    };
  }

  const rawType = searchParams.get("type");
  if (rawType !== null) {
    const type = rawType.trim();
    if (!type) {
      return {
        ok: false,
        status: 400,
        error: "Query parameter type must not be empty.",
      };
    }
    return { ok: true, level, type };
  }

  return { ok: true, level, type: null };
}
