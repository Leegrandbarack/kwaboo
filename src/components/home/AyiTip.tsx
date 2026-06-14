import { useMemo } from "react";
import { Ayi } from "@/components/Ayi";

const TIPS = [
  "Le savais-tu ? En Fon, bonjour se dit souvent « Fofo ».",
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
          <Ayi size={72} mood="thinking" />
        </div>
        <div className="relative flex-1 bg-card border-2 border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-card">
          <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">
            AYI · Astuce
          </div>
          <p className="text-sm font-semibold leading-snug">{tip}</p>
        </div>
      </div>
    </section>
  );
}
