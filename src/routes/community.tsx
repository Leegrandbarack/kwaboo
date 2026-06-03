import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { TopBar } from "@/components/home/TopBar";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Communauté — Kwabo" }] }),
  component: CommunityPage,
});

const POSTS = [
  { id: 1, author: "AYI 🦁", role: "Mascotte", time: "il y a 2h", content: "Le savais-tu ? « Awanou » veut dire merci en Fon, mais c'est aussi un prénom porté avec fierté !", emoji: "🌟" },
  { id: 2, author: "Adjoa", role: "Niveau 12", time: "il y a 5h", content: "30 jours de série ! Merci AYI 🔥 Le Fon devient plus naturel chaque jour.", emoji: "🔥" },
  { id: 3, author: "Culture Bénin", role: "Officiel", time: "hier", content: "Le royaume du Danxomè a duré près de 300 ans. Sa langue officielle ? Le Fon. Vous apprenez la langue des rois !", emoji: "👑" },
  { id: 4, author: "Kossi", role: "Niveau 8", time: "il y a 1j", content: "Première phrase complète à mes parents : « A fɔn ganji à ? » Ils étaient émus.", emoji: "❤️" },
  { id: 5, author: "AYI 🦁", role: "Mascotte", time: "il y a 2j", content: "Astuce : répète chaque mot à voix haute. La langue passe d'abord par l'oreille.", emoji: "💡" },
  { id: 6, author: "Mawuli", role: "Niveau 15", time: "il y a 3j", content: "J'ai chanté une berceuse en Fon à mon neveu. Ma grand-mère pleurait. Merci Kwabo.", emoji: "🎵" },
];

function CommunityPage() {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="max-w-2xl mx-auto pb-32 px-4">
        <div className="mt-4 rounded-3xl bg-gradient-hero text-white p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h1 className="font-display font-black text-xl">Communauté Kwabo</h1>
          </div>
          <p className="text-sm text-white/90 font-medium mt-1">Échange, apprends, partage avec d&apos;autres apprenants.</p>
        </div>

        <div className="mt-6 space-y-3">
          {POSTS.map((p) => {
            const liked = !!likes[p.id];
            return (
              <article key={p.id} className="bg-card border-2 border-border rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold grid place-items-center text-xl">{p.emoji}</div>
                  <div className="flex-1">
                    <div className="font-display font-black text-sm">{p.author}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{p.role} · {p.time}</div>
                  </div>
                </div>
                <p className="text-sm font-medium mt-2">{p.content}</p>
                <div className="flex gap-4 mt-3 text-muted-foreground">
                  <button onClick={() => setLikes((l) => ({ ...l, [p.id]: !liked }))} className={`flex items-center gap-1 text-xs font-bold ${liked ? "text-coral" : ""}`}>
                    <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                    <span>{liked ? "Aimé" : "J'aime"}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs font-bold"><MessageCircle className="w-4 h-4" /> Répondre</button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <BottomNav active="community" />
    </div>
  );
}
