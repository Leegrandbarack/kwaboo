import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";
import { BottomNav } from "@/components/home/BottomNav";
import { LearnProgressHeader } from "@/components/learn/LearnProgressHeader";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Apprendre le Fɔngbè — Kwabo" },
      { name: "description", content: "Progresse en Fɔngbè avec un parcours structuré en niveaux, unités et leçons interactives." },
      { property: "og:title", content: "Apprendre le Fɔngbè — Kwabo" },
      { property: "og:description", content: "Un parcours vivant pour apprendre le Fɔngbè pas à pas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="min-h-dvh bg-background">
      <main className="mx-auto max-w-6xl pb-32 lg:grid lg:grid-cols-[360px_minmax(0,672px)] lg:justify-center lg:gap-8 lg:px-6">
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <LearnProgressHeader />
        </div>
        <div className="mt-8 lg:mt-6">
          <div className="mb-4 px-4 sm:px-6">
            <p className="text-xs font-black uppercase text-primary">Ton programme</p>
            <h2 className="mt-1 font-display text-xl font-black text-foreground">Le chemin vers la maîtrise</h2>
          </div>
          <LearningPath />
        </div>
      </main>
      <BottomNav active="learn" />
    </div>
  );
}
