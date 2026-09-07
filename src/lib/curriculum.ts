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
  /** Objectif pédagogique de la leçon */
  objective?: string;
  /** Étiquette de difficulté affichée (Débutant, Facile, Moyen, Intermédiaire…) */
  difficulty?: string;
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

// ---------------------------------------------------------------------------
// Programme Fɔngbè : 3 niveaux · 12 unités · 36 leçons
// Le contenu des exercices est ajouté progressivement, leçon par leçon.
// ---------------------------------------------------------------------------

type UnitPlan = {
  id: string;
  title: string;
  titleFon: string;
  emoji: string;
  objective: string;
  reward: { badge: string; label: string; xp: number };
  lessons: { id: string; title: string; emoji: string; objective: string; difficulty: string }[];
};

type LevelPlan = {
  id: string;
  level: Level;
  title: string;
  titleFon: string;
  subtitle: string;
  emoji: string;
  color: "primary" | "gold" | "coral";
  units: UnitPlan[];
};

const plan: LevelPlan[] = [
  {
    id: "n1",
    level: "beginner",
    title: "Niveau 1 · Premiers pas",
    titleFon: "Bǐbɛ̀",
    subtitle: "Sons, salutations, pronoms et bases",
    emoji: "🌱",
    color: "primary",
    units: [
      {
        id: "u1",
        title: "Sons et salutations",
        titleFon: "Xógbe bǐbɛ̀",
        emoji: "👋🏾",
        objective: "Prononcer le fon et saluer avec le bon registre",
        reward: { badge: "🎖️", label: "Premiers mots", xp: 40 },
        lessons: [
          { id: "l1", title: "Alphabet et sons du fon", emoji: "🔤", objective: "Reconnaître les sons et lettres du fon", difficulty: "Débutant" },
          { id: "l2", title: "Salutations de base", emoji: "🙋🏾", objective: "Saluer et se faire saluer", difficulty: "Débutant" },
          { id: "l3", title: "Bienvenue et politesse d'accueil", emoji: "🤝🏾", objective: "Accueillir quelqu'un", difficulty: "Débutant" },
          { id: "l4", title: "Tutoiement et vouvoiement", emoji: "🎭", objective: "Choisir le bon registre", difficulty: "Débutant" },
        ],
      },
      {
        id: "u2",
        title: "Les pronoms",
        titleFon: "Nyikɔ́ ɖyɔ́tɔ́",
        emoji: "🧍🏾",
        objective: "Parler de soi, des autres et poser des questions",
        reward: { badge: "🏅", label: "Maître des pronoms", xp: 50 },
        lessons: [
          { id: "l5", title: "Pronoms personnels singuliers", emoji: "🙂", objective: "Parler de soi et des autres", difficulty: "Débutant" },
          { id: "l6", title: "Pronoms personnels pluriels", emoji: "👥", objective: "Parler d'un groupe", difficulty: "Débutant" },
          { id: "l7", title: "Pronoms interrogatifs", emoji: "❓", objective: "Poser des questions", difficulty: "Débutant" },
          { id: "l8", title: "Phrases simples de base", emoji: "💬", objective: "Construire des phrases simples", difficulty: "Débutant" },
        ],
      },
      {
        id: "u3",
        title: "Avoir, nombres et calendrier",
        titleFon: "Sín kpo xwè kpo",
        emoji: "🔢",
        objective: "Exprimer la possession, compter et dire une date",
        reward: { badge: "🗓️", label: "Compteur du temps", xp: 60 },
        lessons: [
          { id: "l9", title: "Le verbe avoir", emoji: "🤲🏾", objective: "Exprimer possession / sensations", difficulty: "Débutant" },
          { id: "l10", title: "Les nombres entiers", emoji: "🔟", objective: "Compter", difficulty: "Débutant" },
          { id: "l11", title: "Les jours de la semaine", emoji: "📅", objective: "Nommer les jours", difficulty: "Débutant" },
          { id: "l12", title: "Les mois de l'année", emoji: "🌙", objective: "Nommer les mois, dire une date", difficulty: "Débutant" },
        ],
      },
    ],
  },
  {
    id: "n2",
    level: "intermediate",
    title: "Niveau 2 · Vie quotidienne",
    titleFon: "Gbɛ̀ zǎn gbè",
    subtitle: "Famille, corps, maison, actions et météo",
    emoji: "🏡",
    color: "gold",
    units: [
      {
        id: "u4",
        title: "Famille, corps et santé",
        titleFon: "Hɛnnu kpo agbaza kpo",
        emoji: "👨‍👩‍👧",
        objective: "Parler de sa famille, de son corps et de sa santé",
        reward: { badge: "❤️", label: "Cœur de famille", xp: 60 },
        lessons: [
          { id: "l13", title: "Les membres de la famille", emoji: "👨‍👩‍👧", objective: "Nommer sa famille", difficulty: "Facile" },
          { id: "l14", title: "Le corps humain", emoji: "🦵🏾", objective: "Nommer les parties du corps", difficulty: "Facile" },
          { id: "l15", title: "L'état de santé", emoji: "🩺", objective: "Dire comment on va", difficulty: "Facile" },
        ],
      },
      {
        id: "u5",
        title: "Les possessifs",
        titleFon: "Nǔ tɔ̀n",
        emoji: "🔑",
        objective: "Exprimer la possession à toutes les personnes",
        reward: { badge: "🔐", label: "C'est à moi !", xp: 50 },
        lessons: [
          { id: "l16", title: "Possessifs mon/ma/mes, ton/ta/tes", emoji: "🙋🏾‍♂️", objective: "Exprimer la possession (1re/2e pers.)", difficulty: "Facile" },
          { id: "l17", title: "Possessifs son/sa/ses, notre/nos", emoji: "👨‍👩‍👦", objective: "Exprimer la possession (3e pers./pluriel)", difficulty: "Facile" },
        ],
      },
      {
        id: "u6",
        title: "Maison, articles et lieux",
        titleFon: "Xwé mɛ̀",
        emoji: "🏠",
        objective: "Décrire sa maison et situer les objets",
        reward: { badge: "🏠", label: "Chez soi", xp: 60 },
        lessons: [
          { id: "l18", title: "La maison et les objets", emoji: "🛏️", objective: "Nommer sa maison et son environnement", difficulty: "Facile" },
          { id: "l19", title: "Articles définis et indéfinis", emoji: "📝", objective: "Utiliser l'article correct", difficulty: "Facile" },
          { id: "l20", title: "Les adverbes de lieu", emoji: "📍", objective: "Situer un objet dans l'espace", difficulty: "Facile" },
        ],
      },
      {
        id: "u7",
        title: "Verbes et actions",
        titleFon: "Nǔwiwa",
        emoji: "🏃🏾",
        objective: "Construire des phrases d'action et décrire une routine",
        reward: { badge: "⚡", label: "En action", xp: 70 },
        lessons: [
          { id: "l21", title: "Verbes usuels de base", emoji: "🔨", objective: "Construire des phrases d'action simples", difficulty: "Moyen" },
          { id: "l22", title: "S'asseoir, coucher, lever, boire", emoji: "🪑", objective: "Décrire une routine", difficulty: "Moyen" },
          { id: "l23", title: "Actions et adjectifs du quotidien", emoji: "🌤️", objective: "Décrire une action ou une personne", difficulty: "Moyen" },
        ],
      },
      {
        id: "u8",
        title: "Météo, contraires et animaux",
        titleFon: "Jǐ kpo kanlin kpo",
        emoji: "🌦️",
        objective: "Décrire la météo, les contraires et les animaux",
        reward: { badge: "🦁", label: "Ami de la nature", xp: 70 },
        lessons: [
          { id: "l24", title: "Le temps qu'il fait", emoji: "🌧️", objective: "Décrire la météo", difficulty: "Moyen" },
          { id: "l25", title: "Mots fon et leurs contraires", emoji: "↔️", objective: "Renforcer le vocabulaire", difficulty: "Moyen" },
          { id: "l26", title: "Les animaux", emoji: "🐐", objective: "Nommer les animaux courants", difficulty: "Moyen" },
        ],
      },
    ],
  },
  {
    id: "n3",
    level: "advanced",
    title: "Niveau 3 · Culture et échanges",
    titleFon: "Aca kpo xóɖɔ́ kpo",
    subtitle: "Repas, politesse, dialogues, fêtes et villes",
    emoji: "🎉",
    color: "coral",
    units: [
      {
        id: "u9",
        title: "Manger et les repas",
        titleFon: "Nùɖuɖu",
        emoji: "🍲",
        objective: "Parler des aliments, des repas et de la table",
        reward: { badge: "🍛", label: "Bon appétit", xp: 80 },
        lessons: [
          { id: "l27", title: "Fruits, légumes, céréales", emoji: "🍍", objective: "Nommer des aliments", difficulty: "Moyen" },
          { id: "l28", title: "Le verbe manger au présent", emoji: "🍽️", objective: "Conjuguer et utiliser « manger »", difficulty: "Moyen" },
          { id: "l29", title: "Les repas de la journée", emoji: "🌅", objective: "Nommer les repas", difficulty: "Moyen" },
          { id: "l30", title: "Vocabulaire de la table", emoji: "🥣", objective: "Nommer les éléments de la table", difficulty: "Moyen" },
        ],
      },
      {
        id: "u10",
        title: "Politesse et dialogues",
        titleFon: "Xóɖɔ́ kpɛví",
        emoji: "🗣️",
        objective: "Répondre poliment et tenir un court échange",
        reward: { badge: "🎙️", label: "Beau parleur", xp: 70 },
        lessons: [
          { id: "l31", title: "Répondre aux remerciements", emoji: "🙏🏾", objective: "Répondre poliment", difficulty: "Intermédiaire" },
          { id: "l32", title: "Mini-dialogues", emoji: "💬", objective: "Tenir un court échange", difficulty: "Intermédiaire" },
        ],
      },
      {
        id: "u11",
        title: "Fêtes et vœux",
        titleFon: "Xwèɖóxwè",
        emoji: "🎊",
        objective: "Nommer les fêtes et formuler des vœux",
        reward: { badge: "🎁", label: "Roi des fêtes", xp: 80 },
        lessons: [
          { id: "l33", title: "Les fêtes et expressions festives", emoji: "🥳", objective: "Nommer des fêtes", difficulty: "Intermédiaire" },
          { id: "l34", title: "Souhaiter une bonne année", emoji: "🎆", objective: "Formuler des vœux", difficulty: "Intermédiaire" },
          { id: "l35", title: "Souhaiter un joyeux anniversaire", emoji: "🎂", objective: "Souhaiter un anniversaire, dire son âge", difficulty: "Intermédiaire" },
        ],
      },
      {
        id: "u12",
        title: "Villes et mots composés",
        titleFon: "Toxo lɛ́",
        emoji: "🏙️",
        objective: "Dire d'où l'on vient et enrichir son vocabulaire",
        reward: { badge: "🌍", label: "Voyageur", xp: 80 },
        lessons: [
          { id: "l36", title: "Quelques villes", emoji: "🏙️", objective: "Nommer des villes, dire d'où l'on vient", difficulty: "Intermédiaire" },
          { id: "l37", title: "Mots fon composés", emoji: "🧩", objective: "Comprendre les mots composés", difficulty: "Intermédiaire" },
        ],
      },
    ],
  },
];

export const worlds: World[] = plan.map((lvl) => ({
  id: lvl.id,
  title: lvl.title,
  subtitle: lvl.subtitle,
  emoji: lvl.emoji,
  color: lvl.color,
  lessons: lvl.units.flatMap((u) =>
    u.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      emoji: l.emoji,
      objective: l.objective,
      difficulty: l.difficulty,
      exercises: [] as Exercise[],
    }))
  ),
}));

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

/** Parcours dérivé du programme : 3 niveaux · 12 unités · 36 leçons. */
export const sections: Section[] = plan.map((lvl) => ({
  id: lvl.id,
  title: lvl.title,
  titleFon: lvl.titleFon,
  subtitle: lvl.subtitle,
  emoji: lvl.emoji,
  level: lvl.level,
  color: lvl.color,
  units: lvl.units.map((u) => ({
    id: u.id,
    title: u.title,
    titleFon: u.titleFon,
    emoji: u.emoji,
    objective: u.objective,
    reward: u.reward,
    lessonIds: u.lessons.map((l) => l.id),
  })),
}));

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
