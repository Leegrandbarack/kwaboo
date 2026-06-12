
## Objectif

Étendre `src/lib/curriculum.ts` avec le contenu des images de la *Grammaire Fongbe ou Fon* : compléter les **pronoms personnels** et créer un nouveau monde **Conjugaison** progressif, dans le style Duolingo (leçons courtes, 5–7 exercices, variés, mots-clés qui réapparaissent).

## Pédagogie (Duolingo-style)

- Chaque leçon = 5 à 7 exercices, mélange des 4 types existants (`choice`, `translate`, `order`, `match`).
- Progression : on introduit 1 concept neuf + on recycle ceux des leçons précédentes.
- `hint` court systématique sur le premier exercice qui introduit un nouveau pronom/particule.
- Phrases tirées **directement des images** (ex : « Un jáwè », « Mi yí bó ɖù », « É nɔ ɖɔ fɔngbe ganjí ») pour rester authentique.
- Difficulté croissante à l'intérieur de chaque leçon : reconnaissance → traduction guidée → reconstruction → match récap.

## 1. Compléter le monde « Pronoms personnels » (w3)

Garder les 4 leçons existantes. Ajouter 3 leçons :

- **w3l5 — Nyɛ, Nyì, Un (1ʳᵉ personne, sujet/complément)** : Un = je (sujet), Nyɛ = moi (emphatique/complément), Nyì = variante de Nyɛ. Exemples : « Un jáwè », « Un ná yì Glèxwé », « Nyɛ kpódó fofó », « Nyɛ ma sanfú né ».
- **w3l6 — Wè, Yě (2ᵉ sg complément & 3ᵉ pl)** : Wè = toi (complément), Yě = ils/elles. Exemples : « Doo nú wè », « Agoò nú wè », « Yè klán gbɛ̀ », « Ahwàn gblé dó yě ».
- **w3l7 — Possessifs & réflexifs** : `ce` (mon), `towe` (ton), `tɔ́n` (son), `mǐtɔ̀n`, `mitɔ̀n`, `yětɔ̀n` ; réflexifs `nyɛɖéé`, `hwiɖéé`, `éɖéé`, `miɖéé`, `yěɖéé`. Match récap final.

## 2. Nouveau monde « Conjugaison » (w4)

```text
w4 — Conjugaison      ⚡ couleur primary
 ├── w4l1 Impératif singulier
 ├── w4l2 Impératif pluriel (Mi…)
 ├── w4l3 Forme négative (Ma… ó)
 ├── w4l4 Particules (bo, ló, ná, ní, vě)
 ├── w4l5 Aoriste (radical seul)
 ├── w4l6 Passé accompli (ko)
 ├── w4l7 Futur (na)
 ├── w4l8 Habituel (nɔ)
 └── w4l9 Progressif (ɖò… wɛ̀)
```

Exemples concrets repris des images, par leçon :

- **Impératif sg** : Gbɔ̀ ! / N'àbɔ̌ ! / Wǎ mì / Sɛ yi ɖòn kpɛɖé.
- **Impératif pl** : Mi ɖ'álɔ té / Mi dó gbɛ̀ / Mi glá ! / Mi yí bó ɖù.
- **Négatif** : Ma j'àyì ó / Ma bà ɖò nà ó / Mi ma nɔ gdadógbádó ó.
- **Particules** : Wǎ bó ! (bo) / Mǎwù ló bló (ló) / Sin ní yi kɔ̀ (ní) / Vè glá (vě).
- **Aoriste** : A sè à ? / É jǎwè / Un wá yì Zanjɛ́nnádó.
- **Passé accompli (ko)** : Un ko kpan'lɔ̀ / Mǐ kó wá Gbɔxíkɔ̀n / Un ko kpò.
- **Futur (na)** : Un ná yì Glèxwé / É ná fɛ́ gba ta wè.
- **Habituel (nɔ)** : É nɔ ɖɔ fɔngbe ganjí / Avún éló nɔ hó ɖésú / Cukú nɔ lun ɖè.
- **Progressif** : É ɖò bìbí wɛ̀ / Tɔ́ ɔ́ ɖò sin ɖi wɛ̀ / Koklójó ɖò asi kó wɛ̀.

Chaque leçon : 1 `choice` d'intro (règle), 2 `translate` (Fon→FR puis FR→Fon), 1 `order` (reconstruction), 1 `match` final (4 paires de la leçon). Quelques leçons longues ajoutent un 2ᵉ `choice` sur un piège (ex. ne pas confondre habituel `nɔ` et progressif `ɖò…wɛ̀`).

## 3. Intégration UI

- Les nouvelles leçons apparaissent **automatiquement** dans `LearningPath` via `worlds[]`.
- Rien à changer dans `ExercisePlayer` ni `lesson.$id.tsx` : les 4 types d'exercices sont déjà supportés.
- Le monde w4 utilise la même mécanique de cœurs/XP que les autres.

## Hors scope

- Pas de TTS dans cette tâche (le sujet ElevenLabs reste en attente).
- Pas de nouvel exercice "écoute" tant que la voix Fon n'est pas réglée.
- Pas de progression backend : on reste sur le store local existant.

## Fichier modifié

- `src/lib/curriculum.ts` — ajout de 3 leçons à w3 + nouveau monde w4 avec 9 leçons (≈ 50 nouveaux exercices).
