import { allLessons } from "./curriculum";

export type Entry = { fon: string; fr: string; lesson: string; emoji: string };

/** Dictionnaire Fɔngbè ↔ Français construit depuis tous les exercices du curriculum. */
export const dictionary: Entry[] = (() => {
  const out: Entry[] = [];
  const seen = new Set<string>();
  const push = (fon: string, fr: string, lesson: string, emoji: string) => {
    const f = fon?.trim();
    const t = fr?.trim();
    if (!f || !t) return;
    const key = `${f.toLowerCase()}|${t.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ fon: f, fr: t, lesson, emoji });
  };

  for (const l of allLessons) {
    for (const ex of l.exercises) {
      if (ex.type === "match") {
        for (const p of ex.pairs) push(p.fon, p.fr, l.title, l.emoji);
      } else if (ex.type === "translate") {
        if (ex.to === "fon") push(ex.answer, ex.from, l.title, l.emoji);
        else push(ex.from, ex.answer, l.title, l.emoji);
      } else if (ex.type === "order") {
        push(ex.answer.join(" "), ex.french, l.title, l.emoji);
      }
    }
  }
  return out.sort((a, b) => a.fon.localeCompare(b.fon, "fr"));
})();

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function searchDictionary(query: string, limit = 40): Entry[] {
  const q = norm(query);
  if (!q) return dictionary.slice(0, limit);
  const starts: Entry[] = [];
  const contains: Entry[] = [];
  for (const e of dictionary) {
    const a = norm(e.fon);
    const b = norm(e.fr);
    if (a.startsWith(q) || b.startsWith(q)) starts.push(e);
    else if (a.includes(q) || b.includes(q)) contains.push(e);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}
