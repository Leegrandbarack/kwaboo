import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { allLessons } from "@/lib/curriculum";

export function HeroCard() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;
  const levelProgress = progress.xp % 100;
  const next = allLessons.find((l) => !progress.completed.includes(l.id)) ?? allLessons[0];
  const today = new Date().toISOString().slice(0, 10);
  const todayXp = progress.lastDay === today ? Math.min(progress.dailyGoal, progress.xp) : 0;
  const dailyPct = Math.min(100, Math.round((todayXp / progress.dailyGoal) * 100));

  return (
    <section className="mx-4 mt-6 rise-in">
      <article className="relative overflow-hidden rounded-2xl surface-ink grain p-6 shadow-elevated">
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
            <span className="gold-rule" />
            <span>Bonjour, {progress.username}</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.05] mt-3 max-w-[18ch]">
            Apprends le Fon, <span className="italic text-gold">un mot à la fois.</span>
          </h1>

          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <div>
              <div className="text-white/55 uppercase tracking-[0.18em] text-[10px]">Niveau</div>
              <div className="font-display text-2xl mt-0.5">{level}</div>
            </div>
            <div>
              <div className="text-white/55 uppercase tracking-[0.18em] text-[10px]">XP du jour</div>
              <div className="font-display text-2xl mt-0.5 tabular-nums">{todayXp}<span className="text-white/40 text-base"> / {progress.dailyGoal}</span></div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <ProgressBar label={`Vers le niveau ${level + 1}`} value={levelProgress} />
            <ProgressBar label="Objectif quotidien" value={dailyPct} muted />
          </div>

          <Link
            to="/lesson/$id"
            params={{ id: next.id }}
            className="btn-press mt-7 w-full bg-gold text-gold-foreground font-medium px-5 py-3.5 rounded-lg flex items-center justify-center gap-2 hover:brightness-105"
          >
            Continuer
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </article>
    </section>
  );
}

function ProgressBar({ label, value, muted }: { label: string; value: number; muted?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-white/65 mb-1.5">
        <span>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-[3px] bg-white/15 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${muted ? "bg-white/80" : "bg-gold"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
