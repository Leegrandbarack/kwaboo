export type FonLetter = {
  /** Lettre majuscule (forme du tableau) */
  upper: string;
  /** Forme écrite minuscule */
  lower: string;
  /** Prononciation approximative à la française */
  say: string;
  /** Voyelle nasale (an, in, ɛn, ɔn, un) */
  nasal?: boolean;
  /** Lettre ou son absent du français */
  special?: boolean;
};

/** Alphabet fɔngbè : 36 entrées, relevées du cours « wà kplɔn fɔngbe ». */
export const fonAlphabet: FonLetter[] = [
  { upper: "A", lower: "a", say: "a" },
  { upper: "AN", lower: "an", say: "an", nasal: true },
  { upper: "B", lower: "b", say: "bor" },
  { upper: "C", lower: "c", say: "tch", special: true },
  { upper: "D", lower: "d", say: "dor" },
  { upper: "Ɖ", lower: "ɖ", say: "ndor", special: true },
  { upper: "F", lower: "f", say: "for" },
  { upper: "G", lower: "g", say: "gor" },
  { upper: "GB", lower: "gb", say: "gbor", special: true },
  { upper: "H", lower: "h", say: "hor" },
  { upper: "I", lower: "i", say: "i" },
  { upper: "IN", lower: "in", say: "ign", nasal: true },
  { upper: "J", lower: "j", say: "dj", special: true },
  { upper: "K", lower: "k", say: "kor" },
  { upper: "KP", lower: "kp", say: "kpor", special: true },
  { upper: "L", lower: "l", say: "nlo" },
  { upper: "M", lower: "m", say: "mon" },
  { upper: "N", lower: "n", say: "non" },
  { upper: "NY", lower: "ny", say: "nyor", special: true },
  { upper: "O", lower: "o", say: "o" },
  { upper: "Ɔ", lower: "ɔ", say: "or", special: true },
  { upper: "ƆN", lower: "ɔn", say: "on", nasal: true },
  { upper: "P", lower: "p", say: "por" },
  { upper: "E", lower: "é", say: "é" },
  { upper: "Ɛ", lower: "ɛ", say: "ê", special: true },
  { upper: "ƐN", lower: "ɛn", say: "in", nasal: true },
  { upper: "R", lower: "r", say: "roh" },
  { upper: "S", lower: "s", say: "soh" },
  { upper: "T", lower: "t", say: "toh" },
  { upper: "U", lower: "u", say: "ou" },
  { upper: "UN", lower: "un", say: "oun", nasal: true },
  { upper: "V", lower: "v", say: "voh" },
  { upper: "W", lower: "w", say: "woh" },
  { upper: "X", lower: "x", say: "sroh", special: true },
  { upper: "Y", lower: "y", say: "yoh" },
  { upper: "Z", lower: "z", say: "zoh" },
];

const byUpper = new Map(fonAlphabet.map((l) => [l.upper, l]));
const get = (u: string) => byUpper.get(u)!;

/** Choix de distracteurs : prononciations différentes de celle attendue. */
function others(target: string, pool: string[]) {
  return pool.filter((s) => s !== target);
}

/** Exercices de la leçon « Alphabet et sons du fon », dérivés du tableau. */
export function buildAlphabetExercises() {
  const focus = ["Ɖ", "Ɛ", "Ɔ", "GB", "KP", "X", "NY", "C"].map(get);
  const nasals = fonAlphabet.filter((l) => l.nasal);

  const pronounce = (u: string, distract: string[]) => {
    const l = get(u);
    return {
      type: "choice" as const,
      prompt: `Comment prononce-t-on la lettre « ${l.upper} » ?`,
      question: l.upper,
      options: [l.say, ...others(l.say, distract)].sort(),
      answer: l.say,
      hint: `En fon, « ${l.lower} » se dit « ${l.say} ».`,
    };
  };

  return [
    pronounce("Ɖ", ["dor", "ndor", "tor", "gor"]),
    pronounce("X", ["sroh", "iks", "kor", "soh"]),
    {
      type: "match" as const,
      prompt: "Associe chaque lettre du fon à son son",
      pairs: focus.slice(0, 4).map((l) => ({ fr: l.upper, fon: l.say })),
    },
    pronounce("C", ["tch", "sé", "kor", "dj"]),
    {
      type: "match" as const,
      prompt: "Associe les voyelles nasales à leur son",
      pairs: nasals.slice(0, 4).map((l) => ({ fr: l.upper, fon: l.say })),
    },
    pronounce("Ɛ", ["ê", "é", "i", "or"]),
    {
      type: "match" as const,
      prompt: "Associe chaque lettre du fon à son son",
      pairs: focus.slice(4).map((l) => ({ fr: l.upper, fon: l.say })),
    },
    pronounce("L", ["nlo", "el", "lor", "non"]),
  ];
}
