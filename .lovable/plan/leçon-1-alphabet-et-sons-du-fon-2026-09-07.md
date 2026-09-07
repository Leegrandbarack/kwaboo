# Leçon 1 · Alphabet et sons du fon

## Ce qu'on ajoute

La leçon « Alphabet et sons du fon » (première leçon du Niveau 1) est aujourd'hui vide. On la remplit avec les 33 lettres relevées sur les captures, chacune avec sa prononciation à la française.

## Les lettres retenues (issues des captures)


| Lettre | Écrit | Se prononce |
| ------ | ----- | ----------- |
| A      | a     | a           |
| AN     | an    | an          |
| B      | b     | bor         |
| C      | c     | tch         |
| D      | d     | dor         |
| Ɖ      | ɖ     | ndor        |
| F      | f     | for         |
| G      | g     | gor         |
| GB     | gb    | gbor        |
| H      | h     | hor         |
| I      | i     | i           |
| IN     | in    | ign         |
| J      | j     | dj          |
| K      | k     | kor         |
| KP     | kp    | kpor        |
| L      | l     | nlo         |
| M      | m     | mon         |
| N      | n     | non         |
| NY     | ny    | nyor        |
| O      | o     | o           |
| Ɔ      | ɔ     | or          |
| ƆN     | ɔn    | on          |
| P      | p     | por         |
| E      | é     | é           |
| Ɛ      | ɛ     | ê           |
| ƐN     | ɛn    | in          |
| R      | r     | roh         |
| S      | s     | soh         |
| T      | t     | toh         |
| U      | u     | ou          |
| UN     | un    | oun         |
| V      | v     | voh         |
| W      | w     | woh         |
| X      | x     | sroh        |
| Y      | y     | yoh         |
| Z      | z     | zoh         |


## Comment ça se présente dans l'appli

1. **Tableau de référence** avant de commencer : en ouvrant la leçon, on voit d'abord la liste complète des lettres avec leur prononciation et un bouton d'écoute sur chaque ligne, puis un bouton « Commencer ».
2. **Exercices** ensuite, environ 12, construits uniquement à partir du tableau ci-dessus :
  - reconnaître la prononciation d'une lettre (choix multiple) ;
  - retrouver la lettre à partir du son entendu (écoute) ;
  - associer lettres et sons par paires (les lettres propres au fon : Ɖ, Ɛ, Ɔ, GB, KP, X, NY, C) ;
  - écrire la lettre correspondant à un son.
3. Les sons nasaux (AN, IN, ƐN, ƆN, UN) et les lettres absentes du français (Ɖ, Ɛ, Ɔ, GB, KP, X) sont mis en avant, car ce sont les vraies difficultés.

## Détails techniques

- Nouveau fichier `src/lib/alphabet.ts` : constante `fonAlphabet` (lettre, minuscule, prononciation, note nasal/spécifique).
- `src/lib/curriculum.ts` : la leçon `l1` reçoit ses `exercises` (types déjà existants `choice`, `listen`, `match`, `write`) générés depuis `fonAlphabet` — aucun nouveau type d'exercice.
- Nouveau composant `src/components/lesson/AlphabetIntro.tsx` (tableau + `SpeakButton`), affiché par `src/routes/lesson.$id.tsx` avant `ExercisePlayer` pour la leçon `l1`.
- La prononciation utilise la synthèse vocale déjà en place (`SpeakButton`) : c'est une approximation, pas une voix fon native. 
- respecte le temps choisi par l'utilsateur 
- &nbsp;

## Limite à signaler

La prononciation « à la française » vient des captures du cours ; les tons (accents hauts/bas) ne figurent pas sur ces tableaux et ne sont donc pas enseignés dans cette leçon.