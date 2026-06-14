import { Sparkles } from "lucide-react";

export function CultureCard() {
  return (
    <section className="mt-6 mx-4">
      <article className="relative overflow-hidden rounded-3xl bg-african-pattern border-2 border-border p-5 shadow-card">
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-gold text-gold-foreground px-2 py-1 rounded-full">
          <Sparkles className="w-3 h-3" /> Culture
        </div>

        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-coral to-gold grid place-items-center text-4xl shadow-card"
            aria-hidden
          >
            👑
          </div>
          <div className="flex-1">
            <h3 className="font-display font-black text-lg leading-tight">
              Découvre le Royaume du Danxomè
            </h3>
            <p className="text-xs text-muted-foreground font-medium mt-1">
              Plonge dans l&apos;histoire des grands rois Fon : Houegbadja, Agadja, Béhanzin…
            </p>
          </div>
        </div>

        <button className="btn-3d mt-4 w-full bg-coral text-coral-foreground font-display font-black px-5 py-3 rounded-2xl uppercase tracking-wider text-sm">
          Explorer
        </button>
      </article>
    </section>
  );
}
