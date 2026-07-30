"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  TaxonomyCardSet,
  TaxonomyLevel,
  TierName,
} from "@/lib/taxonomy";

type DeckSelectorProps = {
  tiers: TierName[];
  tier: TierName;
  onTierChange: (tier: TierName) => void;

  levels: TaxonomyLevel[];
  levelId: string;
  onLevelChange: (levelId: string) => void;

  cardSets: TaxonomyCardSet[];
  setId: string;
  onTypeChange: (setId: string) => void;

  levelColor?: string;
  levelName?: string;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export function DeckSelector({
  tiers,
  tier,
  onTierChange,
  levels,
  levelId,
  onLevelChange,
  cardSets,
  setId,
  onTypeChange,
  levelColor,
  levelName,
}: DeckSelectorProps) {
  // Type selector only appears when the level has more than one card set.
  const hasTypes = cardSets.length > 1;

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Field label="Tier">
          <Select
            value={tier}
            onValueChange={(value) => onTierChange(value as TierName)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent>
              {tiers.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Level">
          <Select
            value={levelId}
            onValueChange={(value) => onLevelChange(value as string)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level">
                {(value: string) => {
                  const selected = levels.find((level) => level.id === value);
                  if (!selected) return null;
                  return (
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: selected.colorHex }}
                      />
                      {selected.name}
                    </span>
                  );
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: level.colorHex }}
                    />
                    {level.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {hasTypes && (
          <Field label="Type">
            <Select
              value={setId}
              onValueChange={(value) => onTypeChange(value as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type">
                  {(value: string) => {
                    const selected = cardSets.find((set) => set.id === value);
                    return selected?.typeLabel ?? "All cards";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {cardSets.map((set) => (
                  <SelectItem key={set.id} value={set.id}>
                    {set.typeLabel ?? "All cards"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>

      {levelName && (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1.5 border-border"
            style={{ color: levelColor }}
          >
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ backgroundColor: levelColor }}
            />
            {tier} · {levelName}
          </Badge>
        </div>
      )}
    </section>
  );
}
