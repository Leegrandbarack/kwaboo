import { createFileRoute } from "@tanstack/react-router";
import { LearningPath } from "@/components/LearningPath";
import { HeroCard } from "@/components/home/HeroCard";
import { MotivationCards } from "@/components/home/MotivationCards";
import { CultureCard } from "@/components/home/CultureCard";
import { AyiTip } from "@/components/home/AyiTip";
import { UpcomingUnits } from "@/components/home/UpcomingUnits";
import { BottomNav } from "@/components/home/BottomNav";
import { SideNav } from "@/components/home/SideNav";

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

      <div className="relative mx-auto w-full max-w-2xl lg:max-w-6xl lg:px-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:gap-8 lg:items-start">
        <SideNav active="home" />

        <main className="pb-32 pt-4 lg:pt-6 lg:pb-16 min-w-0">
          <HeroCard />

          <div className="lg:hidden">
            <MotivationCards />
            <AyiTip />
            <CultureCard />
          </div>

          <div className="mt-10 px-4 lg:px-0">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Aventure Fɔngbè
                </div>
                <h2 className="font-display font-black text-2xl leading-tight mt-0.5 truncate">
                  Ton parcours
                </h2>
              </div>
              <span className="shrink-0 text-[10px] font-black text-muted-foreground uppercase tracking-widest pb-1">
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

        <aside className="hidden lg:block sticky top-6 pt-6">
          <MotivationCards />
          <AyiTip />
          <CultureCard />
        </aside>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
