// components/QuizTrivia.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Hemingway", "Austen", "Dickens"],
    answer: "Shakespeare",
  },
];

function QuizTrivia() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="space-y-4 text-center max-w-md mx-auto">
      {finished ? (
        <>
          <h2 className="text-xl font-bold">
            🎉 You scored {score}/{questions.length}
          </h2>
          <Button onClick={resetQuiz} variant="outline">
            Try Again
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            Question {current + 1} of {questions.length}
          </h2>
          <p className="font-medium">{questions[current].question}</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {questions[current].options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                variant="secondary"
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuizTrivia;
