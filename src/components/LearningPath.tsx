import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Lock, Play, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections, pathLessons } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function LearningPath() {
  const { progress } = useProgress();

  const currentIdx = pathLessons.findIndex((l) => !progress.completed.includes(l.id));
  const activeIdx = currentIdx === -1 ? pathLessons.length - 1 : currentIdx;

  let cursor = 0;

  if (sections.length === 0) {
    return (
      <div className="mx-4 rounded-[28px] border-2 border-dashed border-border bg-card p-8 text-center">
        <div className="text-4xl">🌱</div>
        <h2 className="font-display font-black text-xl mt-3">Parcours en préparation</h2>
        <p className="text-sm font-bold text-muted-foreground mt-2">
          Le nouveau programme Fɔngbè arrive bientôt, unité par unité.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-4 pb-32 sm:px-6">
      {sections.map((section, si) => {
        const sectionLessons = pathLessons.filter((l) => l.sectionId === section.id);
        const sectionDone = sectionLessons.filter((l) => progress.completed.includes(l.id)).length;
        return (
          <section key={section.id} className="scroll-mt-4">
            <SectionHeader
              section={section}
              index={si}
              done={sectionDone}
              total={sectionLessons.length}
            />

            <div className="mt-5 space-y-6">
              {section.units.map((unit, ui) => {
                const unitLessons = pathLessons.filter((l) => l.unitId === unit.id);
                const unitDone = unitLessons.filter((l) => progress.completed.includes(l.id)).length;
                return (
                  <article key={unit.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <UnitHeader
                      unit={unit}
                      index={ui}
                      done={unitDone}
                      total={unitLessons.length}
                      color={section.color}
                    />
                    <div className="relative flex flex-col items-center gap-7 px-4 py-7 stagger-rise sm:px-8">
                      <div aria-hidden className="absolute bottom-10 top-8 left-1/2 w-1 -translate-x-1/2 rounded-full bg-border/70" />
                      {unitLessons.map((l) => {
                        const globalIdx = cursor++;
                        const done = progress.completed.includes(l.id);
                        const active = globalIdx === activeIdx;
                        const locked = globalIdx > activeIdx;
                        const offsetClass = ["-translate-x-9", "translate-x-4", "translate-x-10", "translate-x-4"][globalIdx % 4];
                        return (
                          <div key={l.id} className={offsetClass}>
                            <LessonNode
                              lesson={l}
                              done={done}
                              active={active}
                              locked={locked}
                              color={section.color}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SectionHeader({
  section,
  index,
  done,
  total,
}: {
  section: (typeof sections)[number];
  index: number;
  done: number;
  total: number;
}) {
  const bg =
    section.color === "primary"
      ? "bg-primary text-primary-foreground"
      : section.color === "gold"
      ? "bg-gold text-gold-foreground"
      : "bg-coral text-coral-foreground";
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className={`rounded-3xl ${bg} px-5 py-4 shadow-card sm:px-6`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-bold opacity-80 uppercase tracking-wider">
            Section {index + 1} · {done}/{total} leçons
          </div>
          <h2 className="text-xl font-black truncate">{section.title}</h2>
          <p className="text-sm opacity-90 truncate">
            {section.titleFon} · {section.subtitle}
          </p>
        </div>
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15" aria-hidden>
          <Trophy className="size-6" />
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-foreground/15">
        <div
          className="h-full rounded-full bg-primary-foreground/90"
          style={{ width: `${pct}%`, transition: "width 600ms var(--ease-out-soft)" }}
        />
      </div>
    </div>
  );
}

function UnitHeader({
  unit,
  index,
  done,
  total,
  color,
}: {
  unit: (typeof sections)[number]["units"][number];
  index: number;
  done: number;
  total: number;
  color: "primary" | "gold" | "coral";
}) {
  const accent =
    color === "primary" ? "text-primary" : color === "gold" ? "text-gold" : "text-coral";
  const line =
    color === "primary" ? "bg-primary/20" : color === "gold" ? "bg-gold/25" : "bg-coral/25";
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="border-b border-border bg-muted/35 px-5 py-4 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={`text-[10px] font-black uppercase ${accent}`}>
            Unité {index + 1} · {done}/{total} leçons
          </div>
          <div className="mt-1 flex items-center gap-2 font-display text-base font-black text-foreground">
            <Star className={`size-4 shrink-0 ${accent}`} aria-hidden />
            <span className="truncate">{unit.title}</span>
          </div>
          <p className="mt-1 text-xs font-bold text-muted-foreground">{unit.objective}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="flex items-center justify-end gap-1 text-xs font-black text-gold-foreground">
            <Trophy className="size-3.5 text-gold" /> +{unit.reward.xp} XP
          </div>
          <p className="mt-1 text-[10px] font-bold text-muted-foreground">{unit.reward.label}</p>
        </div>
      </div>
      <div className={`mt-3 h-1.5 overflow-hidden rounded-full ${line}`}>
        <div className={`h-full rounded-full ${color === "primary" ? "bg-primary" : color === "gold" ? "bg-gold" : "bg-coral"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function LessonNode({
  lesson,
  done,
  active,
  locked,
  color,
}: {
  lesson: { id: string; title: string; emoji: string };
  done: boolean;
  active: boolean;
  locked: boolean;
  color: "primary" | "gold" | "coral";
}) {
  const [shaking, setShaking] = useState(false);
  const palette =
    color === "primary"
      ? "bg-primary text-primary-foreground"
      : color === "gold"
      ? "bg-gold text-gold-foreground"
      : "bg-coral text-coral-foreground";

  const lockedCls = "bg-muted text-muted-foreground";
  const doneCls = "bg-success text-success-foreground";

  const inner = (
    <div className={`relative flex flex-col items-center gap-2 ${locked ? "opacity-65" : ""}`}>
      {active && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute -top-2 left-1/2 -z-0 size-24 -translate-x-1/2"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeOpacity="0.25" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="60 289"
            transform="rotate(-90 50 50)"
            className="origin-center animate-spin [animation-duration:4s]"
          />
        </svg>
      )}
      <div
        className={`relative z-10 grid size-20 place-items-center rounded-full border-4 border-card text-3xl btn-3d press ${
          done ? doneCls : locked ? lockedCls : palette
        } ${shaking ? "lock-shake" : ""}`}
      >
        {done ? (
          <Check className="size-9 check-draw" strokeWidth={3.5} />
        ) : locked ? (
          <Lock className="w-7 h-7" />
        ) : (
          <Play className="size-8 fill-current" />
        )}
        {active && (
            <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-gold px-2 py-0.5 text-[10px] font-black text-gold-foreground shadow pop-in">
            <Star className="w-3 h-3 fill-current" /> COMMENCER
          </span>
        )}
      </div>
      <div className="relative z-10 max-w-36 rounded-xl border border-border bg-card px-3 py-1.5 text-center shadow-sm">
        <p className="text-xs font-black text-foreground">{lesson.title}</p>
        {active && <p className="mt-0.5 text-[10px] font-bold text-primary">Leçon actuelle</p>}
      </div>
    </div>
  );

  if (locked) {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={() => {
          setShaking(true);
          setTimeout(() => setShaking(false), 450);
        }}
        className="h-auto p-0 hover:bg-transparent"
        aria-label={`Leçon verrouillée : ${lesson.title}`}
      >
        {inner}
      </Button>
    );
  }
  return (
    <Link to="/lesson/$id" params={{ id: lesson.id }} className="block">
      {inner}
    </Link>
  );
}
