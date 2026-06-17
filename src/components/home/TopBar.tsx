import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, Zap, Heart, Gem } from "lucide-react";
import { useProgress, MAX_HEARTS } from "@/lib/progress";
import { LanguageSheet, LANGUAGES } from "@/components/LanguageSheet";

export function TopBar() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lang = LANGUAGES.find((l) => l.id === progress.language) ?? LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 bg-background/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-b border-border shadow-[0_4px_20px_-12px_rgba(0,0,0,0.15)]" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-2xl mx-auto px-3 py-2.5 flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="press flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-muted/50 hover:bg-muted"
          aria-label="Changer de langue"
        >
          <span className="text-2xl leading-none">{lang.flag}</span>
        </button>

        <div className="font-display font-black tracking-tight text-base mr-auto">KWABO</div>

        <Stat icon={<Flame className="w-4 h-4" />} value={progress.streak} color="coral" />
        <Link to="/shop" aria-label="Boutique" className="press rounded-lg">
          <Stat icon={<Gem className="w-4 h-4" />} value={progress.gems} color="primary" />
        </Link>
        <Stat icon={<Zap className="w-4 h-4 fill-current" />} value={progress.xp} color="gold" />
        <Link to="/shop" aria-label="Cœurs - Boutique" className="press rounded-lg">
          <Stat
            icon={<Heart className="w-4 h-4 fill-current" />}
            value={progress.unlimitedHearts ? "∞" : progress.hearts}
            color="coral"
            max={progress.unlimitedHearts ? undefined : MAX_HEARTS}
          />
        </Link>

        <Link
          to="/profile"
          aria-label="Profil"
          className="press ml-1 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-gold grid place-items-center text-xl shadow-card ring-2 ring-background"
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
  const [bump, setBump] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <div className={`flex items-center gap-0.5 font-display font-black text-xs ${cls}`}>
      {icon}
      <span
        className="tabular-nums inline-block"
        style={{
          transform: bump ? "scale(1.25)" : "scale(1)",
          transition: "transform 280ms var(--ease-spring)",
        }}
      >
        {value}
        {max ? <span className="opacity-50 text-[10px]">/{max}</span> : null}
      </span>
    </div>
  );
}
