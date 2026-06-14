import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";
import { TopBar } from "@/components/home/TopBar";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/learn")({
  head: () => ({ meta: [{ title: "Apprendre — Kwabo" }] }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="max-w-2xl mx-auto pb-32">
        <div className="px-4 pt-8">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Apprendre</div>
          <h1 className="font-display text-4xl mt-2 leading-tight">Ton parcours <span className="italic">Fɔngbè</span></h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">Suis le chemin, leçon après leçon, et débloque chaque monde à ton rythme.</p>
          <div className="hairline mt-6" />
        </div>
        <div className="mt-8"><LearningPath /></div>
      </main>
      <BottomNav active="learn" />
    </div>
  );
}
