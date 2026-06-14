import { ArrowUpRight } from "lucide-react";

export function CultureCard() {
  return (
    <section className="mt-10 mx-4">
      <article className="group relative overflow-hidden rounded-2xl bg-paper grain border border-border p-6 hover:border-foreground/25 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="gold-rule" />
              <span>Histoire · Culture</span>
            </div>
            <h3 className="font-display text-2xl leading-tight mt-3 max-w-[22ch]">
              Le Royaume du <span className="italic">Danxomè</span>, trois siècles de mémoire.
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-md">
              De Houegbadja à Béhanzin, plonge dans la lignée des rois Fon et l'héritage qu'ils nous laissent.
            </p>
            <button className="btn-press inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5">
              Lire le récit
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </button>
          </div>
          <div className="shrink-0 w-16 h-16 rounded-xl bg-primary text-primary-foreground grid place-items-center text-2xl shadow-card" aria-hidden>
            ♛
          </div>
        </div>
      </article>
    </section>
  );
}
