# Accueil Kwabo — mise en page pro (style Duolingo / Babbel)

## Le problème visible

Sur ordinateur, l'accueil reste une colonne étroite de téléphone posée au milieu d'un grand écran vide : le bandeau vert prend toute la largeur de la colonne, les cartes de motivation débordent avec une barre de défilement horizontale, et la navigation du bas flotte au milieu de la page. Rien n'occupe l'espace disponible.

## Ce que je vais faire

### 1. Une vraie mise en page desktop en 3 zones

Comme Duolingo :

```text
+-----------+---------------------------+----------------+
|  Barre    |     Parcours (centre)     |   Colonne      |
|  latérale |                           |   droite       |
|  Accueil  |   Section > Unité >       |   Série / XP   |
|  Apprendre|   leçons                  |   Objectif     |
|  Parler   |                           |   Astuce AYI   |
|  Classement                           |   Culture Fon  |
|  Profil   |                           |                |
+-----------+---------------------------+----------------+
```

- Barre latérale gauche fixe (logo Kwabo + les 5 onglets) visible à partir des grands écrans.
- Colonne centrale : la bannière d'accueil compacte puis le parcours de leçons.
- Colonne droite : les statistiques (série, gemmes, XP, objectif du jour), l'astuce d'AYI et la carte culture.

### 2. Sur mobile, rien ne change dans l'esprit

Une seule colonne, barre de navigation en bas comme aujourd'hui. La barre latérale et la colonne de droite se replient : leurs contenus reviennent dans le flux vertical.

### 3. Nettoyage des éléments qui font "brouillon"

- Cartes de motivation : plus de défilement horizontal coupé — une grille propre (2 colonnes sur mobile, 4 en ligne sur desktop) avec des cartes de même hauteur.
- Bannière d'accueil : hauteur réduite, titre mieux calé, les deux barres de progression alignées, bouton principal de largeur raisonnable et non pleine largeur sur desktop.
- Espacements et marges unifiés entre toutes les sections (aujourd'hui certaines utilisent `mx-4`, d'autres `px-4`).
- Titres de section homogènes (même taille, même graisse, même couleur d'accent).
- Le parcours de leçons est recentré : les décalages gauche/droite des bulles sont réduits pour ne jamais sortir du cadre.

### 4. Ce qui ne bouge pas

Les couleurs, la typographie, AYI, le contenu des leçons, la logique de progression, les cœurs/gemmes et les autres pages restent identiques. C'est uniquement de la mise en page et de la présentation.

## Détails techniques

- `src/routes/index.tsx` : nouvelle grille responsive `lg:grid-cols-[auto_minmax(0,1fr)_320px]`, largeur max élargie (`max-w-6xl`), zones aside masquées sous `lg`.
- Nouveau `src/components/home/SideNav.tsx` : navigation latérale desktop réutilisant la même liste d'onglets que `BottomNav`.
- `src/components/home/BottomNav.tsx` : masquée en `lg:hidden`.
- `src/components/home/MotivationCards.tsx` : passage de `overflow-x-auto` à `grid grid-cols-2 gap-3 lg:grid-cols-1` (empilée dans la colonne droite sur desktop).
- `src/components/home/HeroCard.tsx` : padding et tailles typographiques ajustés, bouton `w-full sm:w-auto`.
- `src/components/LearningPath.tsx` : décalages horizontaux passés en valeurs relatives plafonnées pour rester dans le conteneur.
- Application des règles responsive du projet : `min-w-0` sur les conteneurs de texte, `shrink-0` sur les icônes, `truncate` sur les titres d'une ligne.
