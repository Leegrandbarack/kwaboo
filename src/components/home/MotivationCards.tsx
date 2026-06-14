import { Flame, Trophy, Target } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function MotivationCards() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;
  const xpToNext = 100 - (progress.xp % 100);

  const cards = [
    {
      icon: <Flame className="w-4 h-4" strokeWidth={1.8} />,
      tone: "coral" as const,
      eyebrow: "Série",
      title: progress.streak > 0 ? `${progress.streak} jour${progress.streak > 1 ? "s" : ""}` : "À démarrer",
      sub: progress.streak > 0 ? "Ne casse pas la chaîne." : "Termine une leçon aujourd'hui.",
    },
    {
      icon: <Trophy className="w-4 h-4" strokeWidth={1.8} />,
      tone: "gold" as const,
      eyebrow: `Niveau ${level + 1}`,
      title: `${xpToNext} XP`,
      sub: "à gagner pour passer le palier.",
    },
    {
      icon: <Target className="w-4 h-4" strokeWidth={1.8} />,
      tone: "primary" as const,
      eyebrow: "Badge",
      title: "Du jour",
      sub: "Une leçon terminée suffit.",
    },
  ];

  return (
    <section className="mt-8 px-4">
      <div className="grid grid-cols-3 gap-2.5">
        {cards.map((c, i) => (
          <article
            key={i}
            className="rounded-xl bg-card border border-border p-3.5 hover:border-foreground/20 transition-colors"
          >
            <div
              className={`w-7 h-7 rounded-md grid place-items-center mb-3 ${
                c.tone === "coral"
                  ? "bg-coral/10 text-coral"
                  : c.tone === "gold"
                  ? "bg-gold/15 text-gold-foreground"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {c.icon}
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.eyebrow}</div>
            <h3 className="font-display text-xl leading-none mt-1">{c.title}</h3>
            <p className="text-[11px] text-muted-foreground mt-2 leading-snug">{c.sub}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
