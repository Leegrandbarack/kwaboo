import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Trophy, BookOpen, Calendar, Volume2, VolumeX, RotateCcw, Award } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { BottomNav } from "@/components/home/BottomNav";
import { LANGUAGES } from "@/components/LanguageSheet";
import { allLessons } from "@/lib/curriculum";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — Kwabo" }] }),
  component: ProfilePage,
});

const AVATARS = ["🧑🏾", "👨🏾", "👩🏾", "🧑🏿", "👨🏿", "👩🏿", "🦁", "🐘", "🐆", "🦓", "🦒", "🦅"];

function ProfilePage() {
  const { progress, update, reset } = useProgress();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.username);
  const level = Math.floor(progress.xp / 100) + 1;
  const lang = LANGUAGES.find((l) => l.id === progress.language) ?? LANGUAGES[0];
  const wordsLearned = progress.completed.length * 6;

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto pb-32 px-4">
        <section className="mt-4 rounded-3xl bg-gradient-hero text-white p-5 text-center shadow-card">
          <div className="text-6xl mb-2">{progress.avatar}</div>
          {editing ? (
            <div className="flex flex-col gap-2 items-center">
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} className="text-center font-display font-black text-xl bg-white/20 rounded-xl px-3 py-2 outline-none w-full max-w-xs" />
              <button onClick={() => { update({ username: name.trim() || "Apprenant" }); setEditing(false); }} className="bg-white text-primary font-black px-4 py-1.5 rounded-full text-sm">Enregistrer</button>
            </div>
          ) : (
            <>
              <h1 className="font-display font-black text-2xl">{progress.username}</h1>
              <button onClick={() => setEditing(true)} className="text-xs font-bold underline opacity-80">Modifier</button>
            </>
          )}
          <p className="mt-2 text-sm font-bold opacity-90">{lang.flag} {lang.name} · Niveau {level}</p>
        </section>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Choisis ton avatar</h2>
        <div className="grid grid-cols-6 gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => update({ avatar: a })}
              className={`text-3xl p-2 rounded-xl border-2 ${progress.avatar === a ? "border-primary bg-primary/10" : "border-border bg-card"}`}
            >
              {a}
            </button>
          ))}
        </div>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Tes stats</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Flame className="w-5 h-5" />} value={progress.streak} label="jour(s) de série" color="coral" />
          <StatCard icon={<Trophy className="w-5 h-5" />} value={progress.xp} label="XP total" color="gold" />
          <StatCard icon={<BookOpen className="w-5 h-5" />} value={progress.completed.length} label={`/ ${allLessons.length} leçons`} color="primary" />
          <StatCard icon={<Calendar className="w-5 h-5" />} value={wordsLearned} label="mots appris" color="primary" />
        </div>

        <Link to="/achievements" className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border">
          <div className="w-10 h-10 grid place-items-center bg-gold/20 text-gold rounded-xl"><Award className="w-5 h-5" /></div>
          <div className="flex-1">
            <div className="font-display font-black">Succès</div>
            <div className="text-xs text-muted-foreground font-bold">{progress.achievements.length} débloqués</div>
          </div>
          <span className="text-muted-foreground">→</span>
        </Link>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Réglages</h2>
        <div className="space-y-2">
          <button onClick={() => update({ soundEnabled: !progress.soundEnabled })} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border">
            {progress.soundEnabled ? <Volume2 /> : <VolumeX />}
            <div className="flex-1 text-left font-bold">Sons</div>
            <span className={`text-xs font-black px-3 py-1 rounded-full ${progress.soundEnabled ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{progress.soundEnabled ? "ACTIVÉS" : "DÉSACTIVÉS"}</span>
          </button>
          <button onClick={() => { if (confirm("Réinitialiser toute ta progression ?")) reset(); }} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-destructive/40 text-destructive">
            <RotateCcw />
            <div className="flex-1 text-left font-bold">Réinitialiser ma progression</div>
          </button>
        </div>
      </main>
      <BottomNav active="profile" />
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: "coral" | "gold" | "primary" }) {
  const cls = color === "coral" ? "bg-coral/15 text-coral border-coral/30" : color === "gold" ? "bg-gold/15 text-gold-foreground border-gold/40" : "bg-primary/10 text-primary border-primary/30";
  return (
    <div className={`p-4 rounded-2xl border-2 ${cls}`}>
      <div className="flex items-center gap-2 mb-1">{icon}<span className="font-display font-black text-2xl">{value}</span></div>
      <div className="text-xs font-bold opacity-80">{label}</div>
    </div>
  );
}
