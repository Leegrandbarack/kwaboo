export type Exercise =
  | { type: "choice"; prompt: string; question: string; options: string[]; answer: string; hint?: string }
  | { type: "translate"; prompt: string; from: string; to: string; answer: string; choices: string[] }
  | { type: "order"; prompt: string; french: string; words: string[]; answer: string[] }
  | { type: "match"; prompt: string; pairs: { fr: string; fon: string }[] };

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

export const worlds: World[] = [
  {
    id: "w1",
    title: "Premiers mots",
    subtitle: "Les salutations en Fɔngbè",
    emoji: "👋",
    color: "primary",
    lessons: [
      {
        id: "w1l1",
        title: "Bonjour & Merci",
        emoji: "☀️",
        exercises: [
          {
            type: "choice",
            prompt: "Nouveau mot",
            question: "Comment dit-on « Bonjour » en Fon ?",
            options: ["Aɖabɔ", "Mawu", "A fɔn ganji à ?", "Oɖabɔ"],
            answer: "A fɔn ganji à ?",
            hint: "Littéralement : « Es-tu bien réveillé ? »",
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Merci",
            to: "fon",
            answer: "Awanou",
            choices: ["Awanou", "Eɛ", "Eo", "Mawu"],
          },
          {
            type: "choice",
            prompt: "Choisir la bonne réponse",
            question: "« Eɛ » signifie...",
            options: ["Non", "Oui", "Merci", "Bonjour"],
            answer: "Oui",
          },
          {
            type: "order",
            prompt: "Reconstruis la phrase",
            french: "Bonjour, comment vas-tu ?",
            words: ["A", "fɔn", "ganji", "à", "?"],
            answer: ["A", "fɔn", "ganji", "à", "?"],
          },
          {
            type: "match",
            prompt: "Associe les mots",
            pairs: [
              { fr: "Oui", fon: "Eɛ" },
              { fr: "Non", fon: "Eo" },
              { fr: "Merci", fon: "Awanou" },
              { fr: "Bonjour", fon: "Aɖabɔ" },
            ],
          },
        ],
      },
      {
        id: "w1l2",
        title: "Oui, Non, Au revoir",
        emoji: "💬",
        exercises: [
          {
            type: "choice",
            prompt: "Nouveau mot",
            question: "Comment dit-on « Non » en Fon ?",
            options: ["Eɛ", "Eo", "Awanou", "Mi"],
            answer: "Eo",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Eɛ",
            to: "fr",
            answer: "Oui",
            choices: ["Oui", "Non", "Merci", "Salut"],
          },
          {
            type: "choice",
            prompt: "Culture",
            question: "« Aɖabɔ » est utilisé...",
            options: ["Le matin", "Le soir", "À table", "À l'école"],
            answer: "Le matin",
            hint: "C'est la salutation matinale traditionnelle.",
          },
          {
            type: "order",
            prompt: "Reconstruis la phrase",
            french: "Oui, merci.",
            words: ["Eɛ", ",", "awanou", "."],
            answer: ["Eɛ", ",", "awanou", "."],
          },
        ],
      },
      {
        id: "w1l3",
        title: "Comment vas-tu ?",
        emoji: "🤝",
        exercises: [
          {
            type: "choice",
            prompt: "Compréhension",
            question: "« A fɔn ganji à ? » signifie...",
            options: [
              "As-tu mangé ?",
              "Comment vas-tu ?",
              "Où vas-tu ?",
              "Qui es-tu ?",
            ],
            answer: "Comment vas-tu ?",
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Je vais bien",
            to: "fon",
            answer: "Un fɔn ganji",
            choices: ["Un fɔn ganji", "A fɔn ganji", "Mawu kú", "Awanou nɛ"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Comment vas-tu ?", fon: "A fɔn ganji à ?" },
              { fr: "Je vais bien", fon: "Un fɔn ganji" },
              { fr: "Et toi ?", fon: "Bɔ hwɛ ɔ ?" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "w2",
    title: "Famille",
    subtitle: "Le cœur du foyer",
    emoji: "👨‍👩‍👧",
    color: "gold",
    lessons: [
      {
        id: "w2l1",
        title: "Père & Mère",
        emoji: "❤️",
        exercises: [
          {
            type: "choice",
            prompt: "Nouveau mot",
            question: "Comment dit-on « Père » en Fon ?",
            options: ["Nɔ", "Tɔ", "Vĭ", "Nɔví"],
            answer: "Tɔ",
          },
          {
            type: "choice",
            prompt: "Nouveau mot",
            question: "Comment dit-on « Mère » en Fon ?",
            options: ["Tɔ", "Nɔ", "Vĭ", "Daa"],
            answer: "Nɔ",
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Ma mère",
            to: "fon",
            answer: "Nɔ ce",
            choices: ["Nɔ ce", "Tɔ ce", "Vĭ ce", "Nɔví ce"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Mon père va bien.",
            words: ["Tɔ", "ce", "fɔn", "ganji", "."],
            answer: ["Tɔ", "ce", "fɔn", "ganji", "."],
          },
        ],
      },
      {
        id: "w2l2",
        title: "Frère, Sœur, Enfant",
        emoji: "👶",
        exercises: [
          {
            type: "choice",
            prompt: "Nouveau mot",
            question: "« Vĭ » signifie...",
            options: ["Frère", "Mère", "Enfant", "Ami"],
            answer: "Enfant",
          },
          {
            type: "choice",
            prompt: "Nouveau mot",
            question: "Comment dit-on « Frère/Sœur » (sibling) en Fon ?",
            options: ["Nɔví", "Tɔ", "Vĭ", "Daa"],
            answer: "Nɔví",
            hint: "« Nɔví » désigne frère ou sœur indifféremment.",
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Père", fon: "Tɔ" },
              { fr: "Mère", fon: "Nɔ" },
              { fr: "Enfant", fon: "Vĭ" },
              { fr: "Frère/Sœur", fon: "Nɔví" },
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Nɔví ce",
            to: "fr",
            answer: "Mon frère",
            choices: ["Mon frère", "Ma mère", "Mon enfant", "Mon père"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Mon enfant va bien.",
            words: ["Vĭ", "ce", "fɔn", "ganji", "."],
            answer: ["Vĭ", "ce", "fɔn", "ganji", "."],
          },
        ],
      },
    ],
  },
  {
    id: "w3",
    title: "Pronoms personnels",
    subtitle: "A, É, Mǐ, Mi, Nyɛ, Hwɛ…",
    emoji: "🗣️",
    color: "coral",
    lessons: [
      {
        id: "w3l1",
        title: "Singulier sujet : A & É",
        emoji: "👤",
        exercises: [
          {
            type: "choice",
            prompt: "Pronom sujet",
            question: "« A » correspond à quel pronom français ?",
            options: ["Je", "Tu", "Il / Elle", "Nous"],
            answer: "Tu",
            hint: "A se place devant le verbe : « A sè à ? » = As-tu entendu ?",
          },
          {
            type: "choice",
            prompt: "Pronom sujet",
            question: "« É » correspond à...",
            options: ["Je", "Tu", "Il / Elle / Cela", "Vous"],
            answer: "Il / Elle / Cela",
            hint: "É devient ‘é’ après l'élision d'une voyelle ouverte.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "A sè gànjí",
            to: "fr",
            answer: "Tu as bien entendu",
            choices: [
              "Tu as bien entendu",
              "Je vais bien",
              "Il a entendu",
              "Nous avons compris",
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "É tíìn",
            to: "fr",
            answer: "Il existe",
            choices: ["Il existe", "Il est parti", "Tu es là", "Je suis là"],
          },
          {
            type: "match",
            prompt: "Associe pronom et sens",
            pairs: [
              { fr: "Tu (sujet)", fon: "A" },
              { fr: "Il / Elle (sujet)", fon: "É" },
              { fr: "Le, la, l' (complément)", fon: "è" },
              { fr: "Lui (complément)", fon: "È / i" },
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "As-tu entendu ?",
            words: ["A", "sè", "à", "?"],
            answer: ["A", "sè", "à", "?"],
          },
        ],
      },
      {
        id: "w3l2",
        title: "Formes emphatiques : Nyɛ, Hwɛ, Éyé",
        emoji: "💪",
        exercises: [
          {
            type: "choice",
            prompt: "Forme absolue",
            question: "« Nyɛ » signifie...",
            options: ["Moi, je", "Toi", "Lui", "Nous"],
            answer: "Moi, je",
          },
          {
            type: "choice",
            prompt: "Forme absolue",
            question: "« Hwɛ » signifie...",
            options: ["Moi", "Toi", "Lui", "Vous"],
            answer: "Toi",
            hint: "Forme emphatique : « Hwɛ ɔ́, a nɔ kò àfyɔ̀n dín » = Toi, tu ricanes trop.",
          },
          {
            type: "choice",
            prompt: "Forme emphatique",
            question: "« Éyé » désigne...",
            options: ["Moi-même", "Toi-même", "Il / Elle / Lui (emphatique)", "Eux"],
            answer: "Il / Elle / Lui (emphatique)",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Nyɛ kpódó hwi kpán",
            to: "fr",
            answer: "Moi et toi",
            choices: ["Moi et toi", "Toi et lui", "Nous deux frères", "Moi seul"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Moi, je", fon: "Nyɛ" },
              { fr: "Toi", fon: "Hwɛ" },
              { fr: "Lui (emphatique)", fon: "Éyé" },
              { fr: "Toi-même (réflexif)", fon: "Hwiɖéé" },
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Toi, tu ricanes trop.",
            words: ["Hwɛ", "ɔ́", ",", "a", "nɔ", "kò", "àfyɔ̀n", "dín"],
            answer: ["Hwɛ", "ɔ́", ",", "a", "nɔ", "kò", "àfyɔ̀n", "dín"],
          },
        ],
      },
      {
        id: "w3l3",
        title: "Pluriel : Mǐ (nous) & Mi (vous)",
        emoji: "👥",
        exercises: [
          {
            type: "choice",
            prompt: "Pluriel",
            question: "« Mǐ » signifie...",
            options: ["Je", "Tu", "Nous", "Vous"],
            answer: "Nous",
            hint: "Mǐ = 1ʳᵉ personne du pluriel (sujet ou complément).",
          },
          {
            type: "choice",
            prompt: "Pluriel",
            question: "« Mi » signifie...",
            options: ["Je", "Tu", "Nous", "Vous"],
            answer: "Vous",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Mǐ wá",
            to: "fr",
            answer: "Nous sommes venus",
            choices: [
              "Nous sommes venus",
              "Vous êtes venus",
              "Ils sont venus",
              "Je suis venu",
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Mi wá",
            to: "fr",
            answer: "Venez",
            choices: ["Venez", "Nous venons", "Ils viennent", "Tu viens"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Nous", fon: "Mǐ" },
              { fr: "Vous", fon: "Mi" },
              { fr: "Nous-mêmes", fon: "Mǐ ɖésú" },
              { fr: "Notre père commun", fon: "Mǐtɔ́" },
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "À demain.",
            words: ["Sɔ̀", "mǐ", "nà", "kpé"],
            answer: ["Sɔ̀", "mǐ", "nà", "kpé"],
          },
        ],
      },
      {
        id: "w3l4",
        title: "Ma : subjonctif & impératif",
        emoji: "✨",
        exercises: [
          {
            type: "choice",
            prompt: "Pronom spécial",
            question: "« Ma » s'emploie pour...",
            options: [
              "Le passé simple",
              "Le subjonctif & l'impératif (1ʳᵉ pers.)",
              "La négation",
              "La 3ᵉ personne",
            ],
            answer: "Le subjonctif & l'impératif (1ʳᵉ pers.)",
            hint: "Ex : « Má ɖɔ́ nú mi » = Je vous le dis (que je vous dise).",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Má kpɔ́n",
            to: "fr",
            answer: "Que je voie",
            choices: ["Que je voie", "Je regarde", "Regarde-moi", "Il regarde"],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Mì nú má yì",
            to: "fr",
            answer: "Allons, partons",
            choices: [
              "Allons, partons",
              "Je m'en vais",
              "Reste avec nous",
              "Viens vite",
            ],
          },
          {
            type: "match",
            prompt: "Associe phrase & sens",
            pairs: [
              { fr: "Puis-je venir ?", fon: "Má wá à ?" },
              { fr: "Au revoir", fon: "Ma yi bo wa" },
              { fr: "Donne-moi à boire", fon: "Ná mí sìn má nù" },
              { fr: "Passe devant", fon: "Zɔn ma yì" },
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Je vous le dis.",
            words: ["Má", "ɖɔ́", "nú", "mi"],
            answer: ["Má", "ɖɔ́", "nú", "mi"],
          },
        ],
      },
    ],
  },
];

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
