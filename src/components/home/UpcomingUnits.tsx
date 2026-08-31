import { Lock, Sparkles } from "lucide-react";

const UPCOMING = [
  { n: 4, title: "École", emoji: "🏫" },
  { n: 5, title: "Maison", emoji: "🏠" },
  { n: 6, title: "Nourriture", emoji: "🍲" },
  { n: 7, title: "Animaux", emoji: "🦁" },
  { n: 8, title: "Marché", emoji: "🧺" },
  { n: 9, title: "Voyage", emoji: "🌍" },
  { n: 10, title: "Culture Fon", emoji: "🥁" },
];

export function UpcomingUnits() {
  return (
    <section>
      <div className="rounded-3xl bg-gradient-to-br from-muted/70 to-muted/30 border border-dashed border-border px-5 py-5 mb-8 text-center">
        <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <Sparkles className="w-3 h-3" /> Bientôt disponible
        </div>
        <h2 className="font-display font-black text-xl tracking-tight mt-1.5">
          Encore 7 mondes à explorer
        </h2>
        <p className="text-[13px] text-muted-foreground font-semibold mt-1">
          Termine ton parcours actuel pour les débloquer
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 stagger-rise">
        {UPCOMING.map((u, i) => {
          const offset = [0, 48, 72, 48, 0, -48, -72][i % 7];
          return (
            <div
              key={u.n}
              style={{ transform: `translateX(${offset}px)` }}
              className="flex flex-col items-center gap-1.5 opacity-70"
            >
              <div className="relative w-20 h-20 rounded-full bg-muted text-muted-foreground grid place-items-center btn-3d border border-border/60">
                <span className="absolute inset-0 grid place-items-center text-3xl opacity-25">
                  {u.emoji}
                </span>
                <Lock className="w-6 h-6 relative" />
                <span className="absolute -top-2 -left-2 bg-card border border-border text-[10px] font-black w-7 h-7 rounded-full grid place-items-center shadow-sm">
                  {u.n}
                </span>
              </div>
              <div className="text-xs font-bold">{u.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
