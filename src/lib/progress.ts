import { useEffect, useState, useCallback } from "react";

const KEY = "kwabo:progress:v2";
const HEART_REGEN_MS = 30 * 60 * 1000; // 30 min
export const MAX_HEARTS = 5;
export const HEART_REFILL_COST = 350;

export type Progress = {
  xp: number;
  hearts: number;
  streak: number;
  lastDay: string | null;
  completed: string[];
  // NEW
  gems: number;
  dailyGoal: number; // XP per day
  language: string; // "fon"
  onboarded: boolean;
  reason: string;
  startLevel: "beginner" | "some" | "intermediate";
  avatar: string;
  username: string;
  lastHeartLostAt: number | null;
  weeklyXp: number;
  weekKey: string;
  achievements: string[];
  soundEnabled: boolean;
  unlimitedHearts: boolean;
};

export const DEFAULT: Progress = {
  xp: 0,
  hearts: MAX_HEARTS,
  streak: 0,
  lastDay: null,
  completed: [],
  gems: 500,
  dailyGoal: 30,
  language: "fon",
  onboarded: false,
  reason: "",
  startLevel: "beginner",
  avatar: "🧑🏾",
  username: "Apprenant",
  lastHeartLostAt: null,
  weeklyXp: 0,
  weekKey: "",
  achievements: [],
  soundEnabled: true,
  unlimitedHearts: false,
};

function getWeekKey(d = new Date()): string {
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

function applyHeartRegen(p: Progress): Progress {
  if (p.hearts >= MAX_HEARTS || !p.lastHeartLostAt) return p;
  const elapsed = Date.now() - p.lastHeartLostAt;
  const regen = Math.floor(elapsed / HEART_REGEN_MS);
  if (regen <= 0) return p;
  const newHearts = Math.min(MAX_HEARTS, p.hearts + regen);
  const remainder = elapsed - regen * HEART_REGEN_MS;
  return {
    ...p,
    hearts: newHearts,
    lastHeartLostAt: newHearts >= MAX_HEARTS ? null : Date.now() - remainder,
  };
}

function resetWeekly(p: Progress): Progress {
  const wk = getWeekKey();
  if (p.weekKey !== wk) return { ...p, weeklyXp: 0, weekKey: wk };
  return p;
}

export function load(): Progress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    let p: Progress = { ...DEFAULT, ...JSON.parse(raw) };
    p = resetWeekly(p);
    p = applyHeartRegen(p);
    return p;
  } catch {
    return DEFAULT;
  }
}

function save(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("kwabo:progress"));
}

export function timeUntilNextHeart(p: Progress): number {
  if (p.hearts >= MAX_HEARTS || !p.lastHeartLostAt) return 0;
  const elapsed = Date.now() - p.lastHeartLostAt;
  return Math.max(0, HEART_REGEN_MS - (elapsed % HEART_REGEN_MS));
}

export function useProgress() {
  const [p, setP] = useState<Progress>(DEFAULT);

  useEffect(() => {
    setP(load());
    const h = () => setP(load());
    window.addEventListener("kwabo:progress", h);
    const t = setInterval(() => setP(load()), 30000);
    return () => {
      window.removeEventListener("kwabo:progress", h);
      clearInterval(t);
    };
  }, []);

  const completeLesson = useCallback((lessonId: string, xpGained: number, perfect: boolean) => {
    const cur = load();
    const today = new Date().toISOString().slice(0, 10);
    let streak = cur.streak;
    if (cur.lastDay !== today) {
      const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      streak = cur.lastDay === y ? streak + 1 : 1;
    }
    const next: Progress = {
      ...cur,
      xp: cur.xp + xpGained,
      weeklyXp: cur.weeklyXp + xpGained,
      weekKey: getWeekKey(),
      streak,
      lastDay: today,
      gems: cur.gems + (perfect ? 10 : 5),
      completed: cur.completed.includes(lessonId) ? cur.completed : [...cur.completed, lessonId],
    };
    save(next);
  }, []);

  const loseHeart = useCallback(() => {
    const cur = load();
    if (cur.unlimitedHearts) return;
    const wasFull = cur.hearts >= MAX_HEARTS;
    save({
      ...cur,
      hearts: Math.max(0, cur.hearts - 1),
      lastHeartLostAt: wasFull ? Date.now() : cur.lastHeartLostAt ?? Date.now(),
    });
  }, []);

  const refillHearts = useCallback(() => {
    const cur = load();
    if (cur.gems < HEART_REFILL_COST) return false;
    save({ ...cur, hearts: MAX_HEARTS, lastHeartLostAt: null, gems: cur.gems - HEART_REFILL_COST });
    return true;
  }, []);

  const spendGems = useCallback((cost: number) => {
    const cur = load();
    if (cur.gems < cost) return false;
    save({ ...cur, gems: cur.gems - cost });
    return true;
  }, []);

  const toggleUnlimited = useCallback(() => {
    const cur = load();
    save({ ...cur, unlimitedHearts: !cur.unlimitedHearts });
  }, []);

  const update = useCallback((patch: Partial<Progress>) => {
    save({ ...load(), ...patch });
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    const cur = load();
    if (cur.achievements.includes(id)) return false;
    save({ ...cur, achievements: [...cur.achievements, id], gems: cur.gems + 25 });
    return true;
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    save(DEFAULT);
  }, []);

  return {
    progress: p,
    completeLesson,
    loseHeart,
    refillHearts,
    spendGems,
    toggleUnlimited,
    update,
    unlockAchievement,
    reset,
  };
}
