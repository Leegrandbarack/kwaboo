import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Trophy, MessageCircle, User } from "lucide-react";

const tabs = [
  { id: "home", label: "Accueil", icon: Home, to: "/" as const },
  { id: "learn", label: "Apprendre", icon: BookOpen, to: "/learn" as const },
  { id: "chat", label: "Parler", icon: MessageCircle, to: "/chat" as const },
  { id: "rank", label: "Classement", icon: Trophy, to: "/leaderboard" as const },
  { id: "profile", label: "Profil", icon: User, to: "/profile" as const },
];

export function BottomNav({ active = "home" }: { active?: string }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border">
      <div className="max-w-2xl mx-auto px-2 py-1 grid grid-cols-5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === active;
          return (
            <Link
              key={t.id}
              to={t.to}
              className={`relative flex flex-col items-center gap-1 py-2.5 transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2 : 1.6} />
              <span className={`text-[10px] tracking-wide ${isActive ? "font-medium" : ""}`}>{t.label}</span>
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-px bg-foreground" />}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
