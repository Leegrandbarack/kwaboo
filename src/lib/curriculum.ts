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
      {
        id: "w3l5",
        title: "Nyɛ, Nyì, Un (1ʳᵉ pers.)",
        emoji: "🙋",
        exercises: [
          {
            type: "choice",
            prompt: "Pronom 1ʳᵉ pers.",
            question: "« Un » correspond à...",
            options: ["Je (sujet)", "Moi (complément)", "Tu", "Il"],
            answer: "Je (sujet)",
            hint: "Un se place devant le verbe : « Un jáwè » = J'arrive.",
          },
          {
            type: "choice",
            prompt: "Forme emphatique",
            question: "« Nyɛ » signifie...",
            options: ["Je (sujet neutre)", "Moi (emphatique/complément)", "Toi", "Lui"],
            answer: "Moi (emphatique/complément)",
            hint: "Nyì est une variante de Nyɛ.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Un ná yì Glèxwé",
            to: "fr",
            answer: "J'irai à Ouidah",
            choices: ["J'irai à Ouidah", "Je viens de Ouidah", "Tu vas à Ouidah", "Il est à Ouidah"],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Nyɛ ma sanfú né",
            to: "fr",
            answer: "Je m'en fous",
            choices: ["Je m'en fous", "Je suis fatigué", "J'ai faim", "Je viens"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "J'arrive.",
            words: ["Un", "jáwè"],
            answer: ["Un", "jáwè"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Je (sujet)", fon: "Un" },
              { fr: "Moi (emphatique)", fon: "Nyɛ" },
              { fr: "Moi-même", fon: "Nyɛɖéé" },
              { fr: "Mon frère aîné", fon: "Nyɛ kpódó fofó" },
            ],
          },
        ],
      },
      {
        id: "w3l6",
        title: "Wè (toi) & Yě (ils/elles)",
        emoji: "👥",
        exercises: [
          {
            type: "choice",
            prompt: "Pronom complément",
            question: "« Wè » signifie...",
            options: ["Toi (complément)", "Vous", "Lui", "Nous"],
            answer: "Toi (complément)",
            hint: "Wè suit le verbe : « Doo nú wè » = Bienvenue à toi.",
          },
          {
            type: "choice",
            prompt: "Pluriel",
            question: "« Yě » signifie...",
            options: ["Nous", "Vous", "Ils / Elles", "Eux-mêmes"],
            answer: "Ils / Elles",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Agoò nú wè",
            to: "fr",
            answer: "Prends garde à toi",
            choices: ["Prends garde à toi", "Bienvenue à toi", "Merci à toi", "Honte à toi"],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Yè klán gbɛ̀",
            to: "fr",
            answer: "Ils ne s'entendent plus",
            choices: ["Ils ne s'entendent plus", "Ils sont arrivés", "Ils ont crié", "Ils chantent"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Bienvenue à toi.",
            words: ["Doo", "nú", "wè"],
            answer: ["Doo", "nú", "wè"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Toi (complément)", fon: "Wè" },
              { fr: "Ils / Elles", fon: "Yě" },
              { fr: "Eux-mêmes", fon: "Yěɖéé" },
              { fr: "Ils ont eu honte", fon: "Winnyá hú yě" },
            ],
          },
        ],
      },
      {
        id: "w3l7",
        title: "Possessifs & réflexifs",
        emoji: "🪞",
        exercises: [
          {
            type: "choice",
            prompt: "Possessif",
            question: "« Towe » signifie...",
            options: ["Mon", "Ton", "Son", "Notre"],
            answer: "Ton",
            hint: "Afɔ towe = ton pied ; Nù tówé = ta chose.",
          },
          {
            type: "choice",
            prompt: "Réflexif",
            question: "« Hwiɖéé » signifie...",
            options: ["Moi-même", "Toi-même", "Lui-même", "Vous-mêmes"],
            answer: "Toi-même",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Nù tówé hú dó mì",
            to: "fr",
            answer: "J'ai besoin de toi",
            choices: ["J'ai besoin de toi", "C'est à toi", "Je viens vers toi", "Tu me cherches"],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Notre, nos",
            to: "fon",
            answer: "Mǐtɔ̀n",
            choices: ["Mǐtɔ̀n", "Mitɔ̀n", "Yětɔ̀n", "Towe"],
          },
          {
            type: "match",
            prompt: "Associe possessifs & réflexifs",
            pairs: [
              { fr: "Notre, nos", fon: "Mǐtɔ̀n" },
              { fr: "Votre, vos", fon: "Mitɔ̀n" },
              { fr: "Leur, leurs", fon: "Yětɔ̀n" },
              { fr: "Vous-mêmes", fon: "Miɖéé" },
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "C'est à toi.",
            words: ["Towe", "wè"],
            answer: ["Towe", "wè"],
          },
        ],
      },
    ],
  },
  {
    id: "w4",
    title: "Conjugaison",
    subtitle: "Impératif, temps & particules",
    emoji: "⚡",
    color: "primary",
    lessons: [
      {
        id: "w4l1",
        title: "Impératif singulier",
        emoji: "❗",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "Comment forme-t-on l'impératif (tu) en Fon ?",
            options: [
              "On ajoute « na » devant le verbe",
              "On utilise le radical du verbe seul",
              "On met « mi » devant",
              "On ajoute « ó » à la fin",
            ],
            answer: "On utilise le radical du verbe seul",
            hint: "Ex : Gbɔ̀ ! = Calme-toi !",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "N'àbɔ̌ !",
            to: "fr",
            answer: "Tais-toi !",
            choices: ["Tais-toi !", "Calme-toi !", "Lève-toi !", "Viens !"],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Viens ici",
            to: "fon",
            answer: "Wǎ fí",
            choices: ["Wǎ fí", "Yì fí", "Sɛ yi", "Wǎ mì"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Recule un peu.",
            words: ["Sɛ", "yi", "ɖòn", "kpɛɖé"],
            answer: ["Sɛ", "yi", "ɖòn", "kpɛɖé"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Calme-toi !", fon: "Gbɔ̀ !" },
              { fr: "Tais-toi !", fon: "N'àbɔ̌ !" },
              { fr: "Viens vers moi", fon: "Wǎ mì" },
              { fr: "Attention !", fon: "Xwe sɔ̀ !" },
            ],
          },
        ],
      },
      {
        id: "w4l2",
        title: "Impératif pluriel (Mi…)",
        emoji: "👥",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "Pour donner un ordre à plusieurs personnes, on place...",
            options: ["« Na » devant le verbe", "« Mi » devant le verbe", "« Ko » devant", "Rien"],
            answer: "« Mi » devant le verbe",
            hint: "Mi glá ! = Soyez courageux !",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Mi dó gbɛ̀",
            to: "fr",
            answer: "Bonne nuit à vous",
            choices: ["Bonne nuit à vous", "Bonjour à vous", "Arrêtez le travail", "Mangez"],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Prenez et mangez.",
            to: "fon",
            answer: "Mi yí bó ɖù",
            choices: ["Mi yí bó ɖù", "Mi ná tèn", "Mi glá", "Mi sé yi"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Arrêtez le travail.",
            words: ["Mi", "ɖ'álɔ", "té"],
            answer: ["Mi", "ɖ'álɔ", "té"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Soyez courageux !", fon: "Mi glá !" },
              { fr: "Reculez-vous", fon: "Mi sé yi gǔɖò" },
              { fr: "Rangez-vous", fon: "Mi ná tèn" },
              { fr: "Écoutez ces paroles", fon: "Mi ɖó tó xó élɔ́ lɛ́" },
            ],
          },
        ],
      },
      {
        id: "w4l3",
        title: "Forme négative (Ma… ó)",
        emoji: "🚫",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "Comment exprime-t-on un ordre négatif en Fon ?",
            options: [
              "« Ma » devant le verbe + « ó » à la fin",
              "« Na » devant",
              "Inversion du verbe",
              "« Ko » devant",
            ],
            answer: "« Ma » devant le verbe + « ó » à la fin",
            hint: "Ma j'àyì ó = Ne tombe pas.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Ma bà ɖò nà ó",
            to: "fr",
            answer: "Ne cherche pas à comprendre",
            choices: [
              "Ne cherche pas à comprendre",
              "Ne tombe pas",
              "Ne me touche pas",
              "Ne crie pas",
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Ne me touche pas.",
            to: "fon",
            answer: "Ma ɖ'álɔ̀ wù yé ó",
            choices: [
              "Ma ɖ'álɔ̀ wù yé ó",
              "Ma j'àyì ó",
              "Ma bà ɖò nà ó",
              "Ma sɛ yi ó",
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Ne tombe pas.",
            words: ["Ma", "j'àyì", "ó"],
            answer: ["Ma", "j'àyì", "ó"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Ne tombe pas", fon: "Ma j'àyì ó" },
              { fr: "Ne cherche pas à comprendre", fon: "Ma bà ɖò nà ó" },
              { fr: "Ne restez pas dispersés", fon: "Mi ma nɔ gdadógbádó ó" },
              { fr: "Ne soyez pas inquiets", fon: "Nùɖé má gb'ayi dó nú mi ó" },
            ],
          },
        ],
      },
      {
        id: "w4l4",
        title: "Particules : bo, ló, ní, vě",
        emoji: "✨",
        exercises: [
          {
            type: "choice",
            prompt: "Particule",
            question: "La particule « bo » sert à...",
            options: [
              "Renforcer l'impératif (« donc »)",
              "Marquer la négation",
              "Marquer le futur",
              "Marquer le passé",
            ],
            answer: "Renforcer l'impératif (« donc »)",
            hint: "Wǎ bó ! = Viens donc !",
          },
          {
            type: "choice",
            prompt: "Particule",
            question: "« Ló » exprime...",
            options: ["Le souhait", "L'impatience", "Le passé", "Le futur"],
            answer: "Le souhait",
            hint: "Mǎwù ló bló ɖagbe = Que Dieu te fasse du bien.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Sin ní yi kɔ̀",
            to: "fr",
            answer: "À votre santé !",
            choices: ["À votre santé !", "Bonne nuit", "Bon voyage", "Bienvenue"],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Vè glá",
            to: "fr",
            answer: "Sois courageux",
            choices: ["Sois courageux", "Calme-toi", "Tais-toi", "Avance"],
          },
          {
            type: "match",
            prompt: "Associe particule & sens",
            pairs: [
              { fr: "bo : renforce l'ordre", fon: "Wǎ bó !" },
              { fr: "ló : souhait", fon: "Mǎwù ló bló ɖagbe" },
              { fr: "ní : souhait/ordre", fon: "Sin ní yi kɔ̀" },
              { fr: "vě : exhortation", fon: "Vè kpɔ́n" },
            ],
          },
        ],
      },
      {
        id: "w4l5",
        title: "Aoriste (radical seul)",
        emoji: "📜",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "L'aoriste (action accomplie) s'exprime...",
            options: [
              "Par le radical du verbe seul",
              "Avec la particule « na »",
              "Avec « ko »",
              "Avec « nɔ »",
            ],
            answer: "Par le radical du verbe seul",
            hint: "É jǎwè = Il arrive. Un wá = Je suis venu.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "A sè à ?",
            to: "fr",
            answer: "As-tu entendu ?",
            choices: ["As-tu entendu ?", "As-tu vu ?", "Es-tu venu ?", "As-tu mangé ?"],
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Un wá yì Zanjɛ́nnádó",
            to: "fr",
            answer: "J'arrive de Zagnanado",
            choices: [
              "J'arrive de Zagnanado",
              "Je vais à Zagnanado",
              "Il vient de Zagnanado",
              "Nous partons à Zagnanado",
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Il arrive.",
            words: ["É", "jǎwè"],
            answer: ["É", "jǎwè"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "As-tu entendu ?", fon: "A sè à ?" },
              { fr: "Il arrive", fon: "É jǎwè" },
              { fr: "C'est très bon", fon: "É víví káká" },
              { fr: "D'où viens-tu ?", fon: "Fité à wǎ ?" },
            ],
          },
        ],
      },
      {
        id: "w4l6",
        title: "Passé accompli (ko)",
        emoji: "⏪",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "La particule « ko » placée entre sujet et verbe indique...",
            options: [
              "Une action totalement terminée (déjà)",
              "Le futur",
              "Le présent habituel",
              "Une négation",
            ],
            answer: "Une action totalement terminée (déjà)",
            hint: "Un ko kpò = Je suis déjà vieux.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Mǐ kó wá Gbɔxíkɔ̀n",
            to: "fr",
            answer: "Nous sommes arrivés à Bohicon",
            choices: [
              "Nous sommes arrivés à Bohicon",
              "Nous irons à Bohicon",
              "Nous venons de Bohicon",
              "Ils sont à Bohicon",
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "J'ai déjà vendu à quelqu'un.",
            to: "fon",
            answer: "Un ko kpan'lɔ̀",
            choices: ["Un ko kpan'lɔ̀", "Un ná kpan'lɔ̀", "Un nɔ kpan'lɔ̀", "Un kpan'lɔ̀"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Je suis déjà vieux.",
            words: ["Un", "ko", "kpò"],
            answer: ["Un", "ko", "kpò"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Je suis déjà vieux", fon: "Un ko kpò" },
              { fr: "Nous sommes arrivés à Bohicon", fon: "Mǐ kó wá Gbɔxíkɔ̀n" },
              { fr: "Oui, je te rattrape déjà", fon: "Un ko jàwè mɛ́ !" },
              { fr: "Nous aurions déjà dîné", fon: "Mǐ nà kó ɖu nǔ" },
            ],
          },
        ],
      },
      {
        id: "w4l7",
        title: "Futur (na)",
        emoji: "🚀",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "Pour exprimer le futur, on place...",
            options: [
              "« na » entre le sujet et le verbe",
              "« ko » devant le verbe",
              "« nɔ » devant le verbe",
              "« ɖò…wɛ̀ » autour du verbe",
            ],
            answer: "« na » entre le sujet et le verbe",
            hint: "Un ná yì Glèxwé = J'irai à Ouidah.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "É ná fɛ́ gba ta wè",
            to: "fr",
            answer: "Cela retombera sur toi",
            choices: [
              "Cela retombera sur toi",
              "Il viendra te voir",
              "Tu seras heureux",
              "Cela te plaira",
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "J'irai à Ouidah.",
            to: "fon",
            answer: "Un ná yì Glèxwé",
            choices: ["Un ná yì Glèxwé", "Un ko yì Glèxwé", "Un yì Glèxwé", "Un nɔ yì Glèxwé"],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Ses fruits seront bons.",
            words: ["Sísɛ́n", "tɔ́n", "ná", "nylá", "mɔ̌"],
            answer: ["Sísɛ́n", "tɔ́n", "ná", "nylá", "mɔ̌"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "J'irai à Ouidah", fon: "Un ná yì Glèxwé" },
              { fr: "Il a dit qu'il viendra", fon: "É ɖɔ̀ émí ná wá" },
              { fr: "Je voudrais être ton ami", fon: "Un jlo ná zùn xɔ́ntɔ́n xá wè" },
              { fr: "Venez vite que nous partions", fon: "Mi yá wǔ a caca nú mì ná yì" },
            ],
          },
        ],
      },
      {
        id: "w4l8",
        title: "Habituel (nɔ)",
        emoji: "🔁",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "La particule « nɔ » entre sujet et verbe exprime...",
            options: [
              "Une habitude / un état durable",
              "Le futur",
              "Une action terminée",
              "La négation",
            ],
            answer: "Une habitude / un état durable",
            hint: "É nɔ ɖɔ fɔngbe ganjí = Il parle bien le fon.",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Cukú nɔ lun ɖè",
            to: "fr",
            answer: "Le chien bave",
            choices: ["Le chien bave", "Le chien aboie", "Le chien dort", "Le chien court"],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Ce chien aboie beaucoup.",
            to: "fon",
            answer: "Avún élɔ́ nɔ hó ɖésú",
            choices: [
              "Avún élɔ́ nɔ hó ɖésú",
              "Avún élɔ́ ɖò hó wɛ̀",
              "Avún élɔ́ ná hó",
              "Avún élɔ́ ko hó",
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Il parle bien le fon.",
            words: ["É", "nɔ", "ɖɔ", "fɔngbe", "ganjí"],
            answer: ["É", "nɔ", "ɖɔ", "fɔngbe", "ganjí"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "Il parle bien le fon", fon: "É nɔ ɖɔ fɔngbe ganjí" },
              { fr: "Le chien bave", fon: "Cukú nɔ lun ɖè" },
              { fr: "Il est infatigable", fon: "Nù nɔ ci kɔn'í ǎ" },
              { fr: "L'eau de ruissellement coule", fon: "Ayìsún nɔ sà" },
            ],
          },
        ],
      },
      {
        id: "w4l9",
        title: "Progressif (ɖò… wɛ̀)",
        emoji: "🌀",
        exercises: [
          {
            type: "choice",
            prompt: "Règle",
            question: "« ɖò … wɛ̀ » autour du verbe exprime...",
            options: [
              "Une action en cours (être en train de)",
              "Une habitude",
              "Le passé",
              "Le futur",
            ],
            answer: "Une action en cours (être en train de)",
            hint: "É ɖò bìbí wɛ̀ = Il est en train de cuire.",
          },
          {
            type: "choice",
            prompt: "Piège",
            question: "Différence entre « nɔ » et « ɖò…wɛ̀ » ?",
            options: [
              "« nɔ » = habitude/état ; « ɖò…wɛ̀ » = action en cours",
              "Ils signifient la même chose",
              "« nɔ » = futur ; « ɖò…wɛ̀ » = passé",
              "« ɖò…wɛ̀ » sert à nier",
            ],
            answer: "« nɔ » = habitude/état ; « ɖò…wɛ̀ » = action en cours",
          },
          {
            type: "translate",
            prompt: "Traduire en français",
            from: "Tɔ̀ ɔ́ ɖò sin ɖi wɛ̀",
            to: "fr",
            answer: "Le fleuve est en crue",
            choices: [
              "Le fleuve est en crue",
              "Le fleuve coule lentement",
              "Le fleuve s'est tari",
              "Le fleuve déborde toujours",
            ],
          },
          {
            type: "translate",
            prompt: "Traduire en Fon",
            from: "Le coq chante.",
            to: "fon",
            answer: "Koklójó ɖò asi kó wɛ̀",
            choices: [
              "Koklójó ɖò asi kó wɛ̀",
              "Koklójó nɔ asi kó",
              "Koklójó ná asi kó",
              "Koklójó ko asi kó",
            ],
          },
          {
            type: "order",
            prompt: "Reconstruis",
            french: "Il est en train de cuire.",
            words: ["É", "ɖò", "bìbí", "wɛ̀"],
            answer: ["É", "ɖò", "bìbí", "wɛ̀"],
          },
          {
            type: "match",
            prompt: "Associe",
            pairs: [
              { fr: "La pluie se fait plus forte", fon: "Jǐ ɖò wuwu wɛ̀" },
              { fr: "La maladie s'aggrave", fon: "Azɔ̀n ɔ ɖò syɛ́nsyɛ́n wɛ̀" },
              { fr: "Ils se hâtent", fon: "Yě ɖò fyáfyá wɛ̀" },
              { fr: "La nuit vient", fon: "Zǎn ɖò kúkú wɛ̀" },
            ],
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Monde 5 — Vie quotidienne (chiffres, marché, voyages, conversations)
// Utilise les nouveaux types d'exercices : image, fill, listen, write.
// ---------------------------------------------------------------------------

const world5: World = {
  id: "w5",
  title: "Vie quotidienne",
  subtitle: "Chiffres, marché, voyages et conversations",
  emoji: "🛍️",
  color: "gold",
  lessons: [
    {
      id: "w5l1",
      title: "Les chiffres 1 à 5",
      emoji: "🔢",
      exercises: [
        {
          type: "choice",
          prompt: "Nouveau mot",
          question: "Comment dit-on « un » en Fon ?",
          options: ["ɖokpó", "wè", "atɔn", "wǒ"],
          answer: "ɖokpó",
          hint: "ɖokpó = 1, wè = 2, atɔn = 3.",
        },
        {
          type: "image",
          prompt: "Associe le mot à l'image",
          question: "atɔn",
          options: [
            { emoji: "1️⃣", label: "ɖokpó" },
            { emoji: "2️⃣", label: "wè" },
            { emoji: "3️⃣", label: "atɔn" },
            { emoji: "5️⃣", label: "atɔɔn" },
          ],
          answer: "atɔn",
        },
        {
          type: "listen",
          prompt: "Écoute et choisis",
          audioText: "atɔɔn",
          question: "Quel chiffre entends-tu ?",
          options: ["2", "3", "4", "5"],
          answer: "5",
        },
        {
          type: "fill",
          prompt: "Complète la phrase",
          sentence: "Un mɔ̀ ___ mɛ. (J'ai vu deux personnes.)",
          translation: "wè = deux",
          options: ["ɖokpó", "wè", "atɔn", "ɛnɛ"],
          answer: "wè",
        },
        {
          type: "write",
          prompt: "Écris ta réponse",
          question: "Écris « quatre » en Fon.",
          answer: "ɛnɛ",
          accept: ["enɛ", "ene", "ɛnɛ"],
          hint: "Ça s'écrit avec deux ɛ.",
        },
      ],
    },
    {
      id: "w5l2",
      title: "Au marché",
      emoji: "🧺",
      exercises: [
        {
          type: "choice",
          prompt: "Nouveau mot",
          question: "Comment dit-on « marché » en Fon ?",
          options: ["axi", "xwé", "ali", "sin"],
          answer: "axi",
          hint: "Le grand marché de Cotonou : Dantokpa.",
        },
        {
          type: "image",
          prompt: "Associe le mot à l'image",
          question: "sìn (eau)",
          options: [
            { emoji: "💧", label: "sìn" },
            { emoji: "🍚", label: "wɔ̌" },
            { emoji: "🐟", label: "hweví" },
            { emoji: "🍌", label: "kwékwé" },
          ],
          answer: "sìn",
        },
        {
          type: "fill",
          prompt: "Complète la phrase",
          sentence: "Nǔ élɔ́ xɔ ___ ? (Combien coûte ceci ?)",
          translation: "nabí = combien",
          options: ["nabí", "akwɛ́", "fítɛ́", "mɛ̌"],
          answer: "nabí",
        },
        {
          type: "listen",
          prompt: "Écoute et choisis",
          audioText: "akwɛ́",
          question: "Que signifie ce mot ?",
          options: ["Argent", "Eau", "Route", "Maison"],
          answer: "Argent",
        },
        {
          type: "order",
          prompt: "Reconstruis la phrase",
          french: "Je vais au marché.",
          words: ["Un", "yì", "axi", "mɛ"],
          answer: ["Un", "yì", "axi", "mɛ"],
        },
        {
          type: "write",
          prompt: "Écris ta réponse",
          question: "Écris « marché » en Fon.",
          answer: "axi",
        },
      ],
    },
    {
      id: "w5l3",
      title: "Les voyages",
      emoji: "🚌",
      exercises: [
        {
          type: "choice",
          prompt: "Nouveau mot",
          question: "Comment dit-on « route / chemin » en Fon ?",
          options: ["ali", "axi", "xwé", "hwenu"],
          answer: "ali",
        },
        {
          type: "image",
          prompt: "Associe le mot à l'image",
          question: "mɔ̌to",
          options: [
            { emoji: "🚗", label: "mɔ̌to" },
            { emoji: "🚲", label: "kɛ̀kɛ́" },
            { emoji: "✈️", label: "jɔhɔ̀nmɛhun" },
            { emoji: "🛶", label: "tɔjihun" },
          ],
          answer: "mɔ̌to",
        },
        {
          type: "fill",
          prompt: "Complète la phrase",
          sentence: "A na yì ___ ? (Où vas-tu ?)",
          translation: "fítɛ́ = où",
          options: ["fítɛ́", "nabí", "mɛ̌", "hwetɛ́nu"],
          answer: "fítɛ́",
        },
        {
          type: "listen",
          prompt: "Écoute et choisis",
          audioText: "Un na yì Kutɔnu",
          question: "Quelle est la traduction ?",
          options: ["J'irai à Cotonou", "Je viens de Cotonou", "Je suis à la maison", "Je vais au marché"],
          answer: "J'irai à Cotonou",
        },
        {
          type: "write",
          prompt: "Écris ta réponse",
          question: "Écris « aller » en Fon.",
          answer: "yì",
          accept: ["yi", "yì"],
        },
      ],
    },
    {
      id: "w5l4",
      title: "Conversations quotidiennes",
      emoji: "🗣️",
      exercises: [
        {
          type: "listen",
          prompt: "Écoute et choisis",
          audioText: "A fɔn ganji à ?",
          question: "Que te demande-t-on ?",
          options: ["Comment vas-tu ?", "Où vas-tu ?", "Quel est ton nom ?", "Combien ça coûte ?"],
          answer: "Comment vas-tu ?",
        },
        {
          type: "fill",
          prompt: "Complète la phrase",
          sentence: "Nyikɔ ce nyí ___. (Mon nom est ...)",
          translation: "Complète avec ton prénom : ici « Kofi ».",
          options: ["Kofi", "axi", "sìn", "wǒ"],
          answer: "Kofi",
        },
        {
          type: "order",
          prompt: "Reconstruis la phrase",
          french: "Merci beaucoup.",
          words: ["Awanou", "kaka"],
          answer: ["Awanou", "kaka"],
        },
        {
          type: "match",
          prompt: "Associe les mots",
          pairs: [
            { fr: "Bonjour", fon: "A fɔn ganji à ?" },
            { fr: "Merci", fon: "Awanou" },
            { fr: "Où ?", fon: "Fítɛ́ ?" },
            { fr: "Combien ?", fon: "Nabí ?" },
          ],
        },
        {
          type: "write",
          prompt: "Écris ta réponse",
          question: "Écris « merci » en Fon.",
          answer: "awanou",
          accept: ["Awanou", "awanu"],
        },
      ],
    },
  ],
};

worlds.push(world5);



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
// Les leçons ci-dessous référencent les ids définis dans `worlds`.
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


export const sections: Section[] = [
  {
    id: "s1",
    title: "Premiers pas",
    titleFon: "Afɔ nukɔntɔn lɛ",
    subtitle: "Saluer et engager la conversation",
    emoji: "👋",
    level: "beginner",
    color: "primary",
    units: [
      {
        id: "s1u1",
        title: "Salutations",
        titleFon: "Ðò kúdó nú mɛ",
        emoji: "☀️",
        objective: "Saluer, remercier et dire oui/non",
        reward: { badge: "🌅", label: "Premier bonjour", xp: 30 },
        lessonIds: ["w1l1", "w1l2"],
      },
      {
        id: "s1u2",
        title: "Prendre des nouvelles",
        titleFon: "Kanbyɔ́ mɛ",
        emoji: "💬",
        objective: "Demander comment va quelqu'un et répondre",
        reward: { badge: "🤝", label: "Bon voisin", xp: 30 },
        lessonIds: ["w1l3", "w3l1"],
      },
    ],
  },
  {
    id: "s2",
    title: "Moi et les miens",
    titleFon: "Nyɛ kpó hɛnnu ce kpó",
    subtitle: "Famille et pronoms personnels",
    emoji: "👨‍👩‍👧",
    level: "beginner",
    color: "gold",
    units: [
      {
        id: "s2u1",
        title: "La famille",
        titleFon: "Xwé",
        emoji: "🏠",
        objective: "Nommer les membres de la famille et la maison",
        reward: { badge: "🏡", label: "Cœur de famille", xp: 40 },
        lessonIds: ["w2l1", "w2l2"],
      },
      {
        id: "s2u2",
        title: "Se présenter",
        titleFon: "Ðexlɛ́ mɛɖée",
        emoji: "🙋",
        objective: "Dire son nom et parler de soi",
        reward: { badge: "🪪", label: "Enchanté !", xp: 40 },
        lessonIds: ["w3l2", "w3l5"],
      },
      {
        id: "s2u3",
        title: "Parler au groupe",
        titleFon: "Ðɔ nú gbɛ̌ta",
        emoji: "👥",
        objective: "Utiliser nous, vous, ils",
        reward: { badge: "🫂", label: "Voix du groupe", xp: 40 },
        lessonIds: ["w3l3", "w3l6"],
      },
      {
        id: "s2u4",
        title: "Ce qui est à moi",
        titleFon: "Nǔ ce lɛ",
        emoji: "🎁",
        objective: "Exprimer la possession",
        reward: { badge: "🔑", label: "À moi", xp: 30 },
        lessonIds: ["w3l7"],
      },
    ],
  },
  {
    id: "s3",
    title: "Vie quotidienne",
    titleFon: "Gbɛ̀ zǎnzǎn",
    subtitle: "Chiffres, marché, voyages et conversations",
    emoji: "🛍️",
    level: "intermediate",
    color: "gold",
    units: [
      {
        id: "s3u0a",
        title: "Les chiffres",
        titleFon: "Sɔgbe lɛ",
        emoji: "🔢",
        objective: "Compter de 1 à 10 en Fon",
        reward: { badge: "🧮", label: "Bon compteur", xp: 30 },
        lessonIds: ["w5l1"],
      },
      {
        id: "s3u0b",
        title: "Au marché",
        titleFon: "Axi mɛ",
        emoji: "🧺",
        objective: "Acheter, demander un prix, négocier",
        reward: { badge: "🪙", label: "Roi du marché", xp: 40 },
        lessonIds: ["w5l2"],
      },
      {
        id: "s3u0c",
        title: "Les voyages",
        titleFon: "Tomɛyiyi",
        emoji: "🚌",
        objective: "Se déplacer et demander son chemin",
        reward: { badge: "🧭", label: "Voyageur", xp: 40 },
        lessonIds: ["w5l3"],
      },
      {
        id: "s3u0d",
        title: "Conversations quotidiennes",
        titleFon: "Xóɖɔ́ zǎnzǎn",
        emoji: "🗣️",
        objective: "Tenir une courte conversation naturelle",
        reward: { badge: "🎙️", label: "Belle langue", xp: 50 },
        lessonIds: ["w5l4"],
      },
    ],
  },
  {
    id: "s4",
    title: "Agir et parler",
    titleFon: "Wà nǔ bo ɖɔ xó",
    subtitle: "Impératif, négation et nuances",
    emoji: "⚡",
    level: "intermediate",
    color: "coral",
    units: [
      {
        id: "s4u1",
        title: "Donner un ordre",
        titleFon: "Ná gbè",
        emoji: "📣",
        objective: "Utiliser l'impératif singulier et pluriel",
        reward: { badge: "📢", label: "Voix claire", xp: 40 },
        lessonIds: ["w4l1", "w4l2"],
      },
      {
        id: "s4u2",
        title: "Dire non",
        titleFon: "Ðɔ eǒ",
        emoji: "🚫",
        objective: "Construire la négation",
        reward: { badge: "🛑", label: "Ferme et poli", xp: 40 },
        lessonIds: ["w4l3", "w3l4"],
      },
      {
        id: "s4u3",
        title: "Nuancer sa phrase",
        titleFon: "Xógbe sín kpɔ́ndéwú",
        emoji: "🎚️",
        objective: "Ajouter les particules bo, ló, ná, ní",
        reward: { badge: "🎛️", label: "Fin diseur", xp: 30 },
        lessonIds: ["w4l4"],
      },
    ],
  },
  {
    id: "s5",
    title: "Le temps",
    titleFon: "Hwenu",
    subtitle: "Passé, futur, habitudes et progressif",
    emoji: "⏳",
    level: "advanced",
    color: "primary",
    units: [
      {
        id: "s5u1",
        title: "Le fait simple",
        titleFon: "Nǔwiwa pléwun",
        emoji: "✅",
        objective: "Employer l'aoriste",
        reward: { badge: "⏱️", label: "Juste à temps", xp: 30 },
        lessonIds: ["w4l5"],
      },
      {
        id: "s5u2",
        title: "Parler du passé",
        titleFon: "Ðɔ xó dó hwexónu",
        emoji: "🕰️",
        objective: "Raconter avec le passé accompli ko",
        reward: { badge: "📜", label: "Conteur", xp: 40 },
        lessonIds: ["w4l6"],
      },
      {
        id: "s5u3",
        title: "Parler du futur",
        titleFon: "Ðɔ xó dó sɔ́gudo",
        emoji: "🔮",
        objective: "Projeter avec na",
        reward: { badge: "🌠", label: "Visionnaire", xp: 40 },
        lessonIds: ["w4l7"],
      },
      {
        id: "s5u4",
        title: "Habitudes & en cours",
        titleFon: "Aca kpó nǔwiwa hwenɛnu kpó",
        emoji: "🔁",
        objective: "Utiliser nɔ et ɖò...wɛ̀",
        reward: { badge: "🏅", label: "Maître du temps", xp: 60 },
        lessonIds: ["w4l8", "w4l9"],
      },
    ],
  },
];


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
