import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, Search } from "lucide-react";
import { BottomNav } from "@/components/home/BottomNav";
import { SpeakButton } from "@/components/SpeakButton";
import { Ayi } from "@/components/Ayi";
import { searchDictionary, dictionary } from "@/lib/dictionary";

export const Route = createFileRoute("/traduction")({
  head: () => ({
    meta: [
      { title: "Traduction Fɔngbè ↔ Français — Kwabo" },
      {
        name: "description",
        content:
          "Traduis des mots et expressions du Fɔngbè vers le français (et inversement), avec prononciation audio et exemples issus des leçons Kwabo.",
      },
      { property: "og:title", content: "Traduction Fɔngbè ↔ Français — Kwabo" },
      {
        property: "og:description",
        content: "Dictionnaire Fɔngbè-Français avec écoute de la prononciation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TraductionPage,
});

function TraductionPage() {
  const [query, setQuery] = useState("");
  const [dir, setDir] = useState<"fon-fr" | "fr-fon">("fon-fr");

  const results = useMemo(() => searchDictionary(query), [query]);

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto px-4 pt-6 pb-32">
        <header className="flex items-center gap-3">
          <Ayi size={56} mood="happy" />
          <div>
            <h1 className="font-display font-black text-2xl leading-tight">Traduction</h1>
            <p className="text-sm font-bold text-muted-foreground">
              {dictionary.length} mots et expressions Fɔngbè
            </p>
          </div>
        </header>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => setDir((d) => (d === "fon-fr" ? "fr-fon" : "fon-fr"))}
            className="press flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-3 py-2 text-xs font-black uppercase tracking-wider"
          >
            {dir === "fon-fr" ? "Fɔn → Fr" : "Fr → Fɔn"}
            <ArrowLeftRight className="w-4 h-4 text-primary" />
          </button>
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dir === "fon-fr" ? "Ex. : Kúdó, Àwǎnú…" : "Ex. : bonjour, merci…"}
              className="w-full rounded-2xl border-2 border-border bg-card pl-9 pr-3 py-3 text-sm font-bold outline-none focus:border-primary"
            />
          </div>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 flex flex-col items-center text-center gap-3">
            <Ayi size={130} mood="thinking" />
            <h2 className="font-display font-black text-xl">Aucun résultat</h2>
            <p className="text-muted-foreground font-bold max-w-sm">
              Essaie un autre mot, ou vérifie l'orthographe. Le dictionnaire grandit avec les
              leçons.
            </p>
          </div>
        ) : (
          <ul className="mt-5 space-y-2">
            {results.map((e, i) => {
              const primary = dir === "fon-fr" ? e.fon : e.fr;
              const secondary = dir === "fon-fr" ? e.fr : e.fon;
              return (
                <li
                  key={`${e.fon}-${e.fr}-${i}`}
                  className="rounded-2xl border-2 border-border bg-card px-4 py-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-base truncate">{primary}</div>
                    <div className="text-xs font-bold text-muted-foreground truncate">
                      {secondary}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/80 mt-0.5 truncate">
                      {e.emoji} {e.lesson}
                    </div>
                  </div>
                  <SpeakButton text={e.fon} size="sm" />
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <BottomNav active="traduction" />
    </div>
  );
}
