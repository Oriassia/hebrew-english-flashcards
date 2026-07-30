import { StudyApp } from "@/components/StudyApp";
import { getTaxonomy } from "@/db/queries";

// Data is fetched from the database per request; skip build-time prerender.
export const dynamic = "force-dynamic";

export default async function Home() {
  const taxonomy = await getTaxonomy();

  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-6 py-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Modern Hebrew · Tel Aviv
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-foreground">
            Hebrew Flashcards
          </h1>
          <p className="max-w-prose text-sm leading-6 text-muted-foreground">
            Pick a tier, level, and pack, then tap to flip between Hebrew and
            English. A calm way to build modern Hebrew, one card at a time.
          </p>
        </div>
      </header>

      <StudyApp taxonomy={taxonomy} />
    </main>
  );
}
