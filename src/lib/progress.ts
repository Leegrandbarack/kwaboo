import { useEffect, useState, useCallback } from "react";

const KEY = "kwabo:progress:v1";

export type Progress = {
  xp: number;
  hearts: number;
  streak: number;
  lastDay: string | null;
  completed: string[]; // lesson ids
};

const DEFAULT: Progress = {
  xp: 0,
  hearts: 5,
  streak: 0,
  lastDay: null,
  completed: [],
};

function load(): Progress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function save(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("kwabo:progress"));
}

export function useProgress() {
  const [p, setP] = useState<Progress>(DEFAULT);

  useEffect(() => {
    setP(load());
    const h = () => setP(load());
    window.addEventListener("kwabo:progress", h);
    return () => window.removeEventListener("kwabo:progress", h);
  }, []);

  const completeLesson = useCallback((lessonId: string, xpGained: number) => {
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
      streak,
      lastDay: today,
      completed: cur.completed.includes(lessonId)
        ? cur.completed
        : [...cur.completed, lessonId],
    };
    save(next);
  }, []);

  const loseHeart = useCallback(() => {
    const cur = load();
    save({ ...cur, hearts: Math.max(0, cur.hearts - 1) });
  }, []);

  const reset = useCallback(() => save(DEFAULT), []);

  return { progress: p, completeLesson, loseHeart, reset };
}
