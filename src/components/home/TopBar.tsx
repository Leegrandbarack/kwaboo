import { Flame, Zap, Trophy } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function TopBar() {
  const { progress } = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-9 h-9 rounded-xl bg-gradient-hero grid place-items-center shadow-card">
            <span className="text-white font-black font-display text-lg leading-none">K</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-black text-base tracking-tight">KWABO</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold -mt-0.5">
              Fɔngbè
            </div>
          </div>
        </div>

        <Stat icon={<Flame className="w-4 h-4" />} value={progress.streak} color="coral" label="série" />
        <Stat icon={<Zap className="w-4 h-4 fill-current" />} value={progress.xp} color="gold" label="XP" />
        <Stat icon={<Trophy className="w-4 h-4" />} value={level} color="primary" label="niv." />

        {/* Avatar */}
        <button
          aria-label="Profil"
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold grid place-items-center text-primary-foreground font-display font-black text-base shadow-card ring-2 ring-background"
        >
          B
        </button>
      </div>
    </header>
  );
}

function Stat({
  icon,
  value,
  color,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  color: "coral" | "gold" | "primary";
  label: string;
}) {
  const cls =
    color === "coral"
      ? "text-coral"
      : color === "gold"
      ? "text-gold"
      : "text-primary";
  return (
    <div
      title={label}
      className={`flex items-center gap-1 font-display font-black text-sm ${cls}`}
    >
      {icon}
      <span>{value}</span>
    </div>
  );
}
