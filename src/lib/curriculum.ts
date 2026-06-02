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
