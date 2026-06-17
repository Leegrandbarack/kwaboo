import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Lock, Star } from "lucide-react";
import { worlds, allLessons } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function LearningPath() {
  const { progress } = useProgress();

  const currentIdx = allLessons.findIndex((l) => !progress.completed.includes(l.id));
  const activeIdx = currentIdx === -1 ? allLessons.length - 1 : currentIdx;

  return (
    <div className="space-y-12 pb-32">
      {worlds.map((world, wi) => {
        const worldLessons = allLessons.filter((l) => l.worldId === world.id);
        const worldStart = allLessons.findIndex((l) => l.worldId === world.id);
        const worldDone = worldLessons.filter((l) => progress.completed.includes(l.id)).length;
        return (
          <section key={world.id}>
            <WorldHeader world={world} index={wi} done={worldDone} total={worldLessons.length} />
            <div className="mt-6 flex flex-col items-center gap-6 stagger-rise">
              {worldLessons.map((l, i) => {
                const globalIdx = worldStart + i;
                const done = progress.completed.includes(l.id);
                const active = globalIdx === activeIdx;
                const locked = globalIdx > activeIdx;
                const offset = [0, 60, 90, 60, 0, -60, -90, -60][i % 8];
                return (
                  <div key={l.id} style={{ transform: `translateX(${offset}px)` }}>
                    <LessonNode lesson={l} done={done} active={active} locked={locked} color={world.color} />
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

function WorldHeader({ world, index, done, total }: { world: (typeof worlds)[number]; index: number; done: number; total: number }) {
  const bg =
    world.color === "primary"
      ? "bg-primary text-primary-foreground"
      : world.color === "gold"
      ? "bg-gold text-gold-foreground"
      : "bg-coral text-coral-foreground";
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className={`mx-4 rounded-3xl ${bg} px-5 py-4 shadow-card`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold opacity-80 uppercase tracking-wider">
            Monde {index + 1} · {done}/{total}
          </div>
          <h2 className="text-xl font-black">{world.title}</h2>
          <p className="text-sm opacity-90">{world.subtitle}</p>
        </div>
        <div className="text-5xl" aria-hidden>{world.emoji}</div>
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
            style={{ transformOrigin: "50px 50px", animation: "spin 4s linear infinite" }}
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
