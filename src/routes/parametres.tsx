import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Flame,
  Gem,
  Zap,
  Heart,
  Globe,
  Store,
  Award,
  Volume2,
  VolumeX,
  RotateCcw,
  User,
  ChevronRight,
} from "lucide-react";
import { useProgress, MAX_HEARTS } from "@/lib/progress";
import { LanguageSheet, LANGUAGES } from "@/components/LanguageSheet";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Kwabo" },
      {
        name: "description",
        content:
          "Gère tes statistiques Kwabo, ta langue d'apprentissage, les sons et ta progression.",
      },
      { property: "og:title", content: "Paramètres — Kwabo" },
      {
        property: "og:description",
        content: "Statistiques, langue, sons et progression de ton apprentissage sur Kwabo.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { progress, update, reset } = useProgress();
  const [langOpen, setLangOpen] = useState(false);
  const lang = LANGUAGES.find((l) => l.id === progress.language) ?? LANGUAGES[0];
  const level = Math.floor(progress.xp / 100) + 1;

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto pb-32 px-4 pt-6">
        <h1 className="font-display font-black text-2xl">Paramètres</h1>
        <p className="text-sm text-muted-foreground font-bold">
          Tes infos, ta langue et tes réglages, au même endroit.
        </p>

        <section className="mt-5 flex items-center gap-3 p-4 rounded-3xl bg-gradient-hero text-white shadow-card rise-in">
          <div className="w-12 h-12 rounded-full bg-white/20 grid place-items-center text-2xl ring-2 ring-white/30">
            {progress.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display font-black text-lg truncate">{progress.username}</div>
            <div className="text-xs font-bold opacity-90">
              {lang.flag} {lang.name} · Niveau {level}
            </div>
          </div>
          <Link
            to="/profile"
            className="press shrink-0 bg-white/20 hover:bg-white/30 border border-white/25 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wider flex items-center gap-1"
          >
            <User className="w-3.5 h-3.5" /> Profil
          </Link>
        </section>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Mes statistiques</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatTile
            icon={<Flame className="w-5 h-5" />}
            value={progress.streak}
            label="jour(s) de série"
            tone="coral"
          />
          <StatTile
            icon={<Gem className="w-5 h-5" />}
            value={progress.gems}
            label="gemmes"
            tone="primary"
          />
          <StatTile
            icon={<Zap className="w-5 h-5 fill-current" />}
            value={progress.xp}
            label="XP total"
            tone="gold"
          />
          <StatTile
            icon={<Heart className="w-5 h-5 fill-current" />}
            value={
              progress.unlimitedHearts ? "∞" : `${progress.hearts}/${MAX_HEARTS}`
            }
            label="cœurs"
            tone="coral"
          />
        </div>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Apprentissage</h2>
        <div className="space-y-2">
          <Row
            onClick={() => setLangOpen(true)}
            icon={<Globe className="w-5 h-5" />}
            title="Langue d'apprentissage"
            sub={`${lang.flag} ${lang.name}`}
          />
          <RowLink
            to="/shop"
            icon={<Store className="w-5 h-5" />}
            title="Boutique"
            sub="Cœurs, gemmes et bonus"
          />
          <RowLink
            to="/achievements"
            icon={<Award className="w-5 h-5" />}
            title="Succès"
            sub={`${progress.achievements.length} débloqués`}
          />
        </div>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Réglages</h2>
        <div className="space-y-2">
          <button
            onClick={() => update({ soundEnabled: !progress.soundEnabled })}
            className="press w-full flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border text-left"
          >
            <div className="w-10 h-10 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
              {progress.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div className="flex-1 font-bold">Sons</div>
            <span
              className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                progress.soundEnabled
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {progress.soundEnabled ? "Activés" : "Désactivés"}
            </span>
          </button>

          <button
            onClick={() => {
              if (confirm("Réinitialiser toute ta progression ?")) reset();
            }}
            className="press w-full flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-destructive/40 text-destructive text-left"
          >
            <div className="w-10 h-10 grid place-items-center rounded-xl bg-destructive/10 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="flex-1 font-bold">Réinitialiser ma progression</div>
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          Kwabo · Fɔngbè
        </p>
      </main>

      <LanguageSheet
        open={langOpen}
        onClose={() => setLangOpen(false)}
        current={progress.language}
      />
      <BottomNav active="profile" />
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  tone: "coral" | "gold" | "primary";
}) {
  const cls =
    tone === "coral"
      ? "bg-coral/15 text-coral border-coral/30"
      : tone === "gold"
      ? "bg-gold/15 text-gold-foreground border-gold/40"
      : "bg-primary/10 text-primary border-primary/30";
  return (
    <div className={`p-4 rounded-2xl border-2 ${cls}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="font-display font-black text-2xl tabular-nums">{value}</span>
      </div>
      <div className="text-xs font-bold opacity-80">{label}</div>
    </div>
  );
}

function Row({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="press w-full flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border text-left"
    >
      <div className="w-10 h-10 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-black">{title}</div>
        {sub ? <div className="text-xs text-muted-foreground font-bold truncate">{sub}</div> : null}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </button>
  );
}

function RowLink({
  to,
  icon,
  title,
  sub,
}: {
  to: "/shop" | "/achievements";
  icon: React.ReactNode;
  title: string;
  sub?: string;
}) {
  return (
    <Link
      to={to}
      className="press w-full flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border"
    >
      <div className="w-10 h-10 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-black">{title}</div>
        {sub ? <div className="text-xs text-muted-foreground font-bold truncate">{sub}</div> : null}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </Link>
  );
}
