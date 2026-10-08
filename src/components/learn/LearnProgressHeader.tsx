import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pathLessons } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function LearnProgressHeader() {
  const { progress } = useProgress();
  const completedCount = pathLessons.filter((lesson) => progress.completed.includes(lesson.id)).length;
  const nextLesson = pathLessons.find((lesson) => !progress.completed.includes(lesson.id));
  const percentage = pathLessons.length > 0 ? Math.round((completedCount / pathLessons.length) * 100) : 0;

  return (
    <header className="px-4 pt-5 sm:px-6 sm:pt-8">
      <div className="overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-card">
        <div className="bg-primary px-5 py-5 text-primary-foreground sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase opacity-80">Parcours Fɔngbè</p>
              <h1 className="mt-1 font-display text-2xl font-black sm:text-3xl">Avance à ton rythme</h1>
              <p className="mt-1 text-sm font-bold opacity-85">
                {completedCount} leçon{completedCount === 1 ? "" : "s"} terminée{completedCount === 1 ? "" : "s"} sur {pathLessons.length}
              </p>
            </div>
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15 text-3xl" aria-hidden>
              🌍
            </div>
          </div>

          <div className="mt-5" aria-label={`${percentage} % du parcours terminé`}>
            <div className="mb-2 flex items-center justify-between text-xs font-black">
              <span>Progression générale</span>
              <span>{percentage} %</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-primary-foreground/20">
              <div className="h-full rounded-full bg-gold transition-[width] duration-700" style={{ width: `${percentage}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          <Stat icon={Sparkles} value={progress.xp} label="XP" />
          <Stat icon={Flame} value={progress.streak} label="Série" />
          <Stat icon={Trophy} value={completedCount} label="Leçons" />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-muted-foreground">À suivre</p>
            <p className="truncate text-sm font-black text-foreground">
              {nextLesson?.title ?? "Parcours terminé"}
            </p>
          </div>
          {nextLesson ? (
            <Button asChild size="lg" className="btn-3d shrink-0 rounded-xl font-black">
              <Link to="/lesson/$id" params={{ id: nextLesson.id }}>
                Continuer <ArrowRight />
              </Link>
            </Button>
          ) : (
            <span className="rounded-xl bg-success/10 px-3 py-2 text-sm font-black text-success">Bravo !</span>
          )}
        </div>
      </div>
    </header>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Sparkles; value: number; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-2 py-3.5">
      <Icon className="size-4 text-primary" aria-hidden />
      <div>
        <p className="text-sm font-black leading-none text-foreground">{value}</p>
        <p className="mt-1 text-[10px] font-bold leading-none text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}