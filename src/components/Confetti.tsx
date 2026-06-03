import { useEffect } from "react";
import confetti from "canvas-confetti";

export function Confetti({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (!trigger) return;
    const colors = ["#16A34A", "#FACC15", "#EF4444"];
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { x: 0.2, y: 0.7 }, colors }), 250);
    setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { x: 0.8, y: 0.7 }, colors }), 450);
  }, [trigger]);
  return null;
}
