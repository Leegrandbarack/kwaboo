import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, ThumbsDown, ThumbsUp } from "lucide-react";
import { BottomNav } from "@/components/home/BottomNav";
import { Ayi } from "@/components/Ayi";
import { masteryLabel, useReview } from "@/lib/review";

export const Route = createFileRoute("/revision")({
  head: () => ({
    meta: [
      { title: "Réviser mes erreurs — Kwabo" },
      {
        name: "description",
        content:
          "Révision intelligente en Fɔngbè : revois tes erreurs avec la répétition espacée et ancre le vocabulaire durablement.",
      },
      { property: "og:title", content: "Réviser mes erreurs — Kwabo" },
      {
        property: "og:description",
        content: "Répétition espacée pour maîtriser le Fɔngbè mot par mot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevisionPage,
});

function RevisionPage() {
  const { items, promote, demote } = useReview();
  const [revealed, setRevealed] = useState<string | null>(null);

  const due = useMemo(() => items.filter((i) => i.dueAt <= Date.now()), [items]);
  const current = due[0];

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto px-4 pt-6 pb-32">
        <div className="flex items-center gap-3">
          <Link to="/cours" className="press p-2 -ml-2 rounded-full text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display font-black text-2xl">Réviser mes erreurs</h1>
            <p className="text-sm font-bold text-muted-foreground">
              {due.length} à revoir · {items.length} au total
            </p>
          </div>
        </div>

        {items.length === 0 && (
          <div className="mt-10 flex flex-col items-center text-center gap-3">
            <Ayi size={140} mood="cheer" />
            <h2 className="font-display font-black text-xl">Aucune erreur !</h2>
            <p className="text-muted-foreground font-bold max-w-sm">
              Tes erreurs de leçons apparaîtront ici pour être révisées au bon moment.
            </p>
            <Link
              to="/cours"
              className="btn-3d mt-2 bg-primary text-primary-foreground font-black px-6 py-3 rounded-2xl uppercase tracking-wider"
            >
              Aller aux cours
            </Link>
          </div>
        )}

        {items.length > 0 && !current && (
          <div className="mt-8 rounded-3xl border-2 border-success/60 bg-success/10 p-6 text-center">
            <div className="text-3xl">✅</div>
            <h2 className="font-display font-black text-lg mt-1">Révision à jour</h2>
            <p className="text-sm font-bold text-muted-foreground">
              Reviens plus tard, tes prochains mots sont programmés.
            </p>
          </div>
        )}

        {current && (
          <div className="mt-6 rounded-3xl border-2 border-border bg-card p-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
              {current.lessonTitle} · {masteryLabel(current.mastery)}
            </div>
            <div className="font-display font-black text-2xl mt-2">{current.question}</div>

            {revealed === current.id ? (
              <div className="mt-4 rounded-2xl bg-primary/10 border-2 border-primary/40 p-4">
                <div className="text-[11px] font-black uppercase text-primary">Réponse</div>
                <div className="font-black text-xl">{current.answer}</div>
              </div>
            ) : (
              <button
                onClick={() => setRevealed(current.id)}
                className="btn-3d mt-4 w-full flex items-center justify-center gap-2 bg-muted text-foreground font-black py-3.5 rounded-2xl uppercase tracking-wider"
              >
                <Eye className="w-5 h-5" /> Voir la réponse
              </button>
            )}

            {revealed === current.id && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    demote(current.id);
                    setRevealed(null);
                  }}
                  className="btn-3d flex items-center justify-center gap-2 bg-coral text-coral-foreground font-black py-3.5 rounded-2xl text-sm uppercase"
                >
                  <ThumbsDown className="w-4 h-4" /> Encore difficile
                </button>
                <button
                  onClick={() => {
                    promote(current.id);
                    setRevealed(null);
                  }}
                  className="btn-3d flex items-center justify-center gap-2 bg-success text-success-foreground font-black py-3.5 rounded-2xl text-sm uppercase"
                >
                  <ThumbsUp className="w-4 h-4" /> Je maîtrise
                </button>
              </div>
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8">
            <h3 className="font-black text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Mes mots
            </h3>
            <ul className="space-y-2">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="rounded-2xl border-2 border-border bg-card px-4 py-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{i.question}</div>
                    <div className="text-[11px] font-bold text-muted-foreground truncate">
                      {i.answer}
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-muted-foreground shrink-0">
                    {masteryLabel(i.mastery)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <BottomNav active="revision" />
    </div>
  );
}
