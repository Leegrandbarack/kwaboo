import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/learn")({
  head: () => ({ meta: [{ title: "Apprendre — Kwabo" }] }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto pb-32">
        <div className="px-4 pt-4">
          <h1 className="font-display font-black text-2xl">Ton parcours Fɔngbè</h1>
          <p className="text-sm text-muted-foreground font-bold">Sections, unités et leçons : avance pas à pas.</p>
        </div>
        <div className="mt-4"><LearningPath /></div>
      </main>
      <BottomNav active="learn" />
    </div>
  );
}
