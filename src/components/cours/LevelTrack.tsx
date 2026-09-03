import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Level, Section } from "@/lib/curriculum";
import { LEVEL_LABEL } from "@/lib/curriculum";
import { UnitCard } from "./UnitCard";

type Props = {
  level: Level;
  sections: Section[];
  completed: string[];
  /** ids d'unités verrouillées */
  lockedUnitIds: Set<string>;
  defaultOpen?: boolean;
};

const ACCENT: Record<Level, string> = {
  beginner: "text-primary",
  intermediate: "text-gold",
  advanced: "text-coral",
};

export function LevelTrack({ level, sections, completed, lockedUnitIds, defaultOpen }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);
  const units = sections.flatMap((s) => s.units);
  const total = units.reduce((n, u) => n + u.lessonIds.length, 0);
  const done = units.reduce(
    (n, u) => n + u.lessonIds.filter((id) => completed.includes(id)).length,
    0
  );

  return (
    <section className="rounded-3xl border-2 border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="press w-full flex items-center gap-3 px-4 py-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className={`text-[11px] font-black uppercase tracking-wider ${ACCENT[level]}`}>
            Niveau
          </div>
          <div className="font-display font-black text-xl">{LEVEL_LABEL[level]}</div>
          <div className="text-xs font-bold text-muted-foreground tabular-nums">
            {done}/{total} leçons · {units.length} unités
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 ${open ? "rotate-180" : ""}`}
          style={{ transition: "transform 260ms var(--ease-out-soft)" }}
        />
      </button>

      {open && (
        <div className="px-3 pb-4 space-y-5">
          {sections.map((s) => (
            <div key={s.id}>
              <div className="px-1 pb-2">
                <div className="font-black text-sm">
                  {s.emoji} {s.title}
                </div>
                <div className="text-[11px] font-bold text-muted-foreground">{s.subtitle}</div>
              </div>
              <div className="space-y-3">
                {s.units.map((u, i) => (
                  <UnitCard
                    key={u.id}
                    unit={u}
                    index={i}
                    color={s.color}
                    completed={completed}
                    locked={lockedUnitIds.has(u.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
