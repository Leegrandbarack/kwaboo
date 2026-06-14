import { Lock } from "lucide-react";

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
    <section className="mt-10">
      <div className="mx-4 rounded-3xl bg-muted/60 border-2 border-dashed border-border px-5 py-4 mb-4 text-center">
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Bientôt disponible
        </div>
        <h2 className="font-display font-black text-lg mt-0.5">
          Encore 7 mondes à explorer
        </h2>
      </div>

      <div className="flex flex-col items-center gap-5">
        {UPCOMING.map((u, i) => {
          const offset = [0, 60, 90, 60, 0, -60, -90][i % 7];
          return (
            <div
              key={u.n}
              style={{ transform: `translateX(${offset}px)` }}
              className="flex flex-col items-center gap-1.5 opacity-70"
            >
              <div className="relative w-20 h-20 rounded-full bg-muted text-muted-foreground grid place-items-center text-3xl btn-3d">
                <span className="absolute inset-0 grid place-items-center opacity-30">
                  {u.emoji}
                </span>
                <Lock className="w-6 h-6 relative" />
                <span className="absolute -top-2 -left-2 bg-card border-2 border-border text-[10px] font-black w-7 h-7 rounded-full grid place-items-center">
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
