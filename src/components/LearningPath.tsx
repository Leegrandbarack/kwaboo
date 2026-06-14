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
  const bg =
    world.color === "primary"
      ? "bg-primary text-primary-foreground"
      : world.color === "gold"
      ? "bg-gold text-gold-foreground"
      : "bg-coral text-coral-foreground";
  return (
    <div className={`mx-4 rounded-3xl ${bg} px-5 py-4 shadow-card flex items-center justify-between`}>
      <div>
        <div className="text-xs font-bold opacity-80 uppercase tracking-wider">
          Monde {index + 1}
        </div>
        <h2 className="text-xl font-black">{world.title}</h2>
        <p className="text-sm opacity-90">{world.subtitle}</p>
      </div>
      <div className="text-5xl" aria-hidden>{world.emoji}</div>
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
      ? "bg-primary text-primary-foreground"
      : color === "gold"
      ? "bg-gold text-gold-foreground"
      : "bg-coral text-coral-foreground";

  const lockedCls = "bg-muted text-muted-foreground";
  const doneCls = "bg-success text-success-foreground";

  const ring = active ? "ring-4 ring-offset-4 ring-offset-background ring-gold" : "";

  const inner = (
    <div className={`relative flex flex-col items-center gap-2 ${locked ? "opacity-60" : ""}`}>
      <div
        className={`w-20 h-20 rounded-full grid place-items-center text-3xl btn-3d ${ring} ${
          done ? doneCls : locked ? lockedCls : palette
        }`}
      >
        {done ? <Check className="w-8 h-8" strokeWidth={3} /> : locked ? <Lock className="w-7 h-7" /> : <span>{lesson.emoji}</span>}
        {active && (
          <span className="absolute -top-3 -right-3 bg-gold text-gold-foreground text-[10px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1 pop-in">
            <Star className="w-3 h-3 fill-current" /> COMMENCER
          </span>
        )}
      </div>
      <div className="text-xs font-bold text-center max-w-[120px]">{lesson.title}</div>
    </div>
  );

  if (locked) return inner;
  return (
    <Link to="/lesson/$id" params={{ id: lesson.id }} className="block hover:scale-105 transition-transform">
      {inner}
    </Link>
  );
}
