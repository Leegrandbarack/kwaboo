import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { fonAlphabet } from "@/lib/alphabet";
import { SpeakButton } from "@/components/SpeakButton";
import { Ayi, AyiBubble } from "@/components/Ayi";

export function AlphabetIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b-2 border-border">
        <div className="max-w-2xl mx-auto flex items-center gap-3 px-4 py-3">
          <Link to="/learn" aria-label="Retour au parcours" className="w-9 h-9 grid place-items-center rounded-full hover:bg-muted">
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          </Link>
          <h1 className="font-display font-black text-lg">Alphabet et sons du fon</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-40 pt-5">
        <div className="flex items-start gap-3">
          <Ayi size={72} mood="happy" />
          <AyiBubble>
            Écoute chaque lettre, puis on s&apos;entraîne ! Les lettres en couleur n&apos;existent pas en français.
          </AyiBubble>
        </div>

        <div className="mt-5 rounded-[24px] border-2 border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-4 py-3 bg-muted/60 text-xs font-black uppercase tracking-wide text-muted-foreground">
            <span>Lettre</span>
            <span>Se prononce</span>
            <span className="sr-only">Écouter</span>
          </div>
          <ul className="divide-y-2 divide-border">
            {fonAlphabet.map((l) => (
              <li key={l.upper} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 px-4 py-2.5">
                <span className="flex items-baseline gap-2">
                  <span className={`font-display font-black text-xl ${l.special ? "text-coral" : l.nasal ? "text-gold" : ""}`}>
                    {l.upper}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">{l.lower}</span>
                </span>
                <span className="font-bold">{l.say}</span>
                <SpeakButton text={l.say} size="sm" />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 text-xs font-bold text-muted-foreground">
          <span className="text-coral">Rouge</span> : son propre au fon · <span className="text-gold">Or</span> : voyelle nasale.
          Les tons (accents) sont vus plus tard.
        </p>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-border bg-background/95 backdrop-blur">
        <div className="max-w-2xl mx-auto p-4">
          <button
            type="button"
            onClick={onStart}
            className="btn-3d w-full bg-primary text-primary-foreground font-display font-black py-4 rounded-2xl uppercase tracking-wide"
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
}
