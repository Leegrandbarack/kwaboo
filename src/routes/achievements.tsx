import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { achievements, checkAchievements } from "@/lib/achievements";
import { TopBar } from "@/components/home/TopBar";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Succès — Kwabo" }] }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const { progress, unlockAchievement } = useProgress();

  useEffect(() => {
    checkAchievements(progress).forEach((id) => unlockAchievement(id));
  }, [progress.xp, progress.streak, progress.completed.length, progress.gems]);

  const unlockedCount = progress.achievements.length;

  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="max-w-2xl mx-auto pb-32 px-4">
        <div className="mt-4 rounded-3xl bg-gradient-hero text-white p-5 text-center shadow-card">
          <div className="text-5xl">🏆</div>
          <div className="font-display font-black text-2xl mt-1">{unlockedCount} / {achievements.length}</div>
          <p className="text-sm font-bold opacity-90">Succès débloqués</p>
        </div>

        <div className="mt-6 space-y-2">
          {achievements.map((a) => {
            const unlocked = progress.achievements.includes(a.id);
            const cur = Math.min(a.current(progress), a.target);
            const pct = Math.round((cur / a.target) * 100);
            return (
              <div key={a.id} className={`p-4 rounded-2xl border-2 ${unlocked ? "bg-gold/15 border-gold/40" : "bg-card border-border"}`}>
                <div className="flex items-center gap-3">
                  <div className={`text-4xl ${unlocked ? "" : "grayscale opacity-50"}`}>{a.emoji}</div>
                  <div className="flex-1">
                    <div className="font-display font-black flex items-center gap-2">{a.title} {unlocked && <Check className="w-4 h-4 text-primary" strokeWidth={3} />}</div>
                    <div className="text-xs text-muted-foreground font-bold">{a.description}</div>
                  </div>
                  <div className="text-xs font-black tabular-nums">{cur}/{a.target}</div>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${unlocked ? "bg-gold" : "bg-primary"} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <BottomNav active="profile" />
    </div>
  );
}
