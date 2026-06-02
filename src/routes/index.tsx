import { createFileRoute } from "@tanstack/react-router";
import { StatBar } from "@/components/StatBar";
import { LearningPath } from "@/components/LearningPath";
import { AyiBubble } from "@/components/Ayi";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kwabo — Apprends le Fɔngbè avec AYI" },
      {
        name: "description",
        content:
          "Kwabo est l'application qui préserve et enseigne les langues africaines. Commence par le Fon (Fɔngbè) avec AYI, ta mascotte intelligente.",
      },
      { property: "og:title", content: "Kwabo — Apprends le Fɔngbè avec AYI" },
      { property: "og:description", content: "L'apprentissage des langues béninoises, en immersion." },
    ],
  }),
  component: Home,
});

function Home() {
  const { progress } = useProgress();
  const greeting =
    progress.completed.length === 0
      ? "Aɖabɔ ! Je suis AYI. Prêt(e) à apprendre tes premiers mots en Fɔngbè ?"
      : progress.streak > 1
      ? `Awanou ! ${progress.streak} jours d'affilée, continue comme ça !`
      : "Heureux de te revoir ! Reprenons où nous en étions.";

  return (
    <div className="min-h-dvh bg-background">
      <StatBar />
      <main className="max-w-2xl mx-auto px-4 pt-6">
        <div className="mb-8">
          <AyiBubble mood={progress.completed.length === 0 ? "happy" : "cheer"}>
            {greeting}
          </AyiBubble>
        </div>
        <LearningPath />
      </main>
    </div>
  );
}
