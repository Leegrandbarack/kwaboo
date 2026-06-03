import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Ayi } from "@/components/Ayi";
import { LANGUAGES } from "@/components/LanguageSheet";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Bienvenue — Kwabo" }] }),
  component: Onboarding,
});

const REASONS = [
  { id: "culture", emoji: "🌍", label: "Culture & racines" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Famille & proches" },
  { id: "travel", emoji: "✈️", label: "Voyage au Bénin" },
  { id: "work", emoji: "💼", label: "Travail" },
  { id: "fun", emoji: "🎉", label: "Pour le plaisir" },
];
const LEVELS = [
  { id: "beginner", emoji: "🌱", label: "Débutant", sub: "Je pars de zéro" },
  { id: "some", emoji: "🌿", label: "Quelques mots", sub: "Je connais des bases" },
  { id: "intermediate", emoji: "🌳", label: "Intermédiaire", sub: "Je veux progresser" },
];
const GOALS = [
  { id: 10, label: "Décontracté", sub: "5 min/jour", xp: 10 },
  { id: 20, label: "Régulier", sub: "10 min/jour", xp: 20 },
  { id: 30, label: "Sérieux", sub: "15 min/jour", xp: 30 },
  { id: 60, label: "Intense", sub: "30 min/jour", xp: 60 },
];

function Onboarding() {
  const navigate = useNavigate();
  const { update } = useProgress();
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("fon");
  const [reason, setReason] = useState("culture");
  const [level, setLevel] = useState<"beginner" | "some" | "intermediate">("beginner");
  const [goal, setGoal] = useState(30);
  const [username, setUsername] = useState("");

  function finish() {
    update({
      language: lang,
      reason,
      startLevel: level,
      dailyGoal: goal,
      username: username.trim() || "Apprenant",
      onboarded: true,
    });
    navigate({ to: "/" });
  }

  const steps = [
    {
      title: "Quelle langue veux-tu apprendre ?",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              onClick={() => l.available && setLang(l.id)}
              disabled={!l.available}
              className={`btn-3d relative p-4 rounded-2xl border-2 text-left ${lang === l.id ? "border-primary bg-primary/10" : "border-border bg-card"} ${!l.available && "opacity-50"}`}
            >
              <div className="text-4xl mb-1">{l.flag}</div>
              <div className="font-display font-black text-sm leading-tight">{l.name}</div>
              <div className="text-[10px] text-muted-foreground font-bold">{l.country}</div>
              {!l.available && <span className="absolute top-2 right-2 text-[9px] font-black uppercase bg-muted px-1.5 py-0.5 rounded-full">Bientôt</span>}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Pourquoi apprends-tu le Fon ?",
      content: (
        <div className="space-y-2">
          {REASONS.map((r) => (
            <button key={r.id} onClick={() => setReason(r.id)} className={`btn-3d w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left ${reason === r.id ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
              <span className="text-3xl">{r.emoji}</span>
              <span className="font-display font-black">{r.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Quel est ton niveau ?",
      content: (
        <div className="space-y-2">
          {LEVELS.map((l) => (
            <button key={l.id} onClick={() => setLevel(l.id as typeof level)} className={`btn-3d w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left ${level === l.id ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
              <span className="text-3xl">{l.emoji}</span>
              <div>
                <div className="font-display font-black">{l.label}</div>
                <div className="text-xs text-muted-foreground font-bold">{l.sub}</div>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Choisis ton objectif quotidien",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {GOALS.map((g) => (
            <button key={g.id} onClick={() => setGoal(g.xp)} className={`btn-3d p-4 rounded-2xl border-2 text-left ${goal === g.xp ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
              <div className="font-display font-black">{g.label}</div>
              <div className="text-xs text-muted-foreground font-bold">{g.sub}</div>
              <div className="mt-2 text-xs font-black text-gold">{g.xp} XP / jour</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Comment t'appelles-tu ?",
      content: (
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ton prénom"
            maxLength={20}
            className="w-full p-4 rounded-2xl border-2 border-border bg-card font-display font-black text-xl text-center focus:border-primary outline-none"
          />
          <p className="text-xs text-muted-foreground text-center mt-3 font-bold">AYI t&apos;appellera par ce nom</p>
        </div>
      ),
    },
  ];

  const isLast = step === steps.length - 1;
  const pct = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <div className="px-4 pt-4 flex items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="p-2 text-muted-foreground hover:text-foreground"><ArrowLeft /></button>
        )}
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex-1 px-5 py-6 max-w-md w-full mx-auto flex flex-col">
        <div className="flex items-end gap-3 mb-6">
          <Ayi size={80} mood="happy" />
          <div className="relative bg-card border-2 border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-card pop-in">
            <h1 className="font-display font-black text-base">{steps[step].title}</h1>
          </div>
        </div>
        <div className="flex-1">{steps[step].content}</div>
        <button
          onClick={() => (isLast ? finish() : setStep(step + 1))}
          className="btn-3d mt-6 w-full bg-primary text-primary-foreground font-display font-black py-4 rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2"
        >
          {isLast ? "Commencer l'aventure" : "Continuer"}
          <ArrowRight className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
