## Vision

Faire passer Kwabo d'un clone Duolingo local à une plateforme IA premium pour le Fon. Quatre piliers à livrer ensemble, sur des bases solides, sans casser l'expérience existante.

## Pré-requis backend

- Activer **Lovable Cloud** (Supabase managé) + **Lovable AI Gateway** (Gemini/GPT).
- Connecter **ElevenLabs** (standard connector) pour TTS Fon + STT prononciation.
- Migrer le profil de `localStorage` → table `profiles` (sync multi-appareils) avec auth email simple. Le `localStorage` reste fallback hors-ligne.

## 1. IA conversationnelle Fon + voix

- Nouvelle route `/chat` : AYI parle, écoute, corrige.
- Server function `chatWithAyi` (Lovable AI, `google/gemini-3-flash-preview`) avec system prompt strict :
  - Répond en Fon + traduction + correction grammaticale ligne par ligne.
  - Scénarios prédéfinis : marché, salutations, route, repas, présentation.
- **Voix Fon hybride** :
  - Phrases du cours → audios natifs pré-enregistrés (table `phrase_audio` + bucket Storage `audio-fon`). Placeholders TTS générés au build en attendant les vraies voix.
  - Phrases générées par l'IA → server function `ttsFon` (ElevenLabs `eleven_multilingual_v2`, voix configurable) streamée vers le client.
- Composant `<SpeakButton text=... />` partout (leçons, chat, dashboard).

## 2. Prononciation (laboratoire vocal)

- Composant `<PronunciationGym phrase audio />` :
  - Web Speech API pour STT navigateur en repli ; fallback serveur **ElevenLabs Scribe v2** (`scribe_v2`) pour Fon.
  - Comparaison phonétique simple (distance Levenshtein normalisée) + heatmap caractère par caractère.
  - Score 0-100, conseils ("le ton bas sur ɔ̀ manque").
- Nouvel exercice `pronounce` dans le moteur, intégré à 1 leçon sur 3.
- Page `/lab` dédiée au mode entraînement libre.

## 3. Apprentissage adaptatif + SRS

- Table `srs_items(user_id, word, ease, interval, due_at, lapses)` (algorithme SM-2 simplifié).
- Server function `nextReview` : sélectionne 10 mots dus, génère exercices via IA si besoin.
- Détection forces/faiblesses : agrégat par catégorie grammaticale + son.
- Recommandation quotidienne : `getDailyPlan` retourne nouvelles leçons + révisions + défi prononciation.
- Détecteur d'abandon : si pas connecté 2 jours → notif locale + AYI envoie message motivant.

## 4. Dashboard premium + immersion culturelle

- Refonte `/profile` en `/dashboard` :
  - Graphiques (Recharts) : XP 30 jours, temps d'étude, mots maîtrisés, courbe rétention SRS.
  - Heatmap série, anneau objectif quotidien, prononciation moyenne.
- Nouvelle section `/culture` :
  - Contes audio (Yɛhwe Zogbanu, Mami Wata…) avec lecture Fon + traduction synchronisée.
  - Proverbes du jour, musiques traditionnelles (intégration YouTube/audio libre), interviews courtes.
  - Carte interactive du Bénin avec régions parlant Fon.
- Chaque leçon termine par une « capsule culturelle » (1 fait/proverbe lié au vocabulaire).

## 5. Refonte UX globale

- Audit + polish de chaque écran existant (Accueil, Apprendre, Classement, Communauté, Profil, Boutique, Achievements, Onboarding).
- Skeleton loaders partout, transitions Framer Motion, `prefers-reduced-motion` respecté.
- Accessibilité : focus rings, ARIA labels sur boutons icônes, contrastes AA.
- Mode sombre auto.
- PWA basique (manifest + installable, pas de SW offline pour le moment).

## Hors scope V2 (gardés pour plus tard, comme tu l'as demandé)

- Back-office admin complet.
- Réseau social (amis, groupes d'étude, messagerie).
- Téléchargement hors-ligne intelligent + sync.
- Apps iOS/Android natives (la PWA installable couvre le besoin V2).
- Monétisation (abonnement Premium).

## Détails techniques

**Schéma DB (migrations à créer)**
- `profiles(id, username, avatar, language, daily_goal, start_level, reason)`
- `user_progress(user_id, xp, gems, hearts, streak, weekly_xp, last_heart_lost_at, ...)`
- `srs_items(...)`, `lesson_history(user_id, lesson_id, score, mistakes jsonb, completed_at)`
- `phrase_audio(phrase_fon, audio_url, region)`
- `chat_sessions(user_id, scenario, transcript jsonb, score)`
- RLS strict scopé `auth.uid()`, GRANTs explicites, table `user_roles` pour futurs admins.

**Server functions principales**
`chatWithAyi`, `ttsFon`, `sttFon`, `scoreUtterance`, `nextReview`, `getDailyPlan`, `recordLessonResult`, `generateExercise`.

**Composants nouveaux**
`<SpeakButton>`, `<RecordButton>`, `<PronunciationGym>`, `<ChatAyi>`, `<CultureStory>`, `<DashboardCharts>`, `<SkeletonScreen>`.

**Dépendances**
`@supabase/supabase-js`, `recharts`, `framer-motion` (déjà ?), `zod`, manifeste PWA.

## Ordre de livraison

1. Cloud + Auth + migration progress → DB (base).
2. TTS Fon (`SpeakButton`) intégré aux leçons + chat.
3. Chat IA + scénarios.
4. Prononciation + lab.
5. SRS + plan quotidien adaptatif.
6. Dashboard + section culture.
7. Pass UX/perf/accessibilité final.

C'est volumineux mais cohérent ; chaque étape laisse l'app jouable.
