import { Link } from "@tanstack/react-router";
import { RotateCcw, Sparkles } from "lucide-react";

export function ReviewCard({ dueCount, totalCount }: { dueCount: number; totalCount: number }) {
  return (
    <section className="rounded-3xl border-2 border-gold/60 bg-gold/10 p-5">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gold text-gold-foreground grid place-items-center shrink-0">
          <RotateCcw className="w-5 h-5" strokeWidth={2.6} />
        </div>
        <div className="flex-1">
          <h2 className="font-display font-black text-lg">Réviser mes erreurs</h2>
          {totalCount === 0 ? (
            <p className="text-sm text-muted-foreground font-bold mt-0.5">
              Aucune erreur enregistrée. Continue tes leçons !
            </p>
          ) : (
            <p className="text-sm text-muted-foreground font-bold mt-0.5">
              {dueCount > 0
                ? `${dueCount} mot${dueCount > 1 ? "s" : ""} à revoir aujourd'hui`
                : "Rien à revoir aujourd'hui — reviens plus tard"}
              {" · "}
              {totalCount} au total
            </p>
          )}
        </div>
      </div>
      <Link
        to="/revision"
        className="btn-3d mt-4 w-full flex items-center justify-center gap-2 bg-gold text-gold-foreground font-black py-3.5 rounded-2xl uppercase tracking-wider"
      >
        <Sparkles className="w-5 h-5" />
        {dueCount > 0 ? "Commencer la révision" : "Voir mes mots"}
      </Link>
    </section>
  );
}
