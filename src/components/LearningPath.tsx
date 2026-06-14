import { Link } from "@tanstack/react-router";
import { Check, Lock, Star } from "lucide-react";
import { worlds, allLessons } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export function LearningPath() {
  const { progress } = useProgress();

  // Determine current unlocked lesson index (sequential)
  const currentIdx = allLessons.findIndex((l) => !progress.completed.includes(l.id));
  const activeIdx = currentIdx === -1 ? allLessons.length - 1 : currentIdx;

  return (
    <div className="space-y-12 pb-32">
      {worlds.map((world, wi) => {
        const worldLessons = allLessons.filter((l) => l.worldId === world.id);
        const worldStart = allLessons.findIndex((l) => l.worldId === world.id);
        return (
          <section key={world.id}>
            <WorldHeader world={world} index={wi} />
            <div className="mt-6 flex flex-col items-center gap-6">
              {worldLessons.map((l, i) => {
                const globalIdx = worldStart + i;
                const done = progress.completed.includes(l.id);
                const active = globalIdx === activeIdx;
                const locked = globalIdx > activeIdx;
                // zig-zag offset
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

function WorldHeader({ world, index }: { world: (typeof worlds)[number]; index: number }) {
  const accent =
    world.color === "primary"
      ? "text-primary"
      : world.color === "gold"
      ? "text-gold-foreground"
      : "text-coral";
  return (
    <div className="mx-4 flex items-end justify-between gap-4 pb-4 border-b border-border">
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className={`gold-rule ${accent}`} style={{ background: "currentColor" }} />
          <span>Monde {String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2 className="font-display text-3xl mt-2 leading-tight">{world.title}</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">{world.subtitle}</p>
      </div>
      <div className="text-4xl opacity-80" aria-hidden>{world.emoji}</div>
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
  const palette =
    color === "primary"
      ? "bg-primary text-primary-foreground border-primary"
      : color === "gold"
      ? "bg-gold text-gold-foreground border-gold"
      : "bg-coral text-coral-foreground border-coral";

  const lockedCls = "bg-transparent text-muted-foreground border-border";
  const doneCls = "bg-success text-success-foreground border-success";

  const ring = active ? "ring-1 ring-offset-4 ring-offset-background ring-foreground" : "";

  const inner = (
    <div className={`relative flex flex-col items-center gap-2.5 ${locked ? "opacity-55" : ""}`}>
      <div
        className={`w-16 h-16 rounded-full grid place-items-center text-2xl border btn-press transition-shadow ${ring} ${
          done ? doneCls : locked ? lockedCls : palette
        } ${!locked && !done ? "shadow-card" : ""}`}
      >
        {done ? <Check className="w-6 h-6" strokeWidth={2} /> : locked ? <Lock className="w-4 h-4" strokeWidth={1.8} /> : <span>{lesson.emoji}</span>}
        {active && (
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full flex items-center gap-1 pop-in">
            <Star className="w-2.5 h-2.5 fill-current" /> En cours
          </span>
        )}
      </div>
      <div className="text-xs font-medium text-center max-w-[120px] text-foreground/80">{lesson.title}</div>
    </div>
  );

  if (locked) return inner;
  return (
    <Link to="/lesson/$id" params={{ id: lesson.id }} className="block hover:opacity-90 transition-opacity">
      {inner}
    </Link>
  );
}
