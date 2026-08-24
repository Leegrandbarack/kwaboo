# Connexion après « Commencer gratuitement » + bouton « Ignorer la connexion »

La page de connexion premium existe (`/login`) mais elle n'est pas dans le parcours : le bouton « Commencer gratuitement » de l'écran de bienvenue saute directement à l'onboarding. Voici le nouveau parcours :

```text
/welcome (Kwabo - écran de bienvenue)
   └─ « Commencer gratuitement » ──► /login
                                      ├─ « Se connecter » / Google ──► onboarding ou apprentissage
                                      ├─ « Ignorer la connexion » ──► /onboarding (mode invité, comme aujourd'hui)
                                      └─ « Créer un compte » ──► /signup
```

## Changements

### 1. Écran de bienvenue (`src/routes/welcome.tsx`)
- « Commencer gratuitement » pointe désormais vers `/login` au lieu de `/onboarding`.
- Le lien « J'ai déjà un compte » pointe aussi vers `/login` (il renvoie aujourd'hui vers la page principale).

### 2. Page de connexion (`src/routes/login.tsx`)
- Ajout d'un bouton secondaire « Ignorer la connexion » sous les boutons principaux, qui mène à `/onboarding` : l'utilisateur peut utiliser Kwabo sans compte, exactement comme aujourd'hui (progression locale conservée).
- Après une connexion réussie : si l'onboarding n'est pas terminé, on y renvoie l'utilisateur ; sinon direction l'apprentissage.

### 3. Page d'inscription (`src/routes/signup.tsx`, nouvelle)
Le lien « Créer un compte » renvoie actuellement vers l'écran de bienvenue car aucune page d'inscription n'existe. Je la crée avec exactement le même design que la connexion (même mise en page 50/50, même illustration, mêmes composants) : e-mail, mot de passe, création de compte réelle via Lovable Cloud, message « vérifie ta boîte mail » si la confirmation e-mail est active, « Continuer avec Google », et le même bouton « Ignorer la connexion ».

### 4. Garde de navigation (`src/routes/__root.tsx`)
- Ajout de `/signup` aux routes exemptées de la redirection automatique d'onboarding.

## Détails techniques
- Authentification réelle existante : Lovable Cloud (e-mail/mot de passe + Google), aucune nouvelle dépendance.
- Le « mode invité » ne change rien au fonctionnement actuel : la progression reste en local sur l'appareil.
- Couleurs, polices (Nunito/Display) et illustration africaine existantes réutilisées. Aucun autre écran n'est modifié.
