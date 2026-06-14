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
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-2xl mx-auto px-3 py-2.5 flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-muted/50 hover:bg-muted active:scale-95 transition"
          aria-label="Changer de langue"
        >
          <span className="text-2xl leading-none">{lang.flag}</span>
        </button>

        <div className="font-display font-black tracking-tight text-base mr-auto">KWABO</div>

        <Stat icon={<Flame className="w-4 h-4" />} value={progress.streak} color="coral" />
        <Stat icon={<Gem className="w-4 h-4" />} value={progress.gems} color="primary" />
        <Stat icon={<Zap className="w-4 h-4 fill-current" />} value={progress.xp} color="gold" />
        <Stat icon={<Heart className="w-4 h-4 fill-current" />} value={progress.unlimitedHearts ? "∞" : progress.hearts} color="coral" max={progress.unlimitedHearts ? undefined : MAX_HEARTS} />

        <Link
          to="/profile"
          aria-label="Profil"
          className="ml-1 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-gold grid place-items-center text-xl shadow-card ring-2 ring-background"
        >
          {progress.avatar}
        </Link>
      </div>
      <LanguageSheet open={open} onClose={() => setOpen(false)} current={progress.language} />
    </header>
  );
}

function Stat({ icon, value, color, max }: { icon: React.ReactNode; value: number | string; color: "coral" | "gold" | "primary"; max?: number }) {
  const cls = color === "coral" ? "text-coral" : color === "gold" ? "text-gold" : "text-primary";
  return (
    <div className={`flex items-center gap-0.5 font-display font-black text-xs ${cls}`}>
      {icon}
      <span className="tabular-nums">{value}{max ? <span className="opacity-50 text-[10px]">/{max}</span> : null}</span>
    </div>
  );
}
