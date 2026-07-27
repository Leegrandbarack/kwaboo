import { useMemo } from "react";
import { Ayi } from "@/components/Ayi";
import { Lightbulb } from "lucide-react";

const TIPS = [
  "En Fon, bonjour se dit souvent « Fofo ».",
  "« Awanou » veut dire merci. Très utile au marché !",
  "Le Fɔngbè est une langue tonale : la hauteur change le sens.",
  "« Nyɛ » = moi, « Hwɛ » = toi (formes emphatiques).",
  "Le royaume du Danxomè a duré près de 300 ans !",
  "« Mawu » désigne la divinité suprême dans la cosmogonie Fon.",
];

export function AyiTip() {
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);
  return (
    <section className="mt-6 mx-4">
      <div className="flex items-end gap-3">
        <div className="shrink-0">
          <Ayi size={68} mood="thinking" />
        </div>
        <div className="relative flex-1 min-w-0 bg-card border border-border/70 rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
          <div
            aria-hidden
            className="absolute -left-1.5 bottom-3 w-3 h-3 bg-card border-l border-b border-border/70 rotate-45"
          />
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">
            <Lightbulb className="w-3 h-3" /> AYI · Astuce du jour
          </div>
          <p className="text-sm font-semibold leading-snug">{tip}</p>
        </div>
      </div>
    </section>
  );
}
