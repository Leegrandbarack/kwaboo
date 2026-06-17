## Objectif

Rendre Kwaboo crédible comme app pro façon Duolingo, sans modifier les choix déjà validés : **couleurs actuelles conservées**, **typographies actuelles conservées**, **mascotte AYI conservée partout**. On travaille uniquement la **finition** : micro-interactions, hiérarchie, cohérence des composants, états (hover/press/disabled/loading), retours sonores/visuels et rythme d'animation.

## Périmètre : toute l'app

Pages touchées : `index` (home/parcours), `learn`, `lesson.$id`, `chat`, `profile`, `leaderboard`, `achievements`, `shop`, `no-hearts`, `onboarding`, `welcome`, `community`.

## Ce qui change

### 1. Système de micro-interactions unifié (`src/styles.css`)
Tokens d'animation centralisés pour que tout réagisse pareil :
- `--ease-spring`, `--ease-out-soft`, durées `--dur-fast/base/slow`
- Classes utilitaires : `.press` (scale 0.97 + shadow réduite au :active), `.tap-target` (zone tactile 44px min), `.focus-ring` (anneau accessible cohérent), `.skeleton-shimmer`
- Remplacement progressif des `transition-all` génériques par des transitions ciblées (transform/opacity/box-shadow) → plus fluide, moins « IA »

### 2. Bouton 3D Duolingo-like, version propre
Le `.btn-3d` actuel est appliqué partout sans variantes claires. Refonte :
- Variantes : `primary`, `secondary`, `ghost`, `danger`, `success` avec la même mécanique d'enfoncement (translateY au press, ombre interne qui disparaît)
- État `disabled` réellement distinct (pas juste opacity)
- État `loading` avec spinner intégré + verrouillage du clic
- Appliqué dans : `ExercisePlayer` (Vérifier/Continuer), `QuitLessonDialog`, `LearningPath` (nœuds de leçon), `HeroCard`, `no-hearts`, `shop`, `onboarding`

### 3. Nœuds de leçon (`LearningPath`)
Polish du parcours, c'est le cœur visible :
- Halo de progression circulaire SVG autour du nœud actif (au lieu d'un simple ring)
- Animation d'apparition séquencée (stagger) au scroll/mount
- Press state physique (enfoncement + rebond)
- Nœud complété : check animé (draw SVG), pas juste une icône statique
- Nœud verrouillé : cadenas avec léger shake si on tape dessus
- Tracé du chemin entre nœuds (SVG path subtil) pour le côté « parcours »

### 4. ExercisePlayer
- Transition entre exercices : slide+fade orchestré (au lieu du remount brut)
- Barre de progression animée avec easing (pas un saut)
- Feedback correct/incorrect : flash de couleur + shake horizontal + son déjà existant gardé
- Bulle AYI : entrée pop-in + queue qui pointe correctement
- Boutons de réponse (choice/order/match) : press state cohérent, focus visible clavier
- Skeleton de chargement pendant la transition

### 5. TopBar & BottomNav
- BottomNav : indicateur actif animé (pill qui glisse entre les items, façon iOS/Linear)
- TopBar : compteurs (cœurs, gemmes, série) avec animation de tick quand la valeur change (count-up court)
- Sticky avec backdrop-blur propre + bordure subtile au scroll

### 6. États vides, chargement, erreurs
- Skeletons cohérents (même shimmer) sur `leaderboard`, `achievements`, `community`
- États vides illustrés avec AYI (mood adapté) au lieu de texte sec
- `errorComponent` et `notFoundComponent` stylés cohérents avec le reste

### 7. Modales & feuilles
- `QuitLessonDialog`, `LanguageSheet` : entrée animée (scale+fade pour modale, slide-up pour sheet), backdrop blur progressif, focus trap propre, fermeture Esc
- Confetti déjà présent : déclencher aussi sur complétion de leçon (pas seulement fin de parcours)

### 8. Cartes (`HeroCard`, `CultureCard`, `MotivationCards`, `UpcomingUnits`)
- Hover lift uniforme (translateY + shadow elevate), pas de hover-scale brutal
- Coins, ombres et bordures harmonisés via tokens
- Densité revue : padding/gap cohérents entre toutes les cartes

### 9. Détails de finition
- Curseur `pointer` partout où c'est cliquable (pas de div cliquable sans état)
- `aria-label` sur les boutons icône-only (SpeakButton OK, à propager)
- `prefers-reduced-motion` respecté : désactive les animations non essentielles
- Tap highlight transparent sur mobile (`-webkit-tap-highlight-color`)
- Scroll behavior smooth + overscroll-behavior contain dans les leçons

## Ce qui ne change PAS

- Palette de couleurs actuelle (tokens dans `src/styles.css` inchangés)
- Polices actuelles (display/body inchangées)
- Mascotte AYI : conservée sur home, bulles, états vides, dialogs
- Curriculum, logique de progression, TTS, backend, routes
- Aucun nouveau package lourd (pas de framer-motion ajouté si possible — on reste sur CSS + classes Tailwind déjà en place ; Confetti et `pop-in` existants réutilisés)

## Fichiers principaux modifiés

- `src/styles.css` — tokens d'animation, utilitaires `.press` `.focus-ring` `.skeleton-shimmer`, raffinement de `.btn-3d`
- `src/components/LearningPath.tsx` — halo SVG, stagger, press, tracé
- `src/components/exercises/ExercisePlayer.tsx` — transitions, feedback, skeletons
- `src/components/home/TopBar.tsx` — tick counters, blur au scroll
- `src/components/home/BottomNav.tsx` — pill animée
- `src/components/QuitLessonDialog.tsx`, `src/components/LanguageSheet.tsx` — animations modale/sheet
- `src/components/home/{HeroCard,CultureCard,MotivationCards,UpcomingUnits}.tsx` — hover lift uniforme
- `src/components/SpeakButton.tsx` — press state cohérent
- `src/components/Confetti.tsx` — déclenchement aussi fin de leçon (via prop existante)
- Routes : ajustements légers d'états vides/loading uniquement où nécessaire

## Hors périmètre

- Pas de refonte visuelle (couleurs/typo gardées)
- Pas de TTS Fon (toujours en attente)
- Pas de nouveaux types d'exercice
- Pas de backend/auth/DB
