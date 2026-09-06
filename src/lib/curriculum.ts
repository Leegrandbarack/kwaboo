export type Exercise =
  | { type: "choice"; prompt: string; question: string; options: string[]; answer: string; hint?: string }
  | { type: "translate"; prompt: string; from: string; to: string; answer: string; choices: string[] }
  | { type: "order"; prompt: string; french: string; words: string[]; answer: string[] }
  | { type: "match"; prompt: string; pairs: { fr: string; fon: string }[] }
  /** Compléter une phrase à trou (le trou est marqué par ___) */
  | { type: "fill"; prompt: string; sentence: string; translation?: string; options: string[]; answer: string }
  /** Écouter puis choisir la bonne réponse */
  | { type: "listen"; prompt: string; audioText: string; question: string; options: string[]; answer: string }
  /** Écrire une réponse courte */
  | { type: "write"; prompt: string; question: string; answer: string; accept?: string[]; hint?: string }
  /** Associer un mot à une image (illustration emoji) */
  | { type: "image"; prompt: string; question: string; options: { emoji: string; label: string }[]; answer: string };

export type Lesson = {
  id: string;
  title: string;
  emoji: string;
  exercises: Exercise[];
};

export type World = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: "primary" | "gold" | "coral";
  lessons: Lesson[];
};

/**
 * Contenu des leçons — actuellement vide.
 * Le nouveau programme (36 leçons) sera ajouté ici, unité par unité.
 */
export const worlds: World[] = [];

export const allLessons = worlds.flatMap((w) =>
  w.lessons.map((l) => ({ ...l, worldId: w.id, worldTitle: w.title, color: w.color }))
);

export function getLesson(id: string) {
  for (const w of worlds) {
    const l = w.lessons.find((x) => x.id === id);
    if (l) return { lesson: l, world: w };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Structure pédagogique : Section > Unité > Leçon
// ---------------------------------------------------------------------------

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export type Unit = {
  id: string;
  title: string;
  titleFon: string;
  emoji: string;
  /** Objectif pédagogique affiché sur la carte d'unité */
  objective: string;
  /** Récompense obtenue à la fin de l'unité */
  reward: { badge: string; label: string; xp: number };
  lessonIds: string[];
};

export type Section = {
  id: string;
  title: string;
  titleFon: string;
  subtitle: string;
  emoji: string;
  level: Level;
  color: "primary" | "gold" | "coral";
  units: Unit[];
};

/** Parcours — vide en attendant le nouveau programme. */
export const sections: Section[] = [];

const lessonById = new Map(allLessons.map((l) => [l.id, l]));

/** Leçons dans l'ordre pédagogique des sections/unités. */
export const pathLessons = sections.flatMap((s) =>
  s.units.flatMap((u) =>
    u.lessonIds
      .map((id) => lessonById.get(id))
      .filter((l): l is (typeof allLessons)[number] => !!l)
      .map((l) => ({ ...l, sectionId: s.id, unitId: u.id, color: s.color }))
  )
);

/** Leçons d'une unité, dans l'ordre. */
export function unitLessons(unit: Unit) {
  return unit.lessonIds
    .map((id) => lessonById.get(id))
    .filter((l): l is (typeof allLessons)[number] => !!l);
}

/** Mots-clés (fon → français) extraits des exercices d'une unité. */
export function unitVocab(unit: Unit, max = 6): { fon: string; fr: string }[] {
  const out: { fon: string; fr: string }[] = [];
  const seen = new Set<string>();
  const push = (fon: string, fr: string) => {
    const key = fon.toLowerCase();
    if (!fon || !fr || seen.has(key)) return;
    seen.add(key);
    out.push({ fon, fr });
  };
  for (const lesson of unitLessons(unit)) {
    for (const ex of lesson.exercises) {
      if (ex.type === "match") {
        for (const p of ex.pairs) push(p.fon, p.fr);
      } else if (ex.type === "translate") {
        if (ex.to === "fon") push(ex.answer, ex.from);
        else push(ex.from, ex.answer);
      }
      if (out.length >= max) return out.slice(0, max);
    }
  }
  return out.slice(0, max);
}

/** Parcours regroupés par niveau : Débutant, Intermédiaire, Avancé. */
export const levelTracks: { level: Level; label: string; sections: Section[] }[] = (
  ["beginner", "intermediate", "advanced"] as Level[]
).map((level) => ({
  level,
  label: LEVEL_LABEL[level],
  sections: sections.filter((s) => s.level === level),
}));

/** Toutes les unités à plat, dans l'ordre pédagogique. */
export const allUnits = sections.flatMap((s) => s.units.map((u) => ({ ...u, section: s })));
