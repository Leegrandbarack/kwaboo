import { Flame, Trophy, Target } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function MotivationCards() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;
  const xpToNext = 100 - (progress.xp % 100);

  const cards = [
    {
      icon: <Flame className="w-5 h-5" />,
      tone: "coral" as const,
      title: progress.streak > 0 ? `Série de ${progress.streak} jour${progress.streak > 1 ? "s" : ""} !` : "Démarre ta série",
      sub: progress.streak > 0 ? "Continue, ne casse pas la chaîne !" : "Termine une leçon aujourd'hui.",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      tone: "gold" as const,
      title: `Plus que ${xpToNext} XP`,
      sub: `pour passer au niveau ${level + 1}.`,
    },
    {
      icon: <Target className="w-5 h-5" />,
      tone: "primary" as const,
      title: "Badge du jour",
      sub: "Termine une leçon pour le gagner.",
    },
  ];

  return (
    <section className="mt-6 px-4">
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
        {cards.map((c, i) => (
          <article
            key={i}
            className={`snap-start shrink-0 w-[78%] max-w-[280px] rounded-2xl p-4 shadow-card border-2 ${
              c.tone === "coral"
                ? "bg-coral/10 border-coral/30"
                : c.tone === "gold"
                ? "bg-gold/15 border-gold/40"
                : "bg-primary/10 border-primary/30"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl grid place-items-center mb-2 ${
                c.tone === "coral"
                  ? "bg-coral text-coral-foreground"
                  : c.tone === "gold"
                  ? "bg-gold text-gold-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {c.icon}
            </div>
            <h3 className="font-display font-black text-sm leading-tight">{c.title}</h3>
            <p className="text-xs text-muted-foreground font-medium mt-1">{c.sub}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
