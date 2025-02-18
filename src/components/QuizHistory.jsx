'use client'
import { useEffect, useState } from "react";
import { getAttempts } from "../utils/indexedDB";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getAttempts();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg h-[95vh]">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      <ul className="overflow-y-auto max-h-full">
        {history.map((attempt, index) => (
          <li key={index} className="my-2 p-2 bg-gray-700 rounded">
            <span>{new Date(attempt.date).toLocaleString()} - Score: {attempt.score}/{attempt.totalQuestions}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizHistory;
