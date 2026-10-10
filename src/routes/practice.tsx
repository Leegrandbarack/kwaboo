import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { Exercise } from "@/lib/curriculum";
import { practiceItems } from "@/lib/review";
import { ExercisePlayer } from "@/components/exercises/ExercisePlayer";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "S'entraîner — Kwabo" },
      { name: "description", content: "Révise les lettres et mots fɔngbè les plus fragiles au bon moment." },
      { property: "og:title", content: "S'entraîner — Kwabo" },
      { property: "og:description", content: "Séance de révision espacée en Fɔngbè avec AYI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  useEffect(() => {
    setExercises(practiceItems(10).flatMap((i) => (i.exercise ? [i.exercise] : [])));
  }, []);

  if (exercises === null) return <div className="min-h-dvh" />;
  if (exercises.length === 0) {
    return (
      <div className="min-h-dvh grid place-items-center p-6 text-center">
        <div className="max-w-sm">
          <div className="text-5xl" aria-hidden>🌱</div>
          <h1 className="font-display font-black text-xl mt-3">Rien à revoir pour l'instant</h1>
          <p className="text-sm font-bold text-muted-foreground mt-2">Termine une leçon : les éléments à renforcer apparaîtront ici.</p>
          <Link to="/learn" className="btn-3d mt-6 inline-flex bg-primary text-primary-foreground font-display font-black px-6 py-3 rounded-2xl uppercase text-sm">
            Retour au parcours
          </Link>
        </div>
      </div>
    );
  }
  return <ExercisePlayer lessonId="practice" lessonTitle="Entraînement" exercises={exercises} practice />;
}
