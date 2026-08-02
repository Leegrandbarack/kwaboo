# Arbre de curriculum fon — livrable JSON

## Objectif

Produire un fichier JSON téléchargeable qui réorganise le contenu pédagogique déjà présent dans l'application (4 mondes, 21 leçons) en une hiérarchie à 3 niveaux **Section > Unité > Leçon**, avec titres en français et traduction fon de chaque label de structure.

## Base de départ (contenu existant vérifié)

- Monde 1 « Premiers mots » : Bonjour & Merci / Oui, Non, Au revoir / Comment vas-tu ?
- Monde 2 « Famille » : Père & Mère / Frère, Sœur, Enfant
- Monde 3 « Pronoms personnels » : 7 leçons (A & É, formes emphatiques, Mǐ/Mi, Ma subjonctif-impératif, Nyɛ/Nyì/Un, Wè/Yě, possessifs & réflexifs)
- Monde 4 « Conjugaison » : 9 leçons (impératif sg/pl, négation Ma…ó, particules bo/ló/ní/vě, aoriste, accompli ko, futur na, habituel nɔ, progressif ɖò…wɛ̀)

## Réorganisation pédagogique

- **Section 1 — Premiers pas** : salutations et politesse, premiers pronoms sujets (A, É) introduits tôt car indispensables aux phrases simples.
- **Section 2 — Moi et les miens** : famille, formes emphatiques et pronoms pluriels, avec rappels intégrés des salutations.
- **Section 3 — Agir et parler** : impératif, négation, particules — mêlés à des révisions de pronoms.
- **Section 4 — Le temps** : aoriste, accompli, futur, habituel, progressif, chaque unité rappelant les pronoms et l'impératif.

Principe appliqué : pas de bloc isolé. Chaque unité contient une leçon nouvelle + une leçon de consolidation qui recycle les notions des unités précédentes.

## Traductions fon

Les labels sont traduits en fon quand la forme est attestée dans le contenu déjà présent dans l'app (ex. salutations, mots de famille, pronoms). Toute traduction dont la forme ou la tonalité n'est pas attestée est marquée `[À VÉRIFIER - locuteur natif]` au lieu d'être inventée. Aucun contenu de leçon n'est traduit — uniquement les titres de Section, Unité et Leçon.

## Format du fichier

JSON strict, structure :

```text
{
  "langue": "fon",
  "sections": [
    {
      "id", "titre_fr", "titre_fon",
      "unites": [
        { "id", "titre_fr", "titre_fon",
          "lecons": [ { "id", "titre_fr", "titre_fon", "type": "nouveau|revision", "source_id" } ] }
      ]
    }
  ]
}
```

`source_id` référence l'identifiant de la leçon existante (`w1l1`, `w4l7`, …) pour faciliter le raccordement ultérieur au code.

## Livrable

Un seul fichier téléchargeable depuis le chat : `curriculum-fon-kwabo.json`.
Aucune modification du code de l'application (`src/lib/curriculum.ts` n'est pas touché).
