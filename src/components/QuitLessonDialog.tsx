import { Ayi } from "./Ayi";

export function QuitLessonDialog({ open, onCancel, onConfirm }: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-6 pop-in">
      <div className="bg-card rounded-3xl p-6 max-w-sm w-full text-center shadow-card border-2 border-border">
        <div className="flex justify-center mb-2"><Ayi size={120} mood="sad" /></div>
        <h2 className="font-display font-black text-xl mb-1">Tu veux vraiment partir ?</h2>
        <p className="text-sm text-muted-foreground mb-5">Tu perdras la progression de cette leçon !</p>
        <div className="flex flex-col gap-2">
          <button onClick={onCancel} className="btn-3d bg-primary text-primary-foreground font-black py-3 rounded-2xl uppercase tracking-wider">Continuer la leçon</button>
          <button onClick={onConfirm} className="font-bold text-muted-foreground hover:text-destructive py-2">Quitter</button>
        </div>
      </div>
    </div>
  );
}
