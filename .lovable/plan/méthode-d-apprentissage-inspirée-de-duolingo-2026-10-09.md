# Méthode d'apprentissage inspirée de Duolingo

Duolingo ne publie pas son algorithme exact. On reprend ses méthodes connues et on les applique à toutes les leçons. Le contenu fon des 35 autres leçons sera ajouté plus tard par toi.

## 1. Tous les types d'exercices fonctionnent
- **Écoute** : bouton haut-parleur qui lit le son, puis choix de la bonne réponse.
- **Écriture** : zone de texte, réponse acceptée sans tenir compte des majuscules, espaces ou accents simples (et des variantes prévues).
- **Phrase à trous** et **image** : affichés eux aussi, au cas où ils serviraient.
- On remet dans la leçon Alphabet les 6 exercices d'écoute et d'écriture retirés tout à l'heure.

## 2. Reprise des erreurs pendant la leçon
- Une question ratée est remise à la fin de la leçon.
- La leçon se termine seulement quand chaque question a été réussie une fois.
- La barre de progression avance seulement quand une réponse est juste.

## 3. Difficulté adaptée
- Pour chaque élève, l'app suit le taux de réussite récent.
- S'il réussit beaucoup : moins d'aide (pas d'indice, plus d'exercices d'écriture et d'écoute, moins de choix faciles).
- S'il se trompe souvent : plus d'aide (indice proposé, plus de questions à choix ou d'association).
- L'ordre des exercices est mélangé un peu à chaque fois.

## 4. Révision espacée par mot
- Chaque élément appris (lettre, mot) reçoit une « force » de 0 à 5.
- Bonne réponse : la force monte et la prochaine révision est repoussée (1, 2, 4, 7, 14 jours).
- Mauvaise réponse : la force baisse et l'élément revient vite.
- La force baisse aussi avec le temps si on ne révise pas.

## 5. Leçon d'entraînement
- Un bouton « S'entraîner » en haut de la page Apprendre.
- Il crée une courte séance (10 questions environ) avec les éléments les plus faibles ou dont la date de révision est passée.
- Gain d'XP réduit, comme dans Duolingo. Si rien n'est à revoir, le bouton est désactivé avec un message clair.

## Ce qui ne change pas
Accueil, curriculum (36 leçons), cœurs, gemmes et autres pages.

## Détails techniques
- `ExercisePlayer.tsx` : rendu + `isReady`/`isCorrect`/`correctText` pour `listen`, `write`, `fill`, `image` ; file d'attente (`queue`) avec réinsertion des ratés ; progression = réussis / total unique.
- Nouveau `src/lib/learning.ts` : `normalizeAnswer`, suivi de performance (localStorage), `adaptExercises(exs, skill)` (mélange, retrait d'indice, tri selon le niveau).
- `src/lib/review.ts` : enregistrer aussi les réussites (`recordAttempt(item, ok)`), stocker l'exercice d'origine pour pouvoir le rejouer, décroissance de la force avec le temps.
- Nouvelle route `src/routes/practice.tsx` : construit la séance depuis `review.ts` et utilise `ExercisePlayer` (option XP réduite).
- `LearnProgressHeader.tsx` : bouton « S'entraîner » avec le nombre d'éléments à revoir.
- `alphabet.ts` : remettre `fromSound` et `writeLetter`.
- Vérification : jouer la leçon Alphabet en ratant exprès une question, puis lancer une séance d'entraînement.
