import { Link } from "@tanstack/react-router";
import { ArrowRight, Target, Sparkles } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { allLessons } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";

export function HeroCard() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;
  const levelProgress = progress.xp % 100;
  const next = allLessons.find((l) => !progress.completed.includes(l.id)) ?? allLessons[0] ?? null;
  const today = new Date().toISOString().slice(0, 10);
  const todayXp = progress.lastDay === today ? Math.min(progress.dailyGoal, progress.xp) : 0;
  const dailyPct = Math.min(100, Math.round((todayXp / progress.dailyGoal) * 100));

  return (
    <section className="rise-in">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 text-primary-foreground shadow-card sm:p-7">
        <div aria-hidden className="absolute inset-y-0 right-0 w-1/3 bg-gold/15" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/25 bg-primary-foreground/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3 h-3" /> Niveau {level}
          </div>

          <h1 className="font-display font-black text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.05] tracking-tight mt-3">
            Bonjour {progress.username}
            <span className="inline-block ayi-float ml-1">👋</span>
          </h1>
          <p className="mt-2 max-w-[46ch] text-sm font-semibold text-primary-foreground/80 sm:text-base">
            Prêt à apprendre le Fɔngbè aujourd&apos;hui&nbsp;?
          </p>

          {next && (
            <div className="mt-5 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70">Prochaine leçon</div>
              <div className="mt-1 flex items-center gap-2 font-display text-lg font-black">
                <span aria-hidden>{next.emoji}</span>
                <span className="min-w-0 truncate">{next.title}</span>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] font-black mb-1.5 uppercase tracking-wider">
              <span className="opacity-90">Progression</span>
              <span className="opacity-90 tabular-nums">{levelProgress}/100 XP</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-foreground/20 ring-1 ring-primary-foreground/10">
              <div
                className="shimmer-overlay relative h-full rounded-full bg-gold transition-all duration-700"
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
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-foreground/20 ring-1 ring-primary-foreground/10">
            <div
              className="h-full rounded-full bg-primary-foreground transition-all duration-700"
              style={{ width: `${dailyPct}%` }}
            />
          </div>

          {next ? (
            <Button asChild className="btn-3d mt-6 h-14 w-full rounded-2xl bg-gold px-7 font-display text-sm font-black uppercase tracking-wider text-gold-foreground hover:bg-gold/90 sm:w-auto sm:min-w-64">
              <Link to="/lesson/$id" params={{ id: next.id }}>
                Continuer la leçon
                <ArrowRight className="size-5" strokeWidth={3} />
              </Link>
            </Button>
          ) : (
            <div className="mt-6 rounded-2xl border border-primary-foreground/25 bg-primary-foreground/15 px-5 py-4 text-sm font-bold">
              Les leçons arrivent très bientôt.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
