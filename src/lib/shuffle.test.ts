import { describe, expect, it } from "vitest";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("returns an empty array for empty input", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("returns a single-element array unchanged", () => {
    expect(shuffle([1])).toEqual([1]);
  });

  it("preserves length and elements (multiset)", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("does not mutate the original array", () => {
    const input = [1, 2, 3];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });
});
