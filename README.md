# Hebrew Flashcards

A calm, editorial flashcard app for studying modern Hebrew, organised by a
simple taxonomy: **Tier → Level → Type**. Pick a deck, tap a card to flip
between Hebrew (with nikkud) and English + transliteration, and page through with
Prev / Next / Shuffle or your keyboard.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no `tailwind.config.js`)
- **shadcn/ui** (base-nova style on `@base-ui/react`) + **lucide-react**
- **Neon Postgres** via **Prisma 7** with the **`@prisma/adapter-pg`** driver adapter

## Data model

```
Tier (enum: Foundation | Flow | Freedom)
Level  (name, tier, colorHex, order)
  └─ CardSet (typeLabel | null, order)      # null = untyped level; else "Pack N"
       └─ Flashcard (hebrew, english, transliteration, order)
```

Only [`src/db/index.ts`](src/db/index.ts) instantiates `PrismaClient` (wrapped with
the pg adapter). Server code reads through `@/db`; components never import Prisma.

## Getting started

### 1. Install

```bash
npm install
```

`postinstall` runs `prisma generate`, emitting the typed client into
`src/generated/prisma` (gitignored). If your environment blocks install scripts,
run `npx prisma generate` manually.

### 2. Configure environment

Copy the example and fill in your Neon connection strings:

```bash
cp .env.example .env
```

- `DATABASE_URL` — **pooled** connection (Connection Pooling ON); used at runtime.
- `DIRECT_URL` — **direct** connection (Connection Pooling OFF); used by the Prisma
  CLI for schema pushes and seeding.

### 3. Create tables and seed

```bash
npm run db:push   # push the Prisma schema to Neon (prisma db push)
npm run seed      # populate the full taxonomy + flashcards (idempotent)
```

`npm run seed` clears and re-inserts, so it is safe to re-run. You can also use
`npx prisma db seed` (wired via `migrations.seed` in `prisma.config.ts`).

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server (Turbopack)                    |
| `npm run build`   | Production build                                     |
| `npm run start`   | Serve the production build                           |
| `npm run lint`    | ESLint                                               |
| `npm run db:push` | `prisma db push` — sync schema to the database       |
| `npm run seed`    | Seed the taxonomy and flashcards (`tsx prisma/seed.ts`) |

## Project structure

```
prisma/
  schema.prisma        # prisma-client generator + Tier/Level/CardSet/Flashcard
  seed.ts              # Idempotent taxonomy + flashcard seed
prisma.config.ts       # Prisma 7 CLI config (schema, DIRECT_URL, seed command)
src/
  db/
    index.ts           # PrismaClient singleton + @prisma/adapter-pg
    queries.ts         # Server-only taxonomy loader (getTaxonomy)
  generated/prisma/    # Generated client (gitignored)
  app/
    page.tsx           # RSC: loads the taxonomy tree, renders StudyApp
    layout.tsx         # Fonts (Assistant + Frank Ruhl Libre) + brand surface
    globals.css        # Tailwind v4 @theme brand tokens
    api/cards/route.ts # GET flashcards by setId, or level (+ optional type)
  components/
    StudyApp.tsx       # State, data fetching, keyboard navigation
    DeckSelector.tsx   # Cascading Tier → Level → Type selects + colour badge
    FlashcardViewer.tsx# RTL 3D flip card
    CardControls.tsx   # Prev / Next / Shuffle + progress
    ui/                # shadcn/ui primitives
  lib/
    taxonomy.ts        # Client-safe types + constants (no db import)
    utils.ts           # shadcn `cn` helper
```

## Keyboard shortcuts

- **← / →** — previous / next card
- **Space / ↑ / ↓** — flip the current card

## Deploy (Vercel + Neon)

1. Push this repo to GitHub and import it into Vercel.
2. In Vercel project settings, add both `DATABASE_URL` and `DIRECT_URL` env vars.
3. Deploy. `prisma generate` runs on install (via `postinstall`), so the generated
   client is present in the build. Run `npm run db:push` and `npm run seed` once
   against your Neon database (locally or via a one-off job) to populate data.
