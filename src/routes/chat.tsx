import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { Ayi } from "@/components/Ayi";
import { SpeakButton } from "@/components/SpeakButton";
import { BottomNav } from "@/components/home/BottomNav";
import { chatWithAyi } from "@/lib/chat.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Parler avec AYI — Kwabo" }] }),
  component: ChatPage,
});

type Reply = { fon: string; french: string; tip: string; correction: string };
type Message = { role: "user" | "assistant"; content: string; reply?: Reply };

const SCENARIOS = [
  { id: "salutation", emoji: "👋", label: "Saluer un ancien", opener: "Tu rencontres un ancien du village. Salue-le respectueusement en Fon." },
  { id: "marche", emoji: "🛒", label: "Au marché", opener: "Tu veux acheter des tomates au marché de Cotonou. Commence la négociation." },
  { id: "chemin", emoji: "🗺️", label: "Demander le chemin", opener: "Tu es perdu(e) à Ouidah. Demande ton chemin à un passant." },
  { id: "repas", emoji: "🍲", label: "Commander un repas", opener: "Tu es au maquis. Commande de l'akassa avec sauce." },
  { id: "presentation", emoji: "🙋", label: "Se présenter", opener: "Tu rencontres un nouveau voisin. Présente-toi." },
  { id: "libre", emoji: "💬", label: "Discussion libre", opener: "Pose n'importe quelle question à AYI sur le Fon." },
];

function ChatPage() {
  const send = useServerFn(chatWithAyi);
  const [scenario, setScenario] = useState<typeof SCENARIOS[number] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function startScenario(s: typeof SCENARIOS[number]) {
    setScenario(s);
    setMessages([]);
    setLoading(true);
    const seedMsgs: Message[] = [{ role: "user", content: s.opener }];
    try {
      const res = await send({
        data: {
          scenario: s.label,
          messages: seedMsgs.map((m) => ({ role: m.role, content: m.content })),
        },
      });
      if (res.error) toast.error(res.error);
      if (res.reply) {
        setMessages([
          { role: "user", content: s.opener },
          { role: "assistant", content: res.reply.fon, reply: res.reply },
        ]);
      }
    } catch (e) {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (!input.trim() || !scenario || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({
        data: {
          scenario: scenario.label,
          messages: next.map((m) => ({ role: m.role, content: m.reply?.fon || m.content })),
        },
      });
      if (res.error) toast.error(res.error);
      if (res.reply) {
        setMessages([...next, { role: "assistant", content: res.reply.fon, reply: res.reply }]);
      }
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  if (!scenario) {
    return (
      <div className="min-h-dvh bg-background pb-24">
        <header className="px-5 pt-5 pb-3 flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 text-muted-foreground"><ArrowLeft /></Link>
          <div>
            <h1 className="font-display font-black text-2xl">Parler avec AYI</h1>
            <p className="text-xs text-muted-foreground font-bold">Conversations en Fon avec correction IA</p>
          </div>
        </header>
        <div className="px-5 pt-2">
          <div className="bg-gradient-to-br from-primary/10 to-gold/10 rounded-3xl p-5 mb-5 flex items-center gap-4 border-2 border-primary/20">
            <Ayi size={80} mood="happy" />
            <div>
              <p className="font-display font-black">Choisis une situation</p>
              <p className="text-xs text-muted-foreground font-bold mt-1">Je parle Fon, traduis, et corrige tes erreurs.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => startScenario(s)}
                className="btn-3d p-4 rounded-2xl border-2 border-border bg-card text-left hover:border-primary transition-all"
              >
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="font-display font-black text-sm leading-tight">{s.label}</div>
              </button>
            ))}
          </div>
        </div>
        <BottomNav active="chat" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-background pb-24">
      <header className="px-5 pt-5 pb-3 flex items-center gap-3 border-b border-border/60 sticky top-0 bg-background/95 backdrop-blur z-10">
        <button onClick={() => { setScenario(null); setMessages([]); }} className="p-2 -ml-2 text-muted-foreground"><ArrowLeft /></button>
        <div className="flex-1">
          <div className="font-display font-black flex items-center gap-2">{scenario.emoji} {scenario.label}</div>
          <p className="text-[11px] text-muted-foreground font-bold">AYI répond en Fon · clique 🔊 pour écouter</p>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
            {m.role === "assistant" && <Ayi size={36} mood="happy" />}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border-2 border-border rounded-bl-sm"}`}>
              {m.role === "assistant" && m.reply ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <p className="font-display font-black text-base flex-1">{m.reply.fon}</p>
                    <SpeakButton text={m.reply.fon} size="sm" />
                  </div>
                  {m.reply.french && <p className="text-xs text-muted-foreground italic">{m.reply.french}</p>}
                  {m.reply.correction && (
                    <div className="mt-2 p-2 bg-coral/10 border border-coral/30 rounded-lg text-xs">
                      <span className="font-black text-coral">Correction : </span>{m.reply.correction}
                    </div>
                  )}
                  {m.reply.tip && (
                    <div className="mt-2 p-2 bg-gold/10 border border-gold/30 rounded-lg text-xs flex items-start gap-1.5">
                      <Sparkles className="w-3 h-3 mt-0.5 text-gold flex-shrink-0" />
                      <span className="font-bold">{m.reply.tip}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm font-bold whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-center">
            <Ayi size={36} mood="happy" />
            <div className="bg-card border-2 border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-20 px-4 py-3 bg-background/95 backdrop-blur border-t border-border/60">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Écris en Fon ou en français…"
            maxLength={300}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-border bg-card font-bold focus:border-primary outline-none disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="btn-3d w-12 h-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center disabled:opacity-40"
            aria-label="Envoyer"
          >
            <Send className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </div>

      <BottomNav active="chat" />
    </div>
  );
}
