import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export const LANGUAGES = [
  { id: "fon", name: "Fon (Fɔngbè)", flag: "🇧🇯", country: "Bénin", available: true },
  { id: "yo", name: "Yoruba", flag: "🇳🇬", country: "Nigéria", available: false },
  { id: "wo", name: "Wolof", flag: "🇸🇳", country: "Sénégal", available: false },
  { id: "sw", name: "Swahili", flag: "🇰🇪", country: "Afrique de l'Est", available: false },
  { id: "ln", name: "Lingala", flag: "🇨🇩", country: "Congo", available: false },
  { id: "bm", name: "Bambara", flag: "🇲🇱", country: "Mali", available: false },
];

export function LanguageSheet({ open, onClose, current = "fon", onSelect }: { open: boolean; onClose: () => void; current?: string; onSelect?: (id: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-card w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 pop-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-black text-xl">Choisis ta langue</h2>
          <button onClick={onClose} className="p-2 -mr-2"><X /></button>
        </div>
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {LANGUAGES.map((l) => {
            const active = l.id === current;
            return (
              <button
                key={l.id}
                onClick={() => {
                  if (!l.available) {
                    toast.success("Bientôt disponible !", { description: `Le ${l.name} arrive prochainement sur Kwabo.` });
                    return;
                  }
                  onSelect?.(l.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-colors ${active ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/40"}`}
              >
                <span className="text-3xl">{l.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-display font-black">{l.name}</div>
                  <div className="text-xs text-muted-foreground font-bold">{l.country}</div>
                </div>
                {l.available ? (
                  active && <span className="text-primary font-black text-xs">ACTIF</span>
                ) : (
                  <span className="text-[10px] font-black uppercase bg-muted px-2 py-1 rounded-full">Bientôt</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
