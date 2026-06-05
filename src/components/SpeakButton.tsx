import { Volume2 } from "lucide-react";
import { useState } from "react";
import { speak } from "@/lib/speak";

type Props = {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function SpeakButton({ text, size = "md", className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const dim = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-11 h-11";
  const icon = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";

  function play() {
    setPlaying(true);
    speak(text);
    setTimeout(() => setPlaying(false), Math.max(900, text.length * 80));
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Écouter : ${text}`}
      className={`${dim} grid place-items-center rounded-full bg-primary/10 text-primary border-2 border-primary/30 hover:bg-primary/20 transition-all active:scale-95 ${playing ? "animate-pulse" : ""} ${className}`}
    >
      <Volume2 className={icon} strokeWidth={2.5} />
    </button>
  );
}
