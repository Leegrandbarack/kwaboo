let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return ctx;
}

function beep(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(c.destination);
  const now = c.currentTime;
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

function isEnabled() {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("kwabo:progress:v2");
    if (!raw) return true;
    return JSON.parse(raw).soundEnabled !== false;
  } catch {
    return true;
  }
}

export const sound = {
  correct() {
    if (!isEnabled()) return;
    beep(660, 0.12, "sine", 0.18);
    setTimeout(() => beep(880, 0.18, "sine", 0.15), 100);
  },
  wrong() {
    if (!isEnabled()) return;
    beep(180, 0.25, "sawtooth", 0.12);
  },
  finish() {
    if (!isEnabled()) return;
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.2, "triangle", 0.18), i * 110));
  },
  pop() {
    if (!isEnabled()) return;
    beep(800, 0.08, "square", 0.1);
  },
};
