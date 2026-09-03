import { Link } from "@tanstack/react-router";
import { Flame, Zap, Play } from "lucide-react";
import { LEVEL_LABEL, type Level } from "@/lib/curriculum";

type Props = {
  username: string;
  level: Level;
  xp: number;
  streak: number;
  donePct: number;
  doneCount: number;
  totalCount: number;
  nextLessonId: string | null;
  nextLessonTitle: string | null;
};

export function CourseHeader({
  username,
  level,
  xp,
  streak,
  donePct,
  doneCount,
  totalCount,
  nextLessonId,
  nextLessonTitle,
}: Props) {
  return (
    <section className="rounded-3xl bg-gradient-hero text-white p-6 sm:p-7 shadow-lg relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10"
      />
      <div className="relative">
        <div className="text-xs font-black uppercase tracking-wider text-white/80">
          Niveau {LEVEL_LABEL[level]}
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3xl mt-1">
          Kwabo, {username} 👋🏾
        </h1>
        <p className="text-white/85 text-sm font-bold mt-1">
          {doneCount} leçon{doneCount > 1 ? "s" : ""} sur {totalCount} terminée
          {doneCount > 1 ? "s" : ""}
        </p>

        <div className="mt-4 h-3 bg-white/25 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${donePct}%`, transition: "width 700ms var(--ease-out-soft)" }}
          />
        </div>
        <div className="mt-1 text-[11px] font-black text-white/80 tabular-nums">{donePct}%</div>

        <div className="mt-4 flex items-center gap-3">
          <Badge icon={<Zap className="w-4 h-4 fill-current" />} value={`${xp} XP`} />
          <Badge icon={<Flame className="w-4 h-4 fill-current" />} value={`${streak} j`} />
        </div>

        {nextLessonId && (
          <Link
            to="/lesson/$id"
            params={{ id: nextLessonId }}
            className="btn-3d mt-5 w-full flex items-center justify-center gap-2 bg-white text-primary font-black py-4 rounded-2xl uppercase tracking-wider"
            style={{ boxShadow: "0 4px 0 0 rgba(0,0,0,0.2)" }}
          >
            <Play className="w-5 h-5 fill-current" />
            Continuer
          </Link>
        )}
        {nextLessonTitle && (
          <div className="mt-2 text-center text-xs font-bold text-white/80">
            Prochaine étape : {nextLessonTitle}
          </div>
        )}
      </div>
    </section>
  );
}

function Badge({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-3 py-1.5 font-black text-sm">
      {icon}
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
