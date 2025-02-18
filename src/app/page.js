import Leaderboard from "@/components/Leaderboard";
import Quiz from "@/components/Quiz";
import QuizHistory from "@/components/QuizHistory";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="col-span-1">
          <Quiz />
        </div>
        <div className="col-span-1">
          <QuizHistory />
        </div>
        <div className="col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
