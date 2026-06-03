## Objectif

Faire de Kwabo une vraie expérience type Duolingo, jouable de bout en bout, avec tous les boutons fonctionnels. Stockage 100% local (localStorage) — pas de compte requis.

## 1. Onboarding (premier lancement)

Nouveau flow `/welcome` → `/onboarding` affiché tant que `progress.onboarded !== true`.

Étapes (style cartes plein écran + AYI qui parle) :
1. **Choix de la langue** — grille avec drapeaux : 🇧🇯 Fon (actif), Yoruba, Wolof, Swahili, Lingala, Bambara (badge "Bientôt", désactivés)
2. **Pourquoi apprends-tu ?** — Culture / Famille / Voyage / Travail / Plaisir
3. **Connais-tu déjà le Fon ?** — Débutant / Quelques mots / Intermédiaire (place sur le parcours)
4. **Objectif quotidien** — 5 / 10 / 20 / 30 min (= 10/20/40/60 XP)
5. **AYI te souhaite la bienvenue** → CTA "Commencer"

## 2. Système de cœurs complet

- 5 cœurs max, –1 par erreur (déjà en place)
- Régénération : 1 cœur toutes les 30 min (calcul à partir de `lastHeartLostAt`)
- Écran "Plus de cœurs !" qui bloque l'entrée en leçon :
  - Compte à rebours jusqu'au prochain cœur
  - Bouton "Recharger avec 350 gemmes"
  - Bouton "Pratiquer pour gagner un cœur" (mini-révision)
  - Bouton "Continuer sans cœurs" (mode illimité local)

## 3. Gemmes, XP, succès, boutique

- Nouvelle ressource **gemmes** (démarre à 500, +5 par leçon parfaite)
- Page `/shop` : recharger cœurs, gel de série (streak freeze), doubleur XP 15 min, tenues d'AYI
- Page `/achievements` : 12 succès (1ère leçon, série 3/7/30 jours, 100 XP, monde terminé, sans-faute, etc.) avec barre de progression
- Animation confettis + son "ding" à chaque déblocage

## 4. Ligues & classement

Page `/leaderboard` :
- Ligue actuelle (Bronze → Argent → Or → Saphir → Rubis → Émeraude → Diamant)
- 30 concurrents IA simulés avec XP hebdo aléatoires mais stables (seed = semaine)
- L'utilisateur s'insère selon son XP de la semaine
- Top 10 promus, bottom 5 rétrogradés (visualisé)
- Reset hebdo automatique (lundi)

## 5. Profil

Page `/profile` :
- Avatar (8 emojis au choix), pseudo éditable
- Stats : jours actifs, total XP, leçons finies, mots appris, langue
- Calendrier de série (heatmap 30 jours)
- Bouton "Réinitialiser ma progression"

## 6. Sélecteur de langue persistant

- Bouton drapeau dans la TopBar → ouvre une feuille avec les 6 langues
- Sélection autre que Fon → toast "Bientôt disponible — rejoins la liste d'attente"

## 7. Bottom nav réellement câblée

Les 5 onglets pointent vers des routes existantes :
- 🏠 `/` Accueil
- 📚 `/learn` Parcours plein écran
- 🏆 `/leaderboard`
- 👥 `/community` (fil simple : citations Fon, faits culturels, like local)
- 👤 `/profile`

Active state animé (déjà OK), badge rouge sur Profil si succès non vus.

## 8. Polish Duolingo

- Animation XP qui s'incrémente en fin de leçon
- Confettis (canvas-confetti) à la complétion
- Son de bonne/mauvaise réponse (Web Audio bips légers, toggle dans Profil)
- Modal "Quitter la leçon ?" sur le X (avec AYI triste)
- Daily streak modal au 1er lancement du jour
- Animation "monte de niveau" quand XP franchit un palier de 100

## Détails techniques

**Fichiers nouveaux**
- `src/routes/onboarding.tsx`, `src/routes/welcome.tsx`
- `src/routes/leaderboard.tsx`, `src/routes/profile.tsx`, `src/routes/shop.tsx`, `src/routes/achievements.tsx`, `src/routes/community.tsx`, `src/routes/learn.tsx`
- `src/routes/no-hearts.tsx`
- `src/lib/achievements.ts` (catalogue + check)
- `src/lib/leaderboard.ts` (génération PRNG seedée par semaine)
- `src/lib/sound.ts` (Web Audio mini-engine)
- `src/components/Confetti.tsx`
- `src/components/onboarding/*` (LanguagePicker, GoalPicker, etc.)
- `src/components/QuitLessonDialog.tsx`
- `src/components/HeartRegenTimer.tsx`

**Fichiers modifiés**
- `src/lib/progress.ts` : ajouter `gems`, `dailyGoal`, `language`, `onboarded`, `reason`, `level`, `avatar`, `username`, `lastHeartLostAt`, `weeklyXp`, `xpHistory[]`, `achievements[]`, `soundEnabled`. Fonctions `regenerateHearts()`, `spendGems()`, `addXp()` avec déclenchement succès, `getWeeklyXp()`.
- `src/components/home/TopBar.tsx` : ajouter sélecteur langue + gemmes
- `src/components/home/BottomNav.tsx` : câbler `to=` réels
- `src/components/exercises/ExercisePlayer.tsx` : confettis, son, animation XP, dialog quitter, blocage si 0 cœur
- `src/routes/__root.tsx` : redirect vers `/welcome` si non onboardé

**Dépendances**
- `bun add canvas-confetti @types/canvas-confetti`

**Hors scope**
- Audio natif Fon (TTS), IA conversationnelle, comptes serveur, paiement réel — non inclus, prévu pour V2.