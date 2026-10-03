# Accueil Kwabo — refonte professionnelle et ludique

## Direction retenue

Transformer l’accueil actuel selon la direction **Playful Beninese Dashboard** : une expérience claire et motivante inspirée de l’efficacité de Duolingo, mais avec l’identité verte, culturelle et béninoise de Kwabo.

## Ce qui sera construit

### 1. En-tête personnel et utile
- Conserver AYI et le logo Kwabo dans une barre supérieure plus soignée.
- Afficher un accueil personnalisé avec le nom et l’avatar de l’apprenant.
- Regrouper les ressources importantes — série, cœurs et gemmes — dans des compteurs lisibles.

### 2. Prochaine action au premier plan
- Recomposer le grand bloc vert autour du niveau actuel et de la prochaine leçon.
- Donner une priorité nette au bouton « Continuer la leçon ».
- Réunir la progression du niveau et l’objectif quotidien dans une présentation plus compacte et immédiatement compréhensible.

### 3. Progression plus motivante
- Remplacer la rangée de quatre petites cartes par une grille stable et tactile.
- Afficher uniquement des statistiques issues des données existantes : série, XP, leçons terminées et objectif du jour.
- Prévoir des états cohérents pour un nouvel utilisateur ou lorsqu’aucune leçon n’est disponible.

### 4. AYI et culture béninoise mieux valorisés
- Donner à l’astuce d’AYI l’apparence d’une vraie bulle de dialogue intégrée à la page.
- Refaire la carte culturelle avec une hiérarchie plus éditoriale, une illustration locale et un bouton d’action clair.
- Garder le parcours des leçons uniquement dans la page Apprendre.

### 5. Mobile et ordinateur
- Mobile : une colonne compacte, sans débordement horizontal, avec la navigation basse actuelle.
- Ordinateur : une composition équilibrée en deux colonnes pour éviter le grand espace vide, tout en conservant la même priorité de lecture.
- Ajouter de courtes animations tactiles sur les boutons, cartes et barres de progression, avec respect du réglage de réduction des animations.

## Détails techniques

- Recomposer `src/routes/index.tsx` en grille responsive, sans modifier la logique d’apprentissage.
- Ajuster `BrandHeader`, `HeroCard`, `MotivationCards`, `AyiTip` et `CultureCard` selon la direction choisie.
- Utiliser exclusivement les couleurs sémantiques du thème ; ajouter seulement les variables nécessaires dans `src/styles.css`.
- Utiliser les composants de boutons existants lorsqu’ils sont disponibles, et rendre chaque action réellement navigable.
- Compléter les métadonnées de la page d’accueil avec `og:type` et `twitter:card`.
- Vérifier visuellement l’accueil sur mobile et ordinateur, ainsi que le bouton de reprise de leçon et la navigation.

## Ce qui ne change pas

Les couleurs principales, AYI, les cinq onglets, les données de progression, les leçons et les autres pages restent inchangés.
