import { useMemo } from "react";
import { Ayi } from "@/components/Ayi";

const TIPS = [
  "En Fon, bonjour se dit souvent « Fofo ».",
  "« Awanou » veut dire merci. Très utile au marché.",
  "Le Fɔngbè est une langue tonale : la hauteur change le sens.",
  "« Nyɛ » = moi, « Hwɛ » = toi (formes emphatiques).",
  "Le royaume du Danxomè a duré près de 300 ans.",
  "« Mawu » désigne la divinité suprême dans la cosmogonie Fon.",
];

export function AyiTip() {
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);
  return (
    <section className="mt-10 mx-4">
      <div className="flex gap-4 items-start">
        <div className="shrink-0">
          <Ayi size={56} mood="thinking" />
        </div>
        <div className="flex-1 pt-1">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="gold-rule" />
            <span>Ayi · Note du jour</span>
          </div>
          <p className="font-display text-lg leading-snug mt-2 text-foreground">{tip}</p>
        </div>
      </div>
    </section>
  );
}
