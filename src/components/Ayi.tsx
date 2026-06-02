type Props = {
  size?: number;
  mood?: "happy" | "thinking" | "cheer" | "sad";
  className?: string;
};

export function Ayi({ size = 120, mood = "happy", className = "" }: Props) {
  const eyeY = mood === "sad" ? 56 : 52;
  const mouth =
    mood === "sad"
      ? "M 50 78 Q 70 70 90 78"
      : mood === "thinking"
      ? "M 52 76 L 88 76"
      : "M 48 74 Q 70 92 92 74";

  return (
    <div className={`ayi-float ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 140 140" width={size} height={size} aria-label="Mascotte AYI">
        {/* halo */}
        <circle cx="70" cy="70" r="62" fill="oklch(0.85 0.17 90 / 0.25)" />
        {/* body */}
        <ellipse cx="70" cy="80" rx="48" ry="46" fill="var(--color-primary)" />
        {/* belly */}
        <ellipse cx="70" cy="92" rx="32" ry="28" fill="oklch(0.97 0.03 90)" />
        {/* pattern stripes (inspired Adinkra) */}
        <path d="M50 100 Q70 108 90 100" stroke="var(--color-gold)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M54 110 Q70 116 86 110" stroke="var(--color-coral)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="56" cy={eyeY} r="7" fill="white" />
        <circle cx="84" cy={eyeY} r="7" fill="white" />
        <circle cx={mood === "thinking" ? 59 : 57} cy={eyeY + 1} r="3.5" fill="#1a1a1a" />
        <circle cx={mood === "thinking" ? 87 : 85} cy={eyeY + 1} r="3.5" fill="#1a1a1a" />
        <circle cx={mood === "thinking" ? 60 : 58} cy={eyeY} r="1.2" fill="white" />
        {/* cheeks */}
        <circle cx="46" cy="66" r="4" fill="oklch(0.85 0.15 25 / 0.6)" />
        <circle cx="94" cy="66" r="4" fill="oklch(0.85 0.15 25 / 0.6)" />
        {/* mouth */}
        <path d={mouth} stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* tuft */}
        <path d="M62 30 Q70 12 78 30" stroke="var(--color-gold)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="70" cy="20" r="4" fill="var(--color-gold)" />
      </svg>
    </div>
  );
}

export function AyiBubble({
  children,
  mood = "happy",
}: {
  children: React.ReactNode;
  mood?: Props["mood"];
}) {
  return (
    <div className="flex items-end gap-3">
      <Ayi size={88} mood={mood} />
      <div className="relative bg-card border-2 border-border rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs shadow-card pop-in">
        <div className="text-sm font-medium text-card-foreground">{children}</div>
      </div>
    </div>
  );
}
