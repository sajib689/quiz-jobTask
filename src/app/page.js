import Quiz from "@/components/Quiz";
import QuizHistory from "@/components/QuizHistory";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Quiz />
      <QuizHistory />
    </div>
  );
}
