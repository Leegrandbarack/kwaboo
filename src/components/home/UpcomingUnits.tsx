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
    <section className="mt-16 px-4">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">À venir</div>
          <h2 className="font-display text-2xl mt-1">Sept mondes encore à explorer</h2>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">07</span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {UPCOMING.map((u) => (
          <li key={u.n} className="flex items-center gap-4 py-4">
            <span className="font-display text-sm text-muted-foreground tabular-nums w-8">{String(u.n).padStart(2, "0")}</span>
            <span className="text-xl opacity-60" aria-hidden>{u.emoji}</span>
            <span className="flex-1 font-medium text-sm">{u.title}</span>
            <Lock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.8} />
          </li>
        ))}
      </ul>
    </section>
  );
}
