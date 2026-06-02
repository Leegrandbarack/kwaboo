import { Home, BookOpen, Trophy, Users, User } from "lucide-react";

const tabs = [
  { id: "home", label: "Accueil", icon: Home },
  { id: "learn", label: "Apprendre", icon: BookOpen },
  { id: "rank", label: "Classement", icon: Trophy },
  { id: "community", label: "Communauté", icon: Users },
  { id: "profile", label: "Profil", icon: User },
];

export function BottomNav({ active = "home" }: { active?: string }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border/60">
      <div className="max-w-2xl mx-auto px-2 py-1.5 grid grid-cols-5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              className={`relative flex flex-col items-center gap-0.5 py-2 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`relative grid place-items-center w-11 h-9 rounded-xl transition-all ${
                  isActive ? "bg-primary/15 scale-105" : ""
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.6 : 2} />
              </div>
              <span className={`text-[10px] font-black ${isActive ? "" : "font-bold"}`}>
                {t.label}
              </span>
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary pop-in" />
              )}
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
