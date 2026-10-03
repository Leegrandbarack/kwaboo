import { Sparkles, ArrowRight } from "lucide-react";
import cultureImage from "@/assets/danxome-culture.jpg";
import { Button } from "@/components/ui/button";

export function CultureCard() {
  return (
    <section>
      <article className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card">
        <div className="aspect-[2/1] overflow-hidden bg-muted">
          <img src={cultureImage} alt="Illustration des palais royaux du Danxomè" width={1536} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-gold text-gold-foreground px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" /> Culture Fon
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Épisode 01
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-coral text-2xl text-coral-foreground shadow-sm" aria-hidden>👑</div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-black text-lg leading-tight">
                Le Royaume du Danxomè
              </h3>
              <p className="text-xs text-muted-foreground font-semibold mt-1 leading-snug">
                Houegbadja, Agadja, Béhanzin… 300 ans d&apos;histoire à découvrir.
              </p>
            </div>
          </div>

          <Button className="btn-3d mt-4 h-12 w-full rounded-2xl bg-coral px-5 font-display text-sm font-black uppercase tracking-wider text-coral-foreground hover:bg-coral/90">
            Explorer <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </Button>
        </div>
      </article>
    </section>
  );
}
