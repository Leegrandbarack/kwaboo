import { createFileRoute, Link } from "@tanstack/react-router";
import { Ayi } from "@/components/Ayi";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Bienvenue sur Kwabo" }] }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="min-h-dvh bg-gradient-hero text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0 2px, transparent 2px 14px)" }} />
      <div className="relative z-10 flex flex-col items-center gap-5 max-w-md">
        <Ayi size={180} mood="cheer" />
        <h1 className="font-display font-black text-5xl leading-none tracking-tight">KWABO</h1>
        <p className="font-display font-bold text-xl text-white/95">Apprends les langues africaines avec AYI</p>
        <p className="text-white/85 text-sm leading-relaxed">
          Préserve. Apprends. Transmets.<br/>
          Commence ton aventure linguistique aujourd&apos;hui.
        </p>
        <Link to="/onboarding" className="btn-3d mt-4 w-full bg-white text-primary font-display font-black py-4 rounded-2xl uppercase tracking-wider text-base" style={{ boxShadow: "0 4px 0 0 rgba(0,0,0,0.2)" }}>
          Commencer gratuitement
        </Link>
        <Link to="/" className="text-white/80 font-bold underline text-sm">J&apos;ai déjà un compte</Link>
      </div>
    </div>
  );
}
