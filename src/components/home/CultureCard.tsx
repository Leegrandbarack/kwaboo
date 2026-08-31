import { Sparkles, ArrowRight } from "lucide-react";

export function CultureCard() {
  return (
    <section className="mt-6 mx-4 lg:mx-0">
      <article className="relative overflow-hidden rounded-3xl border border-border/60 p-5 shadow-card bg-card">
        {/* Culture pattern background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 bg-african-pattern"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--coral) 8%, transparent) 0%, transparent 60%)",
          }}
        />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-gold text-gold-foreground px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" /> Culture Fon
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Épisode 01
            </span>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div
              className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-coral via-gold to-primary grid place-items-center text-4xl shadow-card ring-2 ring-white/40"
              aria-hidden
            >
              👑
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-black text-lg leading-tight">
                Le Royaume du Danxomè
              </h3>
              <p className="text-xs text-muted-foreground font-semibold mt-1 leading-snug">
                Houegbadja, Agadja, Béhanzin… 300 ans d&apos;histoire à découvrir.
              </p>
            </div>
          </div>

          <button className="btn-3d mt-4 w-full bg-coral text-coral-foreground font-display font-black px-5 py-3 rounded-2xl uppercase tracking-wider text-sm flex items-center justify-center gap-2">
            Explorer <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </article>
    </section>
  );
}
