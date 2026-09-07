import { createFileRoute, Link } from "@tanstack/react-router";
import { getLesson } from "@/lib/curriculum";
import { ExercisePlayer } from "@/components/exercises/ExercisePlayer";

export const Route = createFileRoute("/lesson/$id")({
  head: () => ({
    meta: [
      { title: "Leçon — Kwabo" },
      { name: "description", content: "Apprends le Fɔngbè avec AYI." },
    ],
  }),
  component: LessonPage,
  notFoundComponent: () => (
    <div className="min-h-dvh grid place-items-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-black mb-2">Leçon introuvable</h1>
        <Link to="/" className="text-primary font-bold underline">Retour</Link>
      </div>
    </div>
  ),
});

function LessonPage() {
  const { id } = Route.useParams();
  const data = getLesson(id);
  if (!data) {
    return (
      <div className="min-h-dvh grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-black mb-2">Leçon introuvable</h1>
          <Link to="/" className="text-primary font-bold underline">Retour</Link>
        </div>
      </div>
    );
  }
  if (data.lesson.exercises.length === 0) {
    return (
      <div className="min-h-dvh grid place-items-center p-6 bg-background">
        <div className="max-w-sm text-center rounded-[28px] border-2 border-dashed border-border bg-card p-8">
          <div className="text-5xl" aria-hidden>{data.lesson.emoji}</div>
          <h1 className="font-display font-black text-xl mt-3">{data.lesson.title}</h1>
          {data.lesson.objective && (
            <p className="text-sm font-bold text-muted-foreground mt-1">{data.lesson.objective}</p>
          )}
          <p className="text-sm font-bold text-muted-foreground mt-4">
            Contenu bientôt disponible 🌱
          </p>
          <Link
            to="/learn"
            className="btn-3d mt-6 inline-flex items-center justify-center bg-primary text-primary-foreground font-display font-black px-6 py-3 rounded-2xl uppercase tracking-wide text-sm"
          >
            Retour au parcours
          </Link>
        </div>
      </div>
    );
  }
  return (
    <ExercisePlayer
      lessonId={data.lesson.id}
      lessonTitle={data.lesson.title}
      exercises={data.lesson.exercises}
    />
  );
}
