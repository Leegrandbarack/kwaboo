# Page de connexion Kwabo — finalisation et intégration

La page de connexion premium existe déjà (`/login`) : composition 50/50 sur desktop avec illustration africaine, formulaire centré sur mobile, logo Kwabo, « Bienvenue sur Kwabo 👋🏾 », « Content de te revoir ! », champs e-mail/mot de passe avec afficher/masquer, « Mot de passe oublié ? », bouton « Se connecter » avec états chargement/erreur/succès, séparateur « ou continuer avec », « Continuer avec Google », et la phrase « Apprendre une langue, c'est découvrir un monde. ». L'authentification est réelle (Lovable Cloud : e-mail/mot de passe + Google).

Ce qui manque pour que ce soit réellement utilisable, et ce que je propose de faire :

## 1. Placer la connexion dans le parcours
- Depuis l'écran d'accueil `/welcome`, le lien « J'ai déjà un compte » mène aujourd'hui à la page principale. Il pointera vers `/login`.
- Après une connexion réussie : redirection vers l'apprentissage (ou vers l'onboarding si l'utilisateur ne l'a pas encore terminé).

## 2. Page d'inscription réelle
Le lien « Créer un compte » renvoie actuellement vers l'écran de bienvenue, car aucune page d'inscription n'existe. Je crée `/signup`, strictement dans le même design que la connexion (même mise en page, même illustration, mêmes composants) : e-mail, mot de passe, création de compte réelle, message « vérifie ta boîte mail » si la confirmation e-mail est active, et « Continuer avec Google ».

## 3. Polissage de la page de connexion
- Vérification des états : focus visible, messages d'erreur clairs (identifiants invalides, e-mail non confirmé), détection hors-ligne, succès animé.
- Accessibilité : labels associés, `aria-invalid`, zones tactiles ≥ 44 px, respect de `prefers-reduced-motion`.

## Détails techniques
- Routes touchées : `src/routes/login.tsx` (polissage), nouveau `src/routes/signup.tsx`, `src/routes/welcome.tsx` (un seul lien), `src/routes/__root.tsx` (ajouter `/signup` aux routes exemptées de la redirection d'onboarding).
- Réutilisation de `src/assets/login-illustration.jpg`, des tokens de couleur existants et des polices Nunito/Display. Aucune nouvelle dépendance, aucun autre écran modifié.
