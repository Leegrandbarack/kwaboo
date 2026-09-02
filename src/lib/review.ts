import { useCallback, useEffect, useState } from "react";

/**
 * Révision intelligente : répétition espacée simple (type Leitner).
 * Niveau de maîtrise 0 → 5. Plus le niveau est haut, plus l'intervalle est long.
 * Stockage local — remplaçable par une table Cloud sans changer l'API.
 */

const KEY = "kwabo:review:v1";
const DAY = 86400000;

/** Intervalle (en jours) selon le niveau de maîtrise. */
const INTERVALS = [0, 1, 2, 4, 7, 14];

export type ReviewItem = {
  id: string;
  question: string;
  answer: string;
  lessonId: string;
  lessonTitle: string;
  /** 0 = fragile, 5 = maîtrisé */
  mastery: number;
  dueAt: number;
  misses: number;
  createdAt: number;
};

export function loadReview(): ReviewItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as ReviewItem[]) : [];
  } catch {
    return [];
  }
}

function saveReview(items: ReviewItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("kwabo:review"));
}

export function masteryLabel(m: number): string {
  if (m <= 0) return "Fragile";
  if (m === 1) return "À revoir";
  if (m <= 3) return "En progrès";
  if (m === 4) return "Presque acquis";
  return "Maîtrisé";
}

/** Enregistre une erreur : crée l'item ou le rétrograde. */
export function recordMistake(input: { question: string; answer: string; lessonId: string; lessonTitle: string }) {
  const items = loadReview();
  const id = `${input.lessonId}::${input.question}`.slice(0, 160);
  const existing = items.find((i) => i.id === id);
  if (existing) {
    existing.mastery = Math.max(0, existing.mastery - 1);
    existing.misses += 1;
    existing.dueAt = Date.now();
    existing.answer = input.answer;
  } else {
    items.push({
      id,
      question: input.question,
      answer: input.answer,
      lessonId: input.lessonId,
      lessonTitle: input.lessonTitle,
      mastery: 0,
      misses: 1,
      dueAt: Date.now(),
      createdAt: Date.now(),
    });
  }
  saveReview(items);
}

export function useReview() {
  const [items, setItems] = useState<ReviewItem[]>([]);

  useEffect(() => {
    setItems(loadReview());
    const h = () => setItems(loadReview());
    window.addEventListener("kwabo:review", h);
    return () => window.removeEventListener("kwabo:review", h);
  }, []);

  /** « Je maîtrise » : monte d'un niveau et repousse l'échéance. */
  const promote = useCallback((id: string) => {
    const list = loadReview();
    const it = list.find((i) => i.id === id);
    if (!it) return;
    it.mastery = Math.min(5, it.mastery + 1);
    it.dueAt = Date.now() + (INTERVALS[it.mastery] ?? 14) * DAY;
    saveReview(list);
  }, []);

  /** « Encore difficile » : redescend et remet en file immédiatement. */
  const demote = useCallback((id: string) => {
    const list = loadReview();
    const it = list.find((i) => i.id === id);
    if (!it) return;
    it.mastery = Math.max(0, it.mastery - 1);
    it.misses += 1;
    it.dueAt = Date.now();
    saveReview(list);
  }, []);

  const remove = useCallback((id: string) => {
    saveReview(loadReview().filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => saveReview([]), []);

  const due = items.filter((i) => i.dueAt <= Date.now());
  const mastered = items.filter((i) => i.mastery >= 5);

  return { items, due, mastered, promote, demote, remove, clear };
}
