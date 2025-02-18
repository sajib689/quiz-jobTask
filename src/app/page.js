import Quiz from "@/components/Quiz";
import QuizHistory from "@/components/QuizHistory";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-2 gap-5 p-5">
      <Quiz />
      <QuizHistory />
    </div>
  );
}
