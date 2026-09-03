# Page « Cours » (style Duolingo / Babbel)

Nouvelle page dédiée à l'apprentissage structuré, séparée de la page « Apprendre » actuelle qui n'affiche que l'arbre de parcours.comme dns duolingo et baddel

## Ce que la page contiendra

1. **En-tête de bienvenue** — salutation, niveau en cours, et progression globale : XP total, série (jours), pourcentage de leçons terminées avec barre de progression.
2. **Bouton « Continuer »** — reprend directement la prochaine leçon non terminée du parcours.
3. **Parcours par niveaux** — trois blocs : Débutant, Intermédiaire, Avancé (données `levelTracks` déjà présentes dans le curriculum). Chaque niveau se déplie en unités.
4. **Cartes d'unité** — titre, objectif, icône, barre de progression (leçons faites / total), récompense (badge + XP), liste des leçons avec état : terminée (coche), disponible, ou verrouillée (cadenas). Une unité se déverrouille quand la précédente est finie.
5. **Zone « Réviser »** — carte en bas listant le nombre d'erreurs à revoir, avec accès à la session de révision.
6. **Navigation** — ajout d'un onglet « Cours » dans la barre inférieure, à côté d'Accueil.

## Design

Mobile-first, même identité visuelle qu'aujourd'hui (vert émeraude, Nunito, boutons 3D, motifs béninois). Cartes arrondies, accordéons fluides, états verrouillés en gris atténué, animations d'apparition en cascade comme sur l'accueil.

## Détails techniques

- Nouveau fichier `src/routes/cours.tsx` avec `head()` propre (titre, description, og:title, og:description).
- Nouveaux composants sous `src/components/cours/` : `CourseHeader`, `LevelTrack`, `UnitCard`, `ReviewCard`.
- Réutilise `levelTracks`, `pathLessons`, `allUnits` de `src/lib/curriculum.ts`, `useProgress()` de `src/lib/progress.ts`, et `useReview()` de `src/lib/review.ts` — aucune modification de la logique existante.
- Les leçons pointent vers la route existante `/lesson/$id`.
- `src/components/home/BottomNav.tsx` : passage à 6 onglets (ou remplacement de « Apprendre » par « Cours » — voir question ci-dessous), avec ajustement de la largeur du curseur coulissant.
- Aucun changement de base de données.

## À décider

L'onglet « Apprendre » (arbre de parcours seul) devient-il redondant ? Deux options : garder les deux onglets, ou remplacer « Apprendre » par « Cours ». Recommandation : remplacer, pour éviter deux pages qui font la même chose, en gardant `/learn` accessible.