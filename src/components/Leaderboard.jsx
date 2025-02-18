'use client'
import { useEffect, useState } from 'react';
import { getAttempts } from '../utils/indexedDB';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const attempts = await getAttempts();
      const sortedLeaderboard = attempts
        .sort((a, b) => b.score - a.score) 
        .slice(0, 10);  
      setLeaderboard(sortedLeaderboard);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {leaderboard.map((attempt, index) => (
          <li key={index} className="my-2 p-2 bg-gray-700 rounded">
            <span>{`${index + 1}. ${new Date(attempt.date).toLocaleString()} - Score: ${attempt.score}/${attempt.totalQuestions}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
