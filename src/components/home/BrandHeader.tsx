import { Link } from "@tanstack/react-router";
import { Flame, Gem, Heart } from "lucide-react";
import { Ayi } from "@/components/Ayi";
import { useProgress } from "@/lib/progress";

export function BrandHeader() {
  const { progress } = useProgress();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Ayi size={44} />
          <span className="font-display text-2xl font-black text-primary">
            KWABO
          </span>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-3" aria-label="Tes statistiques">
          <HeaderStat label="Série" value={progress.streak} icon={<Flame className="size-4 fill-current" />} tone="text-coral" />
          <HeaderStat label="Cœurs" value={progress.hearts} icon={<Heart className="size-4 fill-current" />} tone="text-coral" />
          <HeaderStat label="Gemmes" value={progress.gems} icon={<Gem className="size-4 fill-current" />} tone="text-primary" />
        </div>
      </div>
    </header>
  );
}

function HeaderStat({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone: string }) {
  return (
    <div className={`flex h-9 min-w-12 items-center justify-center gap-1 rounded-xl border border-border bg-card px-2 text-sm font-black shadow-sm ${tone}`} title={label}>
      {icon}
      <span className="tabular-nums text-foreground">{value}</span>
    </div>
  );
}
