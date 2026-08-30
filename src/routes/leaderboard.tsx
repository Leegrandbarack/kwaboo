import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useProgress } from "@/lib/progress";
import { getWeeklyLeaderboard, getLeague, LEAGUES } from "@/lib/leaderboard";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({ meta: [{ title: "Classement — Kwabo" }] }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { progress } = useProgress();
  const league = getLeague(progress.xp);
  const leagueIdx = LEAGUES.findIndex((l) => l.id === league.id);
  const board = useMemo(
    () => getWeeklyLeaderboard(progress.weekKey || "init", progress.weeklyXp, progress.username, progress.avatar),
    [progress.weekKey, progress.weeklyXp, progress.username, progress.avatar]
  );

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto pb-32 px-4">
        <div className="mt-4 rounded-3xl bg-gradient-hero text-white p-5 text-center shadow-card rise-in">
          <div className="text-5xl mb-1">{league.emoji}</div>
          <div className="font-display font-black text-2xl">Ligue {league.name}</div>
          <p className="text-white/90 text-sm font-medium mt-1">Top 10 = promotion · Bottom 5 = rétrogradation</p>
          <div className="mt-3 flex justify-center gap-1">
            {LEAGUES.map((l, i) => (
              <div key={l.id} className={`text-xl ${i === leagueIdx ? "scale-125" : "opacity-40"}`}>{l.emoji}</div>
            ))}
          </div>
        </div>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Cette semaine</h2>
        <ol className="space-y-2">
          {board.map((r, i) => {
            const promo = i < 10;
            const demo = i >= board.length - 5;
            const zone = promo ? "border-l-4 border-success" : demo ? "border-l-4 border-destructive" : "";
            return (
              <li
                key={i}
                className={`flex items-center gap-3 p-3 rounded-2xl ${r.isUser ? "bg-primary/10 border-2 border-primary" : "bg-card border-2 border-border"} ${zone}`}
              >
                <div className={`w-8 text-center font-display font-black ${i < 3 ? "text-gold text-lg" : "text-muted-foreground"}`}>{i + 1}</div>
                <div className="text-2xl">{r.avatar}</div>
                <div className="flex-1 font-bold text-sm">{r.name} {r.isUser && <span className="text-primary text-xs">(toi)</span>}</div>
                <div className="font-display font-black text-gold tabular-nums">{r.xp} XP</div>
              </li>
            );
          })}
        </ol>
      </main>
      <BottomNav active="rank" />
    </div>
  );
}
