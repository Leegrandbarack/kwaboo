# Retour à l'ancienne version de l'accueil + logo Kwabo en haut

## Ce que tu veux

- Revenir à l'accueil d'avant la refonte desktop en 3 colonnes : une seule colonne centrée, la même sur mobile, tablette et ordinateur, avec la barre de navigation en bas.
- Une petite barre en haut avec la mascotte AYI et le mot KWABO (sans les cœurs, gemmes ni série).

## Ce que je vais faire

### 1. Restaurer la mise en page d'origine

- L'accueil redevient une colonne unique centrée (largeur max ~2xl) : bannière d'accueil, cartes de motivation, astuce d'AYI, carte Culture Fon, titre « Ton parcours », le parcours de leçons, puis les mondes à venir.
- Suppression du menu latéral desktop et de la colonne de droite : plus de découpage en 3 zones.
- La barre de navigation du bas redevient visible sur tous les écrans (plus de `lg:hidden`).
- Les marges horizontales d'origine reviennent sur les sections (cartes, AYI, culture, en-têtes), ainsi que les décalages d'origine du parcours de leçons.
- Les cartes de motivation reprennent leur affichage d'origine sur une ligne défilante horizontale.

### 2. Ajouter le logo en haut

- Nouvelle petite barre d'en-tête sur l'accueil : mascotte AYI + « KWABO », alignée à gauche, collée en haut au défilement, fond translucide léger.
- Elle ne contient que le logo et le nom — aucune statistique, aucun bouton.

### 3. Ce qui ne bouge pas

Couleurs, typographie, contenu des leçons, progression, cœurs/gemmes et toutes les autres pages restent inchangés. C'est uniquement de la mise en page.

## Détails techniques

- `src/routes/index.tsx` : retour au conteneur `max-w-2xl mx-auto` en colonne unique ; retrait de la grille `lg:grid-cols-[220px_...]`, de `SideNav` et de l'`aside` droite ; rendu unique de `MotivationCards` / `AyiTip` / `CultureCard` dans le flux ; ajout du nouvel en-tête.
- Nouveau `src/components/home/BrandHeader.tsx` : `Ayi` + « KWABO », `sticky top-0 z-30`, réutilisable.
- `src/components/home/BottomNav.tsx` : retrait de `lg:hidden`.
- `src/components/home/{HeroCard,MotivationCards,AyiTip,CultureCard,UpcomingUnits}.tsx` : retour aux marges/espacements d'origine (`mx-4`, `mt-*`) et au défilement horizontal des cartes de motivation.
- `src/components/LearningPath.tsx` : retour aux décalages `[0, 60, 90, 60, 0, -60, -90, -60]` et aux marges d'origine.
- `src/components/home/SideNav.tsx` : supprimé s'il n'est plus utilisé ailleurs.
- Vérification visuelle desktop + mobile via Playwright après les changements.
