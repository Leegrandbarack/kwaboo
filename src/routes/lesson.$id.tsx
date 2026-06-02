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
  return (
    <ExercisePlayer
      lessonId={data.lesson.id}
      lessonTitle={data.lesson.title}
      exercises={data.lesson.exercises}
    />
  );
}
