import type { Exercise } from "@/lib/curriculum";

/**
 * Méthodes d'apprentissage inspirées de Duolingo (version publique, simplifiée) :
 * correction tolérante, suivi de réussite récent, adaptation de la difficulté.
 */

const PERF_KEY = "kwabo:perf:v1";
const WINDOW = 30;

/** Minuscule, sans espaces superflus, sans accents français simples ni ponctuation. */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[àâä]/g, "a")
    .replace(/[èêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûü]/g, "u")
    .replace(/[.,!?;:«»"']/g, "")
    .replace(/\s+/g, " ");
}

function loadPerf(): boolean[] {
  if (typeof window === "undefined") return [];
  try {
    const arr = JSON.parse(localStorage.getItem(PERF_KEY) ?? "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function recordPerformance(ok: boolean) {
  if (typeof window === "undefined") return;
  const arr = [...loadPerf(), ok].slice(-WINDOW);
  localStorage.setItem(PERF_KEY, JSON.stringify(arr));
}

/** Taux de réussite récent (0 → 1). 0,7 par défaut pour un nouvel élève. */
export function getSkill(): number {
  const arr = loadPerf();
  if (arr.length < 5) return 0.7;
  return arr.filter(Boolean).length / arr.length;
}

const EASY = new Set(["choice", "match", "image", "translate"]);
const HARD = new Set(["write", "listen", "order", "fill"]);

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Mélange léger + ajustement de l'aide selon le niveau de l'élève. */
export function adaptExercises(exs: Exercise[], skill = getSkill()): Exercise[] {
  // Mélange léger : on permute des voisins pour garder la progression pédagogique.
  const list = [...exs];
  for (let i = 0; i < list.length - 1; i += 2) {
    if (Math.random() < 0.5) [list[i], list[i + 1]] = [list[i + 1], list[i]];
  }
  if (skill >= 0.85) {
    // Élève à l'aise : pas d'indice, exercices exigeants en premier dans chaque moitié.
    const noHint = list.map((e) => ("hint" in e ? ({ ...e, hint: undefined } as Exercise) : e));
    const half = Math.ceil(noHint.length / 2);
    const sortHalf = (part: Exercise[]) =>
      [...part].sort((a, b) => Number(HARD.has(b.type)) - Number(HARD.has(a.type)));
    return [...sortHalf(noHint.slice(0, half)), ...sortHalf(noHint.slice(half))];
  }
  if (skill < 0.6) {
    // Élève en difficulté : on commence par les exercices faciles.
    return [...list].sort((a, b) => Number(EASY.has(b.type)) - Number(EASY.has(a.type)));
  }
  return list;
}

export { shuffle };
