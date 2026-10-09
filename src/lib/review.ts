import { useCallback, useEffect, useState } from "react";
import type { Exercise } from "@/lib/curriculum";

/**
 * Révision espacée par élément (inspirée de Duolingo) :
 * force 0 → 5, intervalle croissant, baisse avec le temps sans révision.
 * Stockage local — remplaçable par une table Cloud sans changer l'API.
 */

const KEY = "kwabo:review:v1";
const DAY = 86400000;

/** Intervalle (en jours) selon la force. */
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
  /** Exercice d'origine, pour le rejouer en entraînement */
  exercise?: Exercise;
  lastSeen?: number;
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

/** Force actuelle, diminuée d'un point par intervalle dépassé sans révision. */
export function currentStrength(it: ReviewItem, now = Date.now()): number {
  const overdue = now - it.dueAt;
  if (overdue <= 0) return it.mastery;
  const step = Math.max(1, INTERVALS[it.mastery] ?? 1) * DAY;
  return Math.max(0, it.mastery - Math.floor(overdue / step));
}

export function masteryLabel(m: number): string {
  if (m <= 0) return "Fragile";
  if (m === 1) return "À revoir";
  if (m <= 3) return "En progrès";
  if (m === 4) return "Presque acquis";
  return "Maîtrisé";
}

type AttemptInput = {
  question: string;
  answer: string;
  lessonId: string;
  lessonTitle: string;
  exercise?: Exercise;
};

const itemId = (lessonId: string, question: string) => `${lessonId}::${question}`.slice(0, 160);

/** Enregistre une tentative : la force monte si juste, baisse si faux. */
export function recordAttempt(input: AttemptInput, ok: boolean) {
  const items = loadReview();
  const now = Date.now();
  const id = itemId(input.lessonId, input.question);
  let it = items.find((i) => i.id === id);
  if (!it) {
    it = {
      id,
      question: input.question,
      answer: input.answer,
      lessonId: input.lessonId,
      lessonTitle: input.lessonTitle,
      mastery: ok ? 1 : 0,
      misses: 0,
      dueAt: now,
      createdAt: now,
    };
    items.push(it);
  } else {
    const strength = currentStrength(it, now);
    it.mastery = ok ? Math.min(5, strength + 1) : Math.max(0, strength - 1);
  }
  if (!ok) it.misses += 1;
  it.answer = input.answer;
  if (input.exercise) it.exercise = input.exercise;
  it.lastSeen = now;
  it.dueAt = ok ? now + (INTERVALS[it.mastery] ?? 14) * DAY : now;
  saveReview(items);
}

/** Compatibilité : une erreur = tentative ratée. */
export function recordMistake(input: AttemptInput) {
  recordAttempt(input, false);
}

/** Éléments à revoir en priorité : échus ou faibles, du plus fragile au plus solide. */
export function practiceItems(limit = 10): ReviewItem[] {
  const now = Date.now();
  return loadReview()
    .filter((i) => i.exercise && (i.dueAt <= now || currentStrength(i, now) < 3))
    .sort((a, b) => currentStrength(a, now) - currentStrength(b, now) || a.dueAt - b.dueAt)
    .slice(0, limit);
}

export function useReview() {
  const [items, setItems] = useState<ReviewItem[]>([]);

  useEffect(() => {
    setItems(loadReview());
    const h = () => setItems(loadReview());
    window.addEventListener("kwabo:review", h);
    return () => window.removeEventListener("kwabo:review", h);
  }, []);

  const promote = useCallback((id: string) => {
    const list = loadReview();
    const it = list.find((i) => i.id === id);
    if (!it) return;
    it.mastery = Math.min(5, it.mastery + 1);
    it.dueAt = Date.now() + (INTERVALS[it.mastery] ?? 14) * DAY;
    saveReview(list);
  }, []);

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

  const now = Date.now();
  const due = items.filter((i) => i.dueAt <= now);
  const practicable = items.filter((i) => i.exercise && (i.dueAt <= now || currentStrength(i, now) < 3));
  const mastered = items.filter((i) => currentStrength(i, now) >= 5);

  return { items, due, practicable, mastered, promote, demote, remove, clear };
}
