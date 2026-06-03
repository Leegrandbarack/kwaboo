import { useEffect, useState } from "react";
import { load, timeUntilNextHeart, MAX_HEARTS } from "@/lib/progress";

export function HeartRegenTimer() {
  const [ms, setMs] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  useEffect(() => {
    const tick = () => {
      const p = load();
      setHearts(p.hearts);
      setMs(timeUntilNextHeart(p));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (hearts >= MAX_HEARTS) return <span className="font-mono">Plein !</span>;
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return <span className="font-mono tabular-nums">{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</span>;
}
