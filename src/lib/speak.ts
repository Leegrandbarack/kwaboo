// Browser TTS helper. Fon n'a pas de voix native — on utilise une voix française
// comme approximation phonétique. Pour une vraie voix Fon, activer ElevenLabs
// (connecteur déjà préparé côté backend).

let voices: SpeechSynthesisVoice[] = [];

function loadVoices() {
  if (typeof window === "undefined") return;
  voices = window.speechSynthesis.getVoices();
}

if (typeof window !== "undefined") {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (!voices.length) loadVoices();
  // Préfère une voix française (la plus proche phonétiquement du Fon)
  const fr = voices.find((v) => /fr[-_]/i.test(v.lang));
  if (fr) return fr;
  return voices[0] ?? null;
}

export function speak(text: string, opts: { rate?: number; pitch?: number } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  u.lang = v?.lang ?? "fr-FR";
  u.rate = opts.rate ?? 0.85;
  u.pitch = opts.pitch ?? 1.05;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
}
