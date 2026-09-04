import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/home/BottomNav";
import { CourseHeader } from "@/components/cours/CourseHeader";
import { LevelTrack } from "@/components/cours/LevelTrack";
import { allUnits, levelTracks, pathLessons, type Level } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/cours")({
  head: () => ({
    meta: [
      { title: "Cours de Fɔngbè — Kwabo" },
      {
        name: "description",
        content:
          "Apprends le Fɔngbè pas à pas : parcours Débutant, Intermédiaire et Avancé, unités avec objectifs, récompenses et révision intelligente.",
      },
      { property: "og:title", content: "Cours de Fɔngbè — Kwabo" },
      {
        property: "og:description",
        content:
          "Parcours structuré en unités et leçons pour maîtriser le Fɔngbè, avec progression, badges et XP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursPage,
});

function CoursPage() {
  const { progress } = useProgress();
  const completed = progress.completed;

  const { lockedUnitIds, nextLesson, doneCount, currentLevel } = useMemo(() => {
    const locked = new Set<string>();
    let previousDone = true;
    for (const u of allUnits) {
      if (!previousDone) locked.add(u.id);
      previousDone = previousDone && u.lessonIds.every((id) => completed.includes(id));
    }
    const next = pathLessons.find((l) => !completed.includes(l.id)) ?? null;
    const nextUnit = next ? allUnits.find((u) => u.lessonIds.includes(next.id)) : undefined;
    return {
      lockedUnitIds: locked,
      nextLesson: next,
      doneCount: pathLessons.filter((l) => completed.includes(l.id)).length,
      currentLevel: (nextUnit?.section.level ?? "advanced") as Level,
    };
  }, [completed]);

  const total = pathLessons.length;
  const donePct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="min-h-dvh bg-background">
      <main className="max-w-2xl mx-auto px-4 pt-5 pb-32 space-y-6">
        <CourseHeader
          username={progress.username}
          level={currentLevel}
          xp={progress.xp}
          streak={progress.streak}
          donePct={donePct}
          doneCount={doneCount}
          totalCount={total}
          nextLessonId={nextLesson?.id ?? null}
          nextLessonTitle={nextLesson?.title ?? null}
        />

        <div className="space-y-4">
          {levelTracks
            .filter((t) => t.sections.length > 0)
            .map((t) => (
              <LevelTrack
                key={t.level}
                level={t.level}
                sections={t.sections}
                completed={completed}
                lockedUnitIds={lockedUnitIds}
                defaultOpen={t.level === currentLevel}
              />
            ))}
        </div>
      </main>
      <BottomNav active="cours" />
    </div>
  );
}
