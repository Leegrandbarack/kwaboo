import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Heart, Infinity as InfinityIcon, Gem } from "lucide-react";
import { Ayi } from "@/components/Ayi";
import { HeartRegenTimer } from "@/components/HeartRegenTimer";
import { useProgress, HEART_REFILL_COST } from "@/lib/progress";

export const Route = createFileRoute("/no-hearts")({
  head: () => ({ meta: [{ title: "Plus de cœurs — Kwabo" }] }),
  component: NoHeartsPage,
});

function NoHeartsPage() {
  const navigate = useNavigate();
  const { progress, refillHearts, toggleUnlimited } = useProgress();

  function recharge() {
    if (refillHearts()) { toast.success("Cœurs rechargés !"); navigate({ to: "/" }); }
    else toast.error(`Il te faut ${HEART_REFILL_COST} gemmes.`);
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 text-center gap-4 bg-background">
      <Ayi size={140} mood="sad" />
      <h1 className="font-display font-black text-3xl">Plus de cœurs !</h1>
      <p className="text-muted-foreground max-w-sm">AYI a besoin d&apos;une pause. Prochain cœur dans :</p>
      <div className="font-display font-black text-3xl text-coral"><HeartRegenTimer /></div>

      <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
        <button onClick={recharge} className="btn-3d bg-coral text-coral-foreground font-display font-black py-4 rounded-2xl uppercase flex items-center justify-center gap-2">
          <Heart className="fill-current w-5 h-5" /> Recharger <span className="opacity-80 flex items-center gap-0.5 text-sm"><Gem className="w-3 h-3" />{HEART_REFILL_COST}</span>
        </button>
        <button onClick={() => { toggleUnlimited(); toast.success("Cœurs illimités activés !"); navigate({ to: "/" }); }} className="btn-3d bg-gold text-gold-foreground font-display font-black py-4 rounded-2xl uppercase flex items-center justify-center gap-2">
          <InfinityIcon className="w-5 h-5" /> Mode illimité
        </button>
        <Link to="/shop" className="font-bold text-primary py-2">Voir la boutique</Link>
        <Link to="/" className="font-bold text-muted-foreground py-2">Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}
