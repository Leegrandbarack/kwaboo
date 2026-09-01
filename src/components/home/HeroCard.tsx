import { Link } from "@tanstack/react-router";
import { ArrowRight, Target, Sparkles } from "lucide-react";
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
    <section className="rise-in mx-4">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-hero text-white p-6 shadow-card">
        {/* Decorative layers */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.6) 0 1.5px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.4) 0 1.5px, transparent 2px)",
            backgroundSize: "26px 26px, 40px 40px",
          }}
        />
        <div className="absolute -right-12 -top-14 w-56 h-56 rounded-full bg-gold/40 blur-3xl" aria-hidden />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-coral/30 blur-3xl" aria-hidden />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Niveau {level}
          </div>

          <h1 className="font-display font-black text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.05] tracking-tight mt-3">
            Bonjour {progress.username}
            <span className="inline-block ayi-float ml-1">👋</span>
          </h1>
          <p className="font-semibold text-white/80 mt-2 text-sm sm:text-base max-w-[46ch]">
            Prêt à apprendre le Fɔngbè aujourd&apos;hui&nbsp;?
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] font-black mb-1.5 uppercase tracking-wider">
              <span className="opacity-90">Progression</span>
              <span className="opacity-90 tabular-nums">{levelProgress}/100 XP</span>
            </div>
            <div className="h-2.5 bg-black/20 rounded-full overflow-hidden ring-1 ring-white/10">
              <div
                className="h-full bg-gradient-to-r from-gold to-white rounded-full transition-all duration-700 shimmer-overlay relative"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span className="opacity-90">Objectif du jour</span>
            <span className="ml-auto tabular-nums">
              {todayXp}/{progress.dailyGoal} XP
            </span>
          </div>
          <div className="h-2 mt-1.5 bg-black/20 rounded-full overflow-hidden ring-1 ring-white/10">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${dailyPct}%` }}
            />
          </div>

          <Link
            to="/lesson/$id"
            params={{ id: next.id }}
            className="btn-3d mt-7 w-full sm:w-auto sm:min-w-[268px] bg-gold text-gold-foreground font-display font-black px-7 py-4 rounded-2xl uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 text-[15px]"
          >
            Continuer la leçon
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  );
}
