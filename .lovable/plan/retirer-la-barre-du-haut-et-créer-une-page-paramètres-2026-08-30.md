# Retirer la barre du haut et créer une page Paramètres

## Objectif
La barre du haut (logo KWABO, drapeau de langue, série 🔥, gemmes 💎, XP ⚡, cœurs ❤️, avatar) disparaît de toutes les pages. Ses informations et actions sont regroupées dans une nouvelle page **Paramètres**, accessible depuis le Profil.

## Ce qui change

### 1. Suppression de la barre du haut
Retirée de : Accueil, Apprendre, Boutique, Classement, Succès, Communauté, Profil.
Les pages gardent leur contenu et la navigation du bas ; l'espacement en haut est ajusté pour que rien ne soit collé au bord (et le sélecteur de langue reste accessible depuis Paramètres).

### 2. Nouvelle page `/parametres`
- **Mes statistiques** : série, gemmes, XP, cœurs (avec ∞ si cœurs illimités) — mêmes valeurs qu'avant, présentées en cartes.
- **Langue d'apprentissage** : ouvre la feuille de choix de langue existante.
- **Compte** : avatar + pseudo, lien vers le Profil.
- **Raccourcis** : Boutique (gemmes/cœurs), Succès.
- **Réglages** : bascule Sons, réinitialiser ma progression (déplacés depuis le Profil).
- Design cohérent : mêmes couleurs, cartes arrondies, typographie et micro-interactions que le reste de Kwabo. Métadonnées de page propres (titre/description).

### 3. Accès
Un bouton « Paramètres » (icône engrenage) est ajouté en haut de la page Profil. Aucun élément ajouté à l'accueil.

## Détails techniques
- `src/components/home/TopBar.tsx` n'est plus importé nulle part ; le composant est supprimé (le sélecteur de langue `LanguageSheet` est réutilisé dans Paramètres).
- Nouveau fichier `src/routes/parametres.tsx` avec `createFileRoute("/parametres")` et `head()` dédié.
- Lecture/écriture d'état via le hook existant `useProgress` (`update`, `reset`) — aucune logique métier modifiée.
- Le Profil conserve ses stats et l'édition du pseudo/avatar ; ses réglages (sons, réinitialisation) déménagent vers Paramètres et sont remplacés par le lien Paramètres.
