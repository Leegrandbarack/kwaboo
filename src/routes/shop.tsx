import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Heart, Snowflake, Zap, Shirt, Gem } from "lucide-react";
import { useProgress, MAX_HEARTS, HEART_REFILL_COST } from "@/lib/progress";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Boutique — Kwabo" }] }),
  component: ShopPage,
});

function ShopPage() {
  const { progress, refillHearts, spendGems, update } = useProgress();

  function buyHearts() {
    if (progress.hearts >= MAX_HEARTS) { toast.error("Tes cœurs sont déjà au max !"); return; }
    if (refillHearts()) toast.success("Cœurs rechargés ! ❤️");
    else toast.error("Pas assez de gemmes.");
  }

  function buyUnlimited() {
    if (progress.unlimitedHearts) { update({ unlimitedHearts: false }); toast("Mode illimité désactivé"); return; }
    if (spendGems(800)) { update({ unlimitedHearts: true }); toast.success("Cœurs illimités activés ! ∞"); }
    else toast.error("Pas assez de gemmes (800 requis).");
  }

  function buyOutfit() {
    if (spendGems(200)) toast.success("Tenue d'AYI achetée ! 👘");
    else toast.error("Pas assez de gemmes.");
  }

  function buyDouble() {
    if (spendGems(150)) toast.success("Doubleur XP activé pour 15 min ⚡");
    else toast.error("Pas assez de gemmes.");
  }

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto pb-32 px-4">
        <div className="mt-4 rounded-3xl bg-gradient-to-br from-gold to-coral text-white p-5 text-center shadow-card">
          <div className="flex items-center justify-center gap-2 font-display font-black text-3xl"><Gem /> {progress.gems}</div>
          <p className="text-sm font-bold opacity-90 mt-1">Gemmes disponibles</p>
        </div>

        <h2 className="font-display font-black text-lg mt-6 mb-2">Cœurs</h2>
        <Item icon={<Heart className="fill-current" />} color="coral" title="Recharger les cœurs" sub="Repars avec 5 cœurs" cost={HEART_REFILL_COST} onBuy={buyHearts} />
        <Item icon={<Heart className="fill-current" />} color="coral" title={progress.unlimitedHearts ? "Désactiver illimité" : "Cœurs illimités"} sub="Joue sans limites" cost={800} onBuy={buyUnlimited} active={progress.unlimitedHearts} />

        <h2 className="font-display font-black text-lg mt-6 mb-2">Boosters</h2>
        <Item icon={<Zap className="fill-current" />} color="gold" title="Doubleur XP 15 min" sub="Gagne 2× plus d'XP" cost={150} onBuy={buyDouble} />
        <Item icon={<Snowflake />} color="primary" title="Gel de série" sub="Protège ta série un jour" cost={100} onBuy={() => { if (spendGems(100)) toast.success("Gel acheté !"); else toast.error("Pas assez de gemmes."); }} />

        <h2 className="font-display font-black text-lg mt-6 mb-2">Tenues d&apos;AYI</h2>
        <Item icon={<Shirt />} color="primary" title="Tenue traditionnelle" sub="Habille AYI en kente" cost={200} onBuy={buyOutfit} />
        <Item icon={<Shirt />} color="coral" title="Tenue de roi" sub="AYI en tenue royale du Danxomè" cost={400} onBuy={buyOutfit} />
      </main>
      <BottomNav />
    </div>
  );
}

function Item({ icon, color, title, sub, cost, onBuy, active }: { icon: React.ReactNode; color: "coral" | "gold" | "primary"; title: string; sub: string; cost: number; onBuy: () => void; active?: boolean }) {
  const tone = color === "coral" ? "bg-coral text-coral-foreground" : color === "gold" ? "bg-gold text-gold-foreground" : "bg-primary text-primary-foreground";
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border-2 border-border mb-2">
      <div className={`w-12 h-12 grid place-items-center rounded-xl ${tone}`}>{icon}</div>
      <div className="flex-1">
        <div className="font-display font-black text-sm">{title} {active && <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full ml-1">ACTIF</span>}</div>
        <div className="text-xs text-muted-foreground font-bold">{sub}</div>
      </div>
      <button onClick={onBuy} className="btn-3d bg-primary text-primary-foreground font-black px-3 py-2 rounded-xl text-xs flex items-center gap-1">
        <Gem className="w-3 h-3" /> {cost}
      </button>
    </div>
  );
}
