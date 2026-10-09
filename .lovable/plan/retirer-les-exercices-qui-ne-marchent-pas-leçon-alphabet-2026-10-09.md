# Retirer les exercices qui ne marchent pas (leçon Alphabet)

## Constat

Dans la leçon « Alphabet et sons du fon », 6 des 14 exercices sont des exercices d'écoute (« Écoute et choisis la bonne lettre ») et d'écriture (« Écris la lettre »). Le lecteur d'exercices ne sait pas les afficher : l'écran reste vide et le bouton « Vérifier » ne s'active jamais, donc l'élève est bloqué.

## Ce que je vais faire

- Retirer de la leçon les 3 exercices d'écoute (GB, UN, NY) et les 3 exercices d'écriture (Ɔ, Ɛ, X).
- Garder les 8 exercices qui fonctionnent : questions de prononciation et associations lettre / son.
- Le tableau de l'alphabet avec ses boutons d'écoute au début de la leçon reste tel quel.
- Aucune autre page ne change.

## Détails techniques

- `src/lib/alphabet.ts` : supprimer les appels `fromSound(...)` et `writeLetter(...)` du tableau retourné par `buildAlphabetExercises()`, ainsi que les deux helpers devenus inutiles.
- Vérification : ouvrir `/lesson/l1`, enchaîner les 8 exercices jusqu'à l'écran de fin.
- Bref laisse ce qui marche et dis moi ce que tu a enlevé et leurs rôles 