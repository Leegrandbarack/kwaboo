# Restaurer « Apprendre », nettoyer « Cours », ajouter le vocabulaire

## 1. Onglet « Apprendre » restauré

La page `/learn` (arbre de parcours) existe toujours mais n'est plus atteignable depuis la barre du bas. On réintègre un onglet « Apprendre » à côté d'« Accueil », donnant 6 onglets : Accueil, Apprendre, Cours, Révision, Parler, Profil. Le curseur coulissant est recalculé pour 6 colonnes.

## 2. Carte « Réviser » retirée de la page Cours

La carte de révision disparaît du bas de la page `/cours`. L'onglet « Révision » et la page `/revision` restent inchangés.

## 3. Mots-clés traduits par unité

Chaque carte d'unité gagne un bloc dépliable « Mots-clés » listant 4 à 6 mots : le mot en Fɔngbè, sa traduction française et un bouton d'écoute (composant `SpeakButton` déjà existant). Fermé par défaut pour garder les cartes compactes.

Les mots sont issus des exercices déjà présents dans chaque leçon de l'unité (paires fon/français des exercices de traduction et d'association), sans nouvelles données à saisir à la main : ainsi chaque unité affiche du vocabulaire réellement enseigné.

## Détails techniques

- `src/components/home/BottomNav.tsx` : ajout de l'entrée `learn` (icône `Sparkles` ou `Map`) en 2e position ; passage de `grid-cols-5` à `grid-cols-6` et du calcul du curseur de 20 % à 16.666 %.
- `src/routes/learn.tsx` : inchangé (déjà `active="learn"`).
- `src/routes/cours.tsx` : suppression du `<ReviewCard />`, de son import et du calcul `dueCount` / `useReview` devenu inutile. `src/components/cours/ReviewCard.tsx` est supprimé.
- `src/lib/curriculum.ts` : ajout d'un helper `unitVocab(unit, max)` qui parcourt les exercices des leçons de l'unité (`translate` fon↔fr et `match`) et retourne des paires `{ fon, fr }` dédupliquées, limitées à 6.
- `src/components/cours/UnitCard.tsx` : bloc dépliable (état local `open`) affichant les paires renvoyées par `unitVocab`, chaque ligne avec `SpeakButton`. Masqué si l'unité ne produit aucune paire.
- Aucun changement de base de données ni de logique de progression.
