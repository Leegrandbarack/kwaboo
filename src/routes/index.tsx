import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";
import { TopBar } from "@/components/home/TopBar";
import { HeroCard } from "@/components/home/HeroCard";
import { MotivationCards } from "@/components/home/MotivationCards";
import { CultureCard } from "@/components/home/CultureCard";
import { AyiTip } from "@/components/home/AyiTip";
import { UpcomingUnits } from "@/components/home/UpcomingUnits";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kwabo — Apprends le Fɔngbè avec AYI" },
      {
        name: "description",
        content:
          "Kwabo : la référence mondiale pour apprendre les langues africaines. Commence par le Fon (Fɔngbè) avec AYI, ta mascotte intelligente.",
      },
      { property: "og:title", content: "Kwabo — Apprends le Fɔngbè avec AYI" },
      { property: "og:description", content: "L'apprentissage des langues béninoises, en immersion." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="max-w-2xl mx-auto pb-32">
        <HeroCard />
        <MotivationCards />
        <AyiTip />
        <CultureCard />

        <div className="mt-10 px-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-black text-xl">Ton parcours</h2>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Aventure Fɔngbè
            </span>
          </div>
        </div>

        <div className="mt-4">
          <LearningPath />
        </div>

        <UpcomingUnits />
      </main>
      <BottomNav active="home" />
    </div>
  );
}
