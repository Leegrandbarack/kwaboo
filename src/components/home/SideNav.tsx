import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Trophy, MessageCircle, User, Settings } from "lucide-react";
import { Ayi } from "@/components/Ayi";

const tabs = [
  { id: "home", label: "Accueil", icon: Home, to: "/" as const },
  { id: "learn", label: "Apprendre", icon: BookOpen, to: "/learn" as const },
  { id: "chat", label: "Parler", icon: MessageCircle, to: "/chat" as const },
  { id: "rank", label: "Classement", icon: Trophy, to: "/leaderboard" as const },
  { id: "profile", label: "Profil", icon: User, to: "/profile" as const },
  { id: "settings", label: "Paramètres", icon: Settings, to: "/parametres" as const },
];

export function SideNav({ active = "home" }: { active?: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 w-[220px]">
        <Link to="/" className="flex items-center gap-2.5 px-3 mb-6">
          <Ayi size={40} />
          <span className="font-display font-black text-2xl tracking-tight text-primary">
            KWABO
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <Link
                key={t.id}
                to={t.to}
                className={`press flex items-center gap-3 rounded-2xl px-3.5 py-3 border transition-colors ${
                  isActive
                    ? "bg-primary/12 border-primary/30 text-primary"
                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.6 : 2} />
                <span
                  className={`text-sm uppercase tracking-wide truncate ${
                    isActive ? "font-black" : "font-bold"
                  }`}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
