import { Flame, Trophy, Target, Clock } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function MotivationCards() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;
  const xpToNext = 100 - (progress.xp % 100);
  const today = new Date().toISOString().slice(0, 10);
  const todayXp = progress.lastDay === today ? progress.xp % 100 : 0;

  const cards = [
    {
      icon: <Flame className="w-5 h-5" />,
      tone: "coral" as const,
      label: "Série",
      value: `${progress.streak}j`,
      sub: progress.streak > 0 ? "Continue la chaîne !" : "Commence aujourd'hui",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      tone: "gold" as const,
      label: `Niv. ${level + 1}`,
      value: `${xpToNext} XP`,
      sub: "avant le prochain palier",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      tone: "primary" as const,
      label: "Aujourd'hui",
      value: `${todayXp} XP`,
      sub: "Encore un petit effort",
    },
    {
      icon: <Target className="w-5 h-5" />,
      tone: "violet" as const,
      label: "Badge",
      value: "1 dispo",
      sub: "Termine une leçon",
    },
  ];

  const toneStyles = {
    coral: {
      wrap: "bg-gradient-to-br from-coral/15 to-coral/5 border-coral/25",
      icon: "bg-coral text-coral-foreground",
      label: "text-coral",
    },
    gold: {
      wrap: "bg-gradient-to-br from-gold/20 to-gold/5 border-gold/40",
      icon: "bg-gold text-gold-foreground",
      label: "text-[color:var(--gold-foreground)]",
    },
    primary: {
      wrap: "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/25",
      icon: "bg-primary text-primary-foreground",
      label: "text-primary",
    },
    violet: {
      wrap: "bg-gradient-to-br from-[oklch(0.75_0.15_290)]/15 to-[oklch(0.75_0.15_290)]/5 border-[oklch(0.75_0.15_290)]/25",
      icon: "bg-[oklch(0.55_0.18_290)] text-white",
      label: "text-[oklch(0.55_0.18_290)]",
    },
  } as const;

  return (
    <section>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {cards.map((c, i) => {
          const s = toneStyles[c.tone];
          return (
            <article
              key={i}
              className={`shrink-0 w-[152px] rounded-2xl p-3.5 border shadow-card lift ${s.wrap}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl grid place-items-center shadow-sm ${s.icon}`}>
                  {c.icon}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${s.label}`}>
                  {c.label}
                </div>
              </div>
              <div className="font-display font-black text-xl mt-2 leading-none tabular-nums">
                {c.value}
              </div>
              <p className="text-[11px] text-muted-foreground font-semibold mt-1 leading-tight">
                {c.sub}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
