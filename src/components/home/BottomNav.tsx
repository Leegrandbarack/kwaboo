import { Link } from "@tanstack/react-router";
import { Home, Languages, Map, MessageCircle, User } from "lucide-react";

const tabs = [
  { id: "home", label: "Accueil", icon: Home, to: "/" as const },
  { id: "learn", label: "Apprendre", icon: Map, to: "/learn" as const },
  { id: "traduction", label: "Traduction", icon: Languages, to: "/traduction" as const },
  { id: "chat", label: "Parler", icon: MessageCircle, to: "/chat" as const },
  { id: "profile", label: "Profil", icon: User, to: "/profile" as const },
];


export function BottomNav({ active = "home" }: { active?: string }) {
  const activeIdx = Math.max(0, tabs.findIndex((t) => t.id === active));
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-background/85 backdrop-blur-xl border-t border-border/60">
      <div className="max-w-2xl mx-auto px-2 py-1.5 relative">
        {/* Sliding pill indicator */}
        <div
          aria-hidden
          className="absolute top-1.5 bottom-1.5 rounded-2xl bg-primary/12 pointer-events-none"
          style={{
            width: `calc(16.6667% - 8px)`,
            left: `calc(${activeIdx * 16.6667}% + 4px)`,
            transition: "left 360ms var(--ease-spring)",
          }}
        />
        <div className="grid grid-cols-6 relative">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <Link
                key={t.id}
                to={t.to}
                className={`press relative flex flex-col items-center gap-0.5 py-2 rounded-2xl transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.6 : 2} />
                <span className={`text-[10px] ${isActive ? "font-black" : "font-bold"}`}>{t.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
