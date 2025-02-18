'use client'
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { saveAttempt } from "../utils/indexedDB";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const quizQuestions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    id: 2,
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    id: 3,
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
  },
  {
    id: 5,
    question: "Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    answer: "Filtration",
  },
  {
    id: 6,
    question: "What is the value of 12 + 28?",
    options: ["40","50","30","75"],
    answer: "40",
  },
  {
    id: 7,
    question: "How many states are there in the United States?",
    options: ["50","155", "130", "120"],
    answer: "50",
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    options: ["1776","1778","1789","1800"],
    answer: "1776",
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    options: ["3","2","1","0"],
    answer: "3",
  },
  {
    id: 10,
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    options: ["140", "155", "130", "120"],
    answer: "120",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswer = (option) => {
    if (selectedAnswer) return; 

    setSelectedAnswer(option);
    if (option === quizQuestions[currentQuestion].answer) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setFeedback(null);
      setTimer(30);
    } else {
      toast.success(`Quiz Completed! Your Score: ${score}/${quizQuestions.length}`);

      await saveAttempt({
        score,
        totalQuestions: quizQuestions.length,
        date: new Date().toISOString(),
      });

      // Reset quiz
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <div className="w-[100%] mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Time!</h2>

      {/* Display Question Number and Question */}
      <p className="text-lg font-semibold">
         ({currentQuestion + 1}) {quizQuestions[currentQuestion].question}
      </p>

      <div className="mt-4">
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`block w-full p-2 my-2 rounded-md transition-colors ${
              selectedAnswer === option
                ? option === quizQuestions[currentQuestion].answer
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer} 
          >
            {option}
          </button>
        ))}
      </div>
      
      <p className="mt-2">Time Left: {timer}s</p>
      {feedback && (
        <div className="mt-4 text-lg flex justify-center items-center">
          {feedback === "correct" ? (
            <FaCheckCircle className="text-green-500 text-3xl" />
          ) : (
            <FaTimesCircle className="text-red-500 text-3xl" />
          )}
          <span className="ml-2">
            {feedback === "correct" ? "Correct Answer!" : "Wrong Answer!"}
          </span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quiz;
