import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Lock, Play } from "lucide-react";
import { unitLessons, unitVocab, type Unit } from "@/lib/curriculum";
import { SpeakButton } from "@/components/SpeakButton";

type Props = {
  unit: Unit;
  locked: boolean;
  completed: string[];
  color: "primary" | "gold" | "coral";
  index: number;
};

const RING: Record<Props["color"], string> = {
  primary: "bg-primary",
  gold: "bg-gold",
  coral: "bg-coral",
};

export function UnitCard({ unit, locked, completed, color, index }: Props) {
  const lessons = unitLessons(unit);
  const doneIds = lessons.filter((l) => completed.includes(l.id));
  const pct = lessons.length ? Math.round((doneIds.length / lessons.length) * 100) : 0;
  const unitDone = pct === 100;
  const vocab = useMemo(() => unitVocab(unit), [unit]);
  const [showVocab, setShowVocab] = useState(false);

  return (
    <div
      className={`rounded-3xl border-2 p-4 sm:p-5 bg-card pop-in ${
        locked ? "border-border opacity-60" : unitDone ? "border-success" : "border-border"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl leading-none">{locked ? "🔒" : unit.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-black text-lg leading-tight">{unit.title}</div>
          <div className="text-xs font-bold text-muted-foreground">{unit.titleFon}</div>
          <p className="text-sm text-muted-foreground mt-1">{unit.objective}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase font-black text-muted-foreground">Récompense</div>
          <div className="text-xl">{unit.reward.badge}</div>
          <div className="text-[11px] font-black text-gold">+{unit.reward.xp} XP</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${RING[color]}`}
            style={{ width: `${pct}%`, transition: "width 600ms var(--ease-out-soft)" }}
          />
        </div>
        <span className="text-[11px] font-black text-muted-foreground tabular-nums">
          {doneIds.length}/{lessons.length}
        </span>
      </div>

      {vocab.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowVocab((v) => !v)}
            aria-expanded={showVocab}
            className="press w-full flex items-center gap-2 rounded-2xl border-2 border-border bg-muted/40 px-3 py-2 text-left"
          >
            <span className="text-base">📖</span>
            <span className="flex-1 text-[11px] font-black uppercase tracking-wider text-muted-foreground">
              Mots-clés · {vocab.length}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground shrink-0 ${showVocab ? "rotate-180" : ""}`}
              style={{ transition: "transform 260ms var(--ease-out-soft)" }}
            />
          </button>
          {showVocab && (
            <ul className="mt-2 space-y-1.5">
              {vocab.map((w) => (
                <li
                  key={w.fon}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-black text-sm truncate">{w.fon}</div>
                    <div className="text-[11px] font-bold text-muted-foreground truncate">{w.fr}</div>
                  </div>
                  <SpeakButton text={w.fon} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ul className="mt-3 space-y-2">
        {lessons.map((l, i) => {
          const isDone = completed.includes(l.id);
          const prevDone = i === 0 || completed.includes(lessons[i - 1]!.id);
          const isLocked = locked || (!isDone && !prevDone);
          const content = (
            <div
              className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 ${
                isDone
                  ? "border-success/60 bg-success/10"
                  : isLocked
                    ? "border-border bg-muted/50"
                    : "border-primary/50 bg-primary/5"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full grid place-items-center shrink-0 ${
                  isDone
                    ? "bg-success text-success-foreground"
                    : isLocked
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : isLocked ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm truncate">{l.title}</div>
                <div className="text-[11px] font-bold text-muted-foreground truncate">
                  {l.exercises.length} exercices
                </div>
              </div>
            </div>
          );
          return (
            <li key={l.id}>
              {isLocked ? (
                <div aria-disabled className="cursor-not-allowed">
                  {content}
                </div>
              ) : (
                <Link to="/lesson/$id" params={{ id: l.id }} className="press block">
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
