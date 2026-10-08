# Refonte premium de la page « Apprendre »

Transformer la page actuelle en un parcours vivant, propre et réaliste, inspiré de la clarté de Duolingo et Babbel leur identité.

## Expérience proposée

1. **En-tête de progression compact**
  - Ajouter une barre de progression lisible et un bouton « Continuer » vers la prochaine leçon disponible.
2. **Parcours vivant par unités**
  - Conserver les 3 niveaux, 12 unités et 37 leçons déjà présents.
  - Présenter chaque unité avec son titre, son objectif, sa progression et sa récompense.
  - Organiser les leçons sur un chemin vertical fluide et légèrement courbé.
  - Rendre les états immédiatement compréhensibles : terminée, actuelle, disponible et verrouillée.
3. **Leçon actuelle mise en valeur**
  - Ajouter une fiche contextuelle près de la leçon active avec son titre, son objectif et une action claire pour commencer.
  - Éviter d’afficher de faux contenus : les leçons sans exercices restent identifiées comme bientôt disponibles.
4. **Finitions visuelles et interactions**
  - Reprendre les couleurs actuelles de Kwabo : vert émeraude, jaune et corail.
  - Améliorer les reliefs, séparateurs, icônes, proportions et espacements pour un rendu d’application aboutie.
  - Ajouter des animations discrètes lors de l’apparition, du déverrouillage et du toucher d’une leçon.
  - Respecter le mode sombre et la préférence de réduction des animations.
5. **Adaptation mobile et web**
  - Mobile : parcours central facile à utiliser d’une main, sans chevauchement avec la navigation basse.
  - Grand écran : largeur maîtrisée et panneau de progression complémentaire, sans étirer le chemin.
6. **Référencement et vérification**
  - Compléter les informations de partage propres à la page Apprendre.
  - Vérifier visuellement la page sur mobile et ordinateur, les états de progression, les leçons verrouillées et l’ouverture de la première leçon.

## Détails techniques

- Recomposer `src/routes/learn.tsx` autour d’un en-tête de progression et du parcours.
- Refactoriser `src/components/LearningPath.tsx` en petits éléments dédiés aux unités, étapes et états de leçon.
- Réutiliser exclusivement les données existantes de `curriculum.ts` et `progress.ts`, sans modifier le contenu pédagogique ni la logique de progression.
- Étendre seulement les styles et jetons sémantiques nécessaires dans `src/styles.css`.
- Conserver la navigation basse et les autres pages telles quelles.