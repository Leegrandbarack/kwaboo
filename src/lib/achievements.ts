import type { Progress } from "./progress";
import { allLessons } from "./curriculum";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  target: number;
  current: (p: Progress) => number;
};

export const achievements: Achievement[] = [
  { id: "first-lesson", title: "Premier pas", description: "Termine ta toute première leçon", emoji: "👶", target: 1, current: (p) => p.completed.length },
  { id: "streak-3", title: "Étincelle", description: "Une série de 3 jours", emoji: "🔥", target: 3, current: (p) => p.streak },
  { id: "streak-7", title: "Flamme", description: "Une série de 7 jours", emoji: "🔥", target: 7, current: (p) => p.streak },
  { id: "streak-30", title: "Brasier", description: "Une série de 30 jours", emoji: "🔥", target: 30, current: (p) => p.streak },
  { id: "xp-100", title: "Cent points", description: "Atteins 100 XP", emoji: "⚡", target: 100, current: (p) => p.xp },
  { id: "xp-500", title: "Demi-millier", description: "Atteins 500 XP", emoji: "⚡", target: 500, current: (p) => p.xp },
  { id: "xp-1000", title: "Millier", description: "Atteins 1000 XP", emoji: "⚡", target: 1000, current: (p) => p.xp },
  { id: "lessons-5", title: "Studieux", description: "Termine 5 leçons", emoji: "📚", target: 5, current: (p) => p.completed.length },
  { id: "lessons-10", title: "Érudit", description: "Termine 10 leçons", emoji: "🎓", target: 10, current: (p) => p.completed.length },
  { id: "all-lessons", title: "Maître Fɔngbè", description: "Termine toutes les leçons", emoji: "👑", target: allLessons.length, current: (p) => p.completed.length },
  { id: "gems-1000", title: "Trésor", description: "Possède 1000 gemmes", emoji: "💎", target: 1000, current: (p) => p.gems },
  { id: "level-5", title: "Voyageur", description: "Atteins le niveau 5", emoji: "🗺️", target: 5, current: (p) => Math.floor(p.xp / 100) + 1 },
];

export function checkAchievements(p: Progress): string[] {
  return achievements
    .filter((a) => a.current(p) >= a.target && !p.achievements.includes(a.id))
    .map((a) => a.id);
}
