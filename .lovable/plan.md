## Problème

Aujourd'hui `speak.ts` utilise `window.speechSynthesis` avec une voix française. Ce n'est pas du Fon — c'est juste du français qui lit les caractères Fon, donc la prononciation est fausse (les tons, ɖ, ɛ̀, ɔ̀, gb, kp ne sortent pas correctement).

## Solution : ElevenLabs `eleven_multilingual_v2` + cache

ElevenLabs `eleven_multilingual_v2` est le seul TTS grand public qui prononce raisonnablement bien le Fon (langue tonale ouest-africaine, famille Gbe). On le branche via le connecteur Lovable (clé gérée, aucune saisie utilisateur).

### Étapes

1. **Connecter ElevenLabs** (`standard_connectors--connect` → `elevenlabs`). La clé `ELEVENLABS_API_KEY` est injectée côté serveur.

2. **Server function `ttsFon`** (`src/lib/tts.functions.ts`)
   - Input : `{ text: string }` (Zod, max 300 car).
   - Appelle `https://api.elevenlabs.io/v1/text-to-speech/{voiceId}?output_format=mp3_44100_128`
     - Voix : George (`JBFqnCBsd6RMkjVDRZzb`) — voix masculine chaude qui rend bien le Fon.
     - Modèle : `eleven_multilingual_v2`, `stability: 0.6`, `similarity_boost: 0.8`, `speed: 0.9` (ralenti pour pédagogie).
   - Retourne `{ audioBase64, mime: "audio/mpeg" }` (data URI côté client = pas de corruption binaire).
   - Gère 402 (crédits épuisés) et 429 (rate limit) avec messages clairs.

3. **Cache côté client** (`src/lib/fonAudioCache.ts`)
   - `Map<text, blobUrl>` en mémoire + entrée `localStorage` pour les 100 dernières phrases (base64, ~50 ko/phrase). Évite de rappeler l'API à chaque clic sur la même phrase.
   - API : `getFonAudio(text): Promise<string>` (renvoie une URL jouable).

4. **Refonte `src/lib/speak.ts`**
   - Nouvelle fonction `speakFon(text)` qui :
     - cherche dans le cache → joue.
     - sinon appelle `ttsFon` via `useServerFn` (helper exporté), met en cache, joue avec `new Audio(url)`.
   - Garde `speak(text)` (Web Speech FR) **uniquement** comme fallback hors-ligne ou si la server function échoue, avec un toast discret « voix Fon indisponible, lecture approximative ».
   - Expose `stopSpeaking()` qui stoppe l'`Audio` courant.

5. **`SpeakButton`** : passe à `speakFon`, ajoute un état `loading` (spinner pendant le premier appel API) en plus de `playing`. Aucun changement d'API publique.

6. **Pré-chargement** : sur la page `/chat`, dès qu'une réponse AYI arrive, on lance `getFonAudio(reply.fon)` en arrière-plan (fire-and-forget) pour que le clic sur 🔊 soit instantané.

### Hors scope (gardé pour plus tard)

- Audios natifs pré-enregistrés (table `phrase_audio` + Storage). On les ajoutera quand on aura les fichiers ; le cache et `speakFon` sont déjà conçus pour les utiliser en priorité plus tard.
- STT prononciation (l'utilisateur qui parle) — séparé, traité dans la slice « Prononciation » du plan V2.

## Détails techniques

- **Connecteur** : ElevenLabs (App connector), pas de gateway, appel direct `api.elevenlabs.io` avec header `xi-api-key`.
- **Encodage** : `Buffer.from(arrayBuffer).toString("base64")` côté serveur (pas de `btoa(spread)` pour éviter le stack overflow).
- **Côté client** : `data:audio/mpeg;base64,...` via `new Audio()` — pas de décodage manuel `atob`.
- **Fichiers touchés** : `src/lib/tts.functions.ts` (nouveau), `src/lib/fonAudioCache.ts` (nouveau), `src/lib/speak.ts` (refonte), `src/components/SpeakButton.tsx` (loading state), `src/routes/chat.tsx` (préchargement).

## Coût et limites

- ElevenLabs facture au caractère. Phrases courtes (max 12 mots) + cache localStorage → consommation minimale.
- Si crédits épuisés (402), on bascule automatiquement sur la voix FR Web Speech avec toast d'avertissement, l'app reste utilisable.
