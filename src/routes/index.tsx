import { createFileRoute } from "@tanstack/react-router";
import { HeroCard } from "@/components/home/HeroCard";
import { MotivationCards } from "@/components/home/MotivationCards";
import { CultureCard } from "@/components/home/CultureCard";
import { AyiTip } from "@/components/home/AyiTip";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-dvh bg-background">
      <BrandHeader />

      <main className="mx-auto grid max-w-6xl gap-5 px-4 pb-32 pt-5 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)] lg:items-start lg:gap-6 lg:pb-28 lg:pt-7">
        <div className="min-w-0 space-y-5">
          <HeroCard />
          <MotivationCards />
        </div>
        <div className="min-w-0 space-y-5">
          <AyiTip />
          <CultureCard />
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
