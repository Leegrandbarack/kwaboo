import { useState, useMemo } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { X, Check, Lightbulb, Heart } from "lucide-react";
import type { Exercise } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { Ayi, AyiBubble } from "@/components/Ayi";
import { Confetti } from "@/components/Confetti";
import { QuitLessonDialog } from "@/components/QuitLessonDialog";
import { sound } from "@/lib/sound";

type Props = {
  lessonId: string;
  lessonTitle: string;
  exercises: Exercise[];
};

export function ExercisePlayer({ lessonId, lessonTitle, exercises }: Props) {
  const navigate = useNavigate();
  const { progress, completeLesson, loseHeart } = useProgress();

  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<unknown>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [showQuit, setShowQuit] = useState(false);

  const total = exercises.length;
  const ex = exercises[idx];
  const progressPct = ((idx + (checked ? 1 : 0)) / total) * 100;

  // Block lesson if no hearts and not unlimited
  if (!done && progress.hearts <= 0 && !progress.unlimitedHearts) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center p-6 text-center gap-4">
        <Ayi size={140} mood="sad" />
        <h1 className="font-display font-black text-2xl">Plus de cœurs !</h1>
        <p className="text-muted-foreground max-w-sm">Attends qu&apos;ils se régénèrent ou recharge-les depuis la boutique.</p>
        <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
          <Link to="/no-hearts" className="btn-3d bg-coral text-coral-foreground font-black py-3 rounded-2xl uppercase">Obtenir des cœurs</Link>
          <Link to="/" className="font-bold text-muted-foreground py-2">Retour</Link>
        </div>
      </div>
    );
  }

  function check(isCorrect: boolean) {
    setChecked(true);
    setCorrect(isCorrect);
    if (isCorrect) {
      sound.correct();
    } else {
      sound.wrong();
      setMistakes((m) => m + 1);
      loseHeart();
      recordMistake({
        question: questionText(ex),
        answer: correctText(ex),
        lessonId,
        lessonTitle,
      });
    }
  }


  function next() {
    setChecked(false);
    setAnswer(null);
    setShowHint(false);
    if (idx + 1 >= total) {
      const xp = Math.max(5, 20 - mistakes * 2);
      completeLesson(lessonId, xp, mistakes === 0);
      sound.finish();
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
  }

  if (done) {
    const xpGained = Math.max(5, 20 - mistakes * 2);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6 bg-gradient-hero text-white">
        <Confetti trigger={true} />
        <Ayi size={160} mood="cheer" />
        <h1 className="text-4xl font-display font-black">Awanou ! 🎉</h1>
        <p className="text-white/90 max-w-sm font-medium">
          Tu as terminé « {lessonTitle} ». AYI est très fier de toi !
        </p>
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          <Stat label="XP" value={`+${xpGained}`} />
          <Stat label="Précision" value={`${Math.round(((total - mistakes) / total) * 100)}%`} />
          <Stat label="Gemmes" value={mistakes === 0 ? "+10" : "+5"} />
        </div>
        <button
          onClick={() => navigate({ to: "/" })}
          className="btn-3d mt-4 bg-white text-primary font-black px-10 py-4 rounded-2xl uppercase tracking-wider"
          style={{ boxShadow: "0 4px 0 0 rgba(0,0,0,0.2)" }}
        >
          Continuer
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-dvh flex flex-col ${checked ? (correct ? "flash-success" : "flash-error") : ""}`}>
      <QuitLessonDialog open={showQuit} onCancel={() => setShowQuit(false)} onConfirm={() => navigate({ to: "/" })} />
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <button aria-label="Quitter" onClick={() => setShowQuit(true)} className="press text-muted-foreground hover:text-foreground p-2 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progressPct}%`, transition: "width 500ms var(--ease-out-soft)" }}
          />
        </div>
        <div className="flex items-center gap-1 text-coral font-display font-black">
          <Heart className="w-5 h-5 fill-current" />
          <span className="tabular-nums">{progress.unlimitedHearts ? "∞" : progress.hearts}</span>
        </div>
      </div>

      <div
        key={idx}
        className={`flex-1 px-4 py-6 max-w-2xl w-full mx-auto pop-in ${checked && !correct ? "shake" : ""}`}
      >
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{ex.prompt}</div>
        <ExerciseBody ex={ex} answer={answer} setAnswer={setAnswer} disabled={checked} />
        {ex.type === "choice" && ex.hint && !checked && (
          <button onClick={() => setShowHint((s) => !s)} className="press mt-4 inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground">
            <Lightbulb className="w-4 h-4" /> {showHint ? "Cacher l'indice" : "Indice d'AYI"}
          </button>
        )}
        {showHint && ex.type === "choice" && ex.hint && (
          <div className="mt-3"><AyiBubble mood="thinking">{ex.hint}</AyiBubble></div>
        )}
      </div>

      <Footer ex={ex} answer={answer} checked={checked} correct={correct} onCheck={check} onNext={next} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl p-3">
      <div className="text-[10px] uppercase tracking-wider font-black opacity-80">{label}</div>
      <div className="font-display font-black text-xl">{value}</div>
    </div>
  );
}

function ExerciseBody({ ex, answer, setAnswer, disabled }: { ex: Exercise; answer: unknown; setAnswer: (v: unknown) => void; disabled: boolean }) {
  if (ex.type === "choice") {
    return (
      <>
        <h2 className="text-2xl font-black mb-6">{ex.question}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ex.options.map((o) => {
            const selected = answer === o;
            return (
              <button
                key={o}
                disabled={disabled}
                onClick={() => setAnswer(o)}
                className={`btn-3d text-left px-4 py-4 rounded-2xl border-2 font-bold text-base transition-colors ${selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/50"}`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  if (ex.type === "translate") {
    return (
      <>
        <h2 className="text-xl font-bold mb-2">Traduis cette {ex.to === "fon" ? "phrase en Fon" : "phrase en français"}</h2>
        <div className="bg-card border-2 border-border rounded-2xl p-5 mb-6">
          <div className="text-3xl font-black">{ex.from}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ex.choices.map((c) => {
            const selected = answer === c;
            return (
              <button
                key={c}
                disabled={disabled}
                onClick={() => setAnswer(c)}
                className={`btn-3d px-4 py-4 rounded-2xl border-2 font-bold ${selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/50"}`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  if (ex.type === "order") return <OrderExercise ex={ex} answer={answer as string[] | null} setAnswer={setAnswer} disabled={disabled} />;
  if (ex.type === "match") return <MatchExercise ex={ex} answer={answer as Record<string, string> | null} setAnswer={setAnswer} disabled={disabled} />;
  return null;
}

function OrderExercise({ ex, answer, setAnswer, disabled }: { ex: Extract<Exercise, { type: "order" }>; answer: string[] | null; setAnswer: (v: string[]) => void; disabled: boolean }) {
  const picked = answer ?? [];
  const shuffled = useMemo(() => [...ex.words].sort(() => Math.random() - 0.5), [ex.words]);
  const available: string[] = [];
  const pickedCopy = [...picked];
  for (const w of shuffled) {
    const i = pickedCopy.indexOf(w);
    if (i >= 0) pickedCopy.splice(i, 1);
    else available.push(w);
  }
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Reconstruis la phrase :</h2>
      <div className="text-muted-foreground italic mb-4">« {ex.french} »</div>
      <div className="min-h-20 border-b-2 border-dashed border-border py-3 mb-6 flex flex-wrap gap-2">
        {picked.map((w, i) => (
          <button key={i} disabled={disabled} onClick={() => setAnswer(picked.filter((_, j) => j !== i))} className="btn-3d bg-card border-2 border-border px-3 py-2 rounded-xl font-bold">{w}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {available.map((w, i) => (
          <button key={i} disabled={disabled} onClick={() => setAnswer([...picked, w])} className="btn-3d bg-card border-2 border-border px-3 py-2 rounded-xl font-bold hover:border-primary/50">{w}</button>
        ))}
      </div>
    </>
  );
}

function MatchExercise({ ex, answer, setAnswer, disabled }: { ex: Extract<Exercise, { type: "match" }>; answer: Record<string, string> | null; setAnswer: (v: Record<string, string>) => void; disabled: boolean }) {
  const matches = answer ?? {};
  const [activeFr, setActiveFr] = useState<string | null>(null);
  const fonShuffled = useMemo(() => [...ex.pairs].map((p) => p.fon).sort(() => Math.random() - 0.5), [ex.pairs]);
  function pickFr(fr: string) {
    if (matches[fr]) {
      const { [fr]: _omit, ...rest } = matches;
      setAnswer(rest); setActiveFr(null); return;
    }
    setActiveFr(fr);
  }
  function pickFon(fon: string) {
    if (!activeFr) return;
    if (Object.values(matches).includes(fon)) return;
    setAnswer({ ...matches, [activeFr]: fon });
    setActiveFr(null);
  }
  return (
    <>
      <h2 className="text-lg font-bold mb-4">Associe chaque mot :</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {ex.pairs.map((p) => {
            const matched = !!matches[p.fr];
            const active = activeFr === p.fr;
            return (
              <button key={p.fr} disabled={disabled} onClick={() => pickFr(p.fr)} className={`btn-3d w-full px-3 py-3 rounded-xl border-2 font-bold text-sm ${matched ? "bg-success/15 border-success text-success" : active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card"}`}>
                {p.fr} {matched && `→ ${matches[p.fr]}`}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {fonShuffled.map((fon) => {
            const used = Object.values(matches).includes(fon);
            return (
              <button key={fon} disabled={disabled || used} onClick={() => pickFon(fon)} className={`btn-3d w-full px-3 py-3 rounded-xl border-2 font-bold text-sm ${used ? "opacity-40 bg-muted border-border" : "border-border bg-card hover:border-primary/50"}`}>
                {fon}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Footer({ ex, answer, checked, correct, onCheck, onNext }: { ex: Exercise; answer: unknown; checked: boolean; correct: boolean; onCheck: (c: boolean) => void; onNext: () => void }) {
  const ready = isReady(ex, answer);
  function handleCheck() { onCheck(isCorrect(ex, answer)); }
  if (checked) {
    return (
      <div className={`border-t-2 ${correct ? "bg-success/15 border-success" : "bg-destructive/10 border-destructive"}`}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full grid place-items-center ${correct ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}>
              {correct ? <Check className="w-6 h-6" strokeWidth={3} /> : <X className="w-6 h-6" strokeWidth={3} />}
            </div>
            <div>
              <div className={`font-black text-lg ${correct ? "text-success" : "text-destructive"}`}>{correct ? "Awanou ! Bravo !" : "Pas tout à fait..."}</div>
              {!correct && <div className="text-sm text-muted-foreground">Bonne réponse : <span className="font-bold">{correctText(ex)}</span></div>}
            </div>
          </div>
          <button onClick={onNext} className={`btn-3d font-black px-6 py-3 rounded-2xl uppercase tracking-wider ${correct ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}>Continuer</button>
        </div>
      </div>
    );
  }
  return (
    <div className="border-t-2 border-border bg-card">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-end">
        <button onClick={handleCheck} disabled={!ready} className={`btn-3d font-black px-8 py-3 rounded-2xl uppercase tracking-wider ${ready ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>Vérifier</button>
      </div>
    </div>
  );
}

function isReady(ex: Exercise, ans: unknown): boolean {
  if (ans == null) return false;
  if (ex.type === "choice" || ex.type === "translate") return typeof ans === "string";
  if (ex.type === "order") return Array.isArray(ans) && ans.length === ex.words.length;
  if (ex.type === "match") return typeof ans === "object" && Object.keys(ans as object).length === ex.pairs.length;
  return false;
}
function isCorrect(ex: Exercise, ans: unknown): boolean {
  if (ex.type === "choice" || ex.type === "translate") return ans === ex.answer;
  if (ex.type === "order") return Array.isArray(ans) && ans.join(" ") === ex.answer.join(" ");
  if (ex.type === "match") {
    const a = ans as Record<string, string>;
    return ex.pairs.every((p) => a[p.fr] === p.fon);
  }
  return false;
}
function correctText(ex: Exercise): string {
  if (ex.type === "choice" || ex.type === "translate") return ex.answer;
  if (ex.type === "order") return ex.answer.join(" ");
  if (ex.type === "match") return ex.pairs.map((p) => `${p.fr} = ${p.fon}`).join(", ");
  return "";
}
