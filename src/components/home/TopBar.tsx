import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, Zap, Heart, Gem } from "lucide-react";
import { useProgress, MAX_HEARTS } from "@/lib/progress";
import { LanguageSheet, LANGUAGES } from "@/components/LanguageSheet";

export function TopBar() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const lang = LANGUAGES.find((l) => l.id === progress.language) ?? LANGUAGES[0];

  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/70">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted btn-press"
          aria-label="Changer de langue"
        >
          <span className="text-xl leading-none">{lang.flag}</span>
        </button>

        <Link to="/" className="mr-auto flex items-baseline gap-1.5">
          <span className="font-display text-2xl leading-none">Kwabo</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Fɔngbè</span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <Stat icon={<Flame className="w-3.5 h-3.5" strokeWidth={2} />} value={progress.streak} tone="coral" />
          <Stat icon={<Gem className="w-3.5 h-3.5" strokeWidth={2} />} value={progress.gems} tone="primary" />
          <Stat icon={<Zap className="w-3.5 h-3.5" strokeWidth={2} />} value={progress.xp} tone="gold" />
          <Stat icon={<Heart className="w-3.5 h-3.5" strokeWidth={2} />} value={progress.unlimitedHearts ? "∞" : progress.hearts} tone="coral" max={progress.unlimitedHearts ? undefined : MAX_HEARTS} />
        </div>

        <Link
          to="/profile"
          aria-label="Profil"
          className="ml-1 w-8 h-8 rounded-full bg-muted border border-border grid place-items-center text-base hover:bg-accent btn-press"
        >
          {progress.avatar}
        </Link>
      </div>
      <LanguageSheet open={open} onClose={() => setOpen(false)} current={progress.language} />
    </header>
  );
}

function Stat({ icon, value, tone, max }: { icon: React.ReactNode; value: number | string; tone: "coral" | "gold" | "primary"; max?: number }) {
  const cls = tone === "coral" ? "text-coral" : tone === "gold" ? "text-gold" : "text-primary";
  return (
    <div className={`flex items-center gap-1 font-medium tabular-nums ${cls}`}>
      {icon}
      <span>{value}{max ? <span className="text-muted-foreground/70 text-[10px]">/{max}</span> : null}</span>
    </div>
  );
}
