import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Star } from "lucide-react";
import { sections, pathLessons } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function LearningPath() {
  const { progress } = useProgress();

  const currentIdx = pathLessons.findIndex((l) => !progress.completed.includes(l.id));
  const activeIdx = currentIdx === -1 ? pathLessons.length - 1 : currentIdx;

  let cursor = 0;

  return (
    <div className="space-y-14 pb-32">
      {sections.map((section, si) => {
        const sectionLessons = pathLessons.filter((l) => l.sectionId === section.id);
        const sectionDone = sectionLessons.filter((l) => progress.completed.includes(l.id)).length;
        return (
          <section key={section.id}>
            <SectionHeader
              section={section}
              index={si}
              done={sectionDone}
              total={sectionLessons.length}
            />

            <div className="mt-6 space-y-10">
              {section.units.map((unit, ui) => {
                const unitLessons = pathLessons.filter((l) => l.unitId === unit.id);
                const unitDone = unitLessons.filter((l) => progress.completed.includes(l.id)).length;
                return (
                  <div key={unit.id}>
                    <UnitHeader
                      unit={unit}
                      index={ui}
                      done={unitDone}
                      total={unitLessons.length}
                      color={section.color}
                    />
                    <div className="mt-5 flex flex-col items-center gap-6 stagger-rise">
                      {unitLessons.map((l) => {
                        const globalIdx = cursor++;
                        const done = progress.completed.includes(l.id);
                        const active = globalIdx === activeIdx;
                        const locked = globalIdx > activeIdx;
                        const offset = [0, 48, 72, 48, 0, -48, -72, -48][globalIdx % 8];
                        return (
                          <div key={l.id} style={{ transform: `translateX(${offset}px)` }}>
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
                  </div>
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
    <div className={`mx-4 rounded-3xl ${bg} px-5 py-4 shadow-card`}>
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
        <div className="text-5xl shrink-0" aria-hidden>
          {section.emoji}
        </div>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-black/15 overflow-hidden">
        <div
          className="h-full bg-white/90 rounded-full"
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
  return (
    <div className="mx-4 flex items-center gap-3">
      <div className={`h-px flex-1 ${line}`} />
      <div className="text-center">
        <div className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
          Unité {index + 1} · {done}/{total}
        </div>
        <div className="text-sm font-black flex items-center gap-1.5 justify-center">
          <span aria-hidden>{unit.emoji}</span>
          {unit.title}
        </div>
        <div className="text-[11px] font-semibold text-muted-foreground">{unit.titleFon}</div>
      </div>
      <div className={`h-px flex-1 ${line}`} />
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
    <div className={`relative flex flex-col items-center gap-2 ${locked ? "opacity-60" : ""}`}>
      {active && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] -z-0"
          style={{ width: 96, height: 96, top: -8, left: "50%", transform: "translateX(-50%)" }}
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
            className="animate-spin"
            style={{ transformOrigin: "50px 50px", animationDuration: "4s" }}
          />
        </svg>
      )}
      <div
        className={`relative z-10 w-20 h-20 rounded-full grid place-items-center text-3xl btn-3d press ${
          done ? doneCls : locked ? lockedCls : palette
        } ${shaking ? "lock-shake" : ""}`}
      >
        {done ? (
          <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline className="check-draw" points="4,12 10,18 20,6" />
          </svg>
        ) : locked ? (
          <Lock className="w-7 h-7" />
        ) : (
          <span>{lesson.emoji}</span>
        )}
        {active && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-gold-foreground text-[10px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1 pop-in whitespace-nowrap">
            <Star className="w-3 h-3 fill-current" /> COMMENCER
          </span>
        )}
      </div>
      <div className="text-xs font-bold text-center max-w-[120px] relative z-10">{lesson.title}</div>
    </div>
  );

  if (locked) {
    return (
      <button
        type="button"
        onClick={() => {
          setShaking(true);
          setTimeout(() => setShaking(false), 450);
        }}
        className="block"
        aria-label={`Leçon verrouillée : ${lesson.title}`}
      >
        {inner}
      </button>
    );
  }
  return (
    <Link to="/lesson/$id" params={{ id: lesson.id }} className="block">
      {inner}
    </Link>
  );
}
