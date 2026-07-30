"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaxonomyLevel, TierName } from "@/lib/taxonomy";

type DeckSelectorProps = {
  tiers: TierName[];
  tier: TierName;
  onTierChange: (tier: TierName) => void;

  levels: TaxonomyLevel[];
  levelName: string;
  onLevelChange: (levelName: string) => void;

  types: string[];
  type: string | null;
  onTypeChange: (type: string) => void;

  levelColor?: string;
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
  levelName,
  onLevelChange,
  types,
  type,
  onTypeChange,
  levelColor,
}: DeckSelectorProps) {
  const hasTypes = types.length > 0;

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
            value={levelName}
            onValueChange={(value) => onLevelChange(value as string)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level">
                {(value: string) => {
                  const selected = levels.find((level) => level.name === value);
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
                <SelectItem key={level.name} value={level.name}>
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

        {hasTypes && type && (
          <Field label="Type">
            <Select
              value={type}
              onValueChange={(value) => onTypeChange(value as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
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
            {type ? ` · ${type}` : ""}
          </Badge>
        </div>
      )}
    </section>
  );
}
