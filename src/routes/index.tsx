import { createFileRoute } from "@tanstack/react-router";
import { HeroCard } from "@/components/home/HeroCard";
import { MotivationCards } from "@/components/home/MotivationCards";
import { CultureCard } from "@/components/home/CultureCard";
import { AyiTip } from "@/components/home/AyiTip";
import { UpcomingUnits } from "@/components/home/UpcomingUnits";
import { BottomNav } from "@/components/home/BottomNav";
import { BrandHeader } from "@/components/home/BrandHeader";

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

      <BrandHeader />

      <main className="relative max-w-2xl mx-auto pt-4 pb-32">
        <HeroCard />

        <div className="mt-6">
          <MotivationCards />
        </div>

        <div className="mt-6">
          <AyiTip />
        </div>

        <div className="mt-6">
          <CultureCard />
        </div>

        <div className="mt-10">
          <UpcomingUnits />
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
