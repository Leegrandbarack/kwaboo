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
    <div className="min-h-dvh bg-background relative overflow-hidden">
      {/* Ambient background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-64 -left-32 w-72 h-72 rounded-full bg-gold/15 blur-3xl"
      />

      <TopBar />
      <main className="max-w-2xl mx-auto pb-32 relative">
        <HeroCard />
        <MotivationCards />
        <AyiTip />
        <CultureCard />

        <div className="mt-10 px-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary">
                Aventure Fɔngbè
              </div>
              <h2 className="font-display font-black text-2xl leading-tight mt-0.5">
                Ton parcours
              </h2>
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pb-1">
              Chapitre 1
            </span>
          </div>
          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
