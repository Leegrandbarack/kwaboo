# Accueil Kwabo plus pro, dans l'esprit Duolingo

## Ce que je garde
Tes demandes précédentes restent en place :
- une seule colonne centrée (l'ancienne mise en page sur trois colonnes ne revient pas) ;
- le logo AYI + KWABO en haut ;
- ni parcours ni liste de leçons sur l'accueil ;
- pas de barre du haut avec cœurs et gemmes ;
- les couleurs, la police et AYI ne changent pas.

## Ce que je change, de haut en bas

1. **En-tête** : logo à gauche. À droite, une petite pastille « série » (flamme + nombre de jours) à la manière de Duolingo. Elle s'ouvre sur les Paramètres.
2. **Grande carte d'accueil** :
   - AYI apparaît à droite et te salue ;
   - le titre « Bonjour [prénom] » est plus net ;
   - une seule barre de progression : l'objectif du jour, présenté comme un anneau à côté du titre ;
   - un gros bouton « Commencer / Continuer » en relief.
3. **Carte « Ta prochaine leçon »** : une carte blanche simple avec l'emoji de la leçon, son titre, l'unité et un bouton rond « Go ». S'il n'y a pas encore de leçon, un message propre s'affiche à la place.
4. **Statistiques** : une grille régulière de 2×2 tuiles identiques (Série, XP total, Niveau, Badges). Elle remplace les cartes qui défilent à l'horizontale, qui faisaient « brouillon ».
5. **Quêtes du jour** : deux ou trois petits objectifs, par exemple « Gagne 20 XP » ou « Termine 1 leçon ». Chacun a sa barre de progression et un coffre en récompense, comme dans Duolingo.
6. **Astuce d'AYI** et **carte Culture Fon** : je les garde, avec des marges, des titres et des coins harmonisés.
7. **Finitions** : même espacement entre toutes les sections, des titres de section uniformes, une animation d'entrée douce et un léger effet quand on appuie. La barre du bas ne change pas.

## Détails techniques
- `src/routes/index.tsx` : `max-w-xl`, `px-4` sur le conteneur, `space-y-6`, et suppression des `mx-4` dans les enfants.
- `BrandHeader.tsx` : ajout de la pastille série (`useProgress`).
- `HeroCard.tsx` : anneau SVG pour l'objectif du jour et `Ayi` en décor ; le bouton prochaine leçon passe dans la carte suivante.
- Nouveaux fichiers `home/NextLessonCard.tsx` et `home/DailyQuests.tsx`, calculés à partir de `progress` (XP du jour, leçons terminées), sans nouvelle logique de sauvegarde.
- `MotivationCards.tsx` → `grid grid-cols-2 gap-3` et remplacement des couleurs codées en dur (violet) par des couleurs du thème.
- `SectionTitle` partagé pour les titres.
