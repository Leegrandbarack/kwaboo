import { Link } from "@tanstack/react-router";
import { ArrowRight, Target } from "lucide-react";
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
    <section className="mx-4 mt-4 rise-in">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white p-5 shadow-card">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0 2px, transparent 2px 12px)" }} />
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-gold/30 blur-2xl" aria-hidden />
        <div className="relative">
          <h1 className="font-display font-black text-2xl leading-tight">
            Bonjour {progress.username} <span className="inline-block ayi-float">👋</span>
          </h1>
          <p className="font-medium text-white/90 mt-1">Prêt à apprendre le Fon aujourd&apos;hui&nbsp;?</p>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="opacity-90">Niveau {level}</span>
              <span className="opacity-90">{levelProgress}/100 XP</span>
            </div>
            <div className="h-3 bg-white/25 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full transition-all duration-700 shimmer-overlay relative" style={{ width: `${levelProgress}%` }} />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-bold">
            <Target className="w-4 h-4" />
            <span className="opacity-90">Objectif du jour</span>
            <span className="ml-auto">{todayXp}/{progress.dailyGoal} XP</span>
          </div>
          <div className="h-1.5 mt-1 bg-white/25 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${dailyPct}%` }} />
          </div>

          <Link
            to="/lesson/$id"
            params={{ id: next.id }}
            className="btn-3d mt-5 w-full bg-gold text-gold-foreground font-display font-black px-6 py-4 rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2 text-base"
            style={{ boxShadow: "0 4px 0 0 rgba(0,0,0,0.18)" }}
          >
            Continuer
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  );
}
