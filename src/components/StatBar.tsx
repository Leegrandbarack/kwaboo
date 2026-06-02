import { Flame, Heart, Zap } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function StatBar() {
  const { progress } = useProgress();
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center font-black text-lg">
            K
          </div>
          <span className="font-bold text-lg tracking-tight">Kwabo</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold">
          <Stat icon={<Flame className="w-4 h-4" />} value={progress.streak} color="text-coral" />
          <Stat icon={<Zap className="w-4 h-4 fill-current" />} value={progress.xp} color="text-gold" />
          <Stat icon={<Heart className="w-4 h-4 fill-current" />} value={progress.hearts} color="text-coral" />
        </div>
      </div>
    </header>
  );
}

function Stat({ icon, value, color }: { icon: React.ReactNode; value: number; color: string }) {
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      {icon}
      <span>{value}</span>
    </div>
  );
}
