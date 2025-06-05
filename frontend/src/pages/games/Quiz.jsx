import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { questionBank } from "../../assets/staticData";

function getRandomQuestions(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function Quiz() {
  const [started, setStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const audioRef = useRef(null);

  // Track window size for confetti
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (started && !showResult) {
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, currentIndex, showResult]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (showResult) {
      const reaction = getReaction(score, quizQuestions.length);
      if (reaction.text === "Perfect" && audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [showResult]);

  function startQuiz() {
    const randomQs = getRandomQuestions(questionBank, 10);
    setQuizQuestions(randomQs);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setStarted(true);
  }

  function handleAnswer(option) {
    clearInterval(timerRef.current);
    if (option === quizQuestions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
    handleNextQuestion();
  }

  function handleNextQuestion() {
    clearInterval(timerRef.current);
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  }

  function getReaction(score, total) {
    const percentage = (score / total) * 100;
    if (percentage <= 30) {
      return { emoji: "😞", text: "Low" };
    } else if (percentage <= 60) {
      return { emoji: "🙂", text: "Average" };
    } else if (percentage <= 80) {
      return { emoji: "😃", text: "Good" };
    } else {
      return { emoji: "🥳", text: "Perfect" };
    }
  }

  if (!started && !showResult) {
    return (
      <div className="max-w-5xl mx-auto mt-20 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold">General Knowledge Quiz</h1>
        <Button onClick={startQuiz} size="lg">
          Start Quiz
        </Button>
      </div>
    );
  }

  if (showResult) {
    const reaction = getReaction(score, quizQuestions.length);
    const isPerfect = reaction.text === "Perfect";

    return (
      <div className="mt-10 flex flex-col items-center justify-center space-y-6 relative">
        {isPerfect && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={300}
            recycle={false}
            gravity={0.3}
          />
        )}
        <audio ref={audioRef} src="/cheer.mp3" />
        <h1 className="text-3xl font-semibold">Quiz Finished!</h1>
        <p className="text-xl">
          Your score: {score} / {quizQuestions.length}
        </p>
        <p className="text-5xl">{reaction.emoji}</p>
        <p className="text-2xl font-semibold">{reaction.text}</p>
        <Button onClick={startQuiz} size="lg">
          Restart Quiz
        </Button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentIndex];

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <p className="font-medium text-gray-700">
          Question {currentIndex + 1} / {quizQuestions.length}
        </p>
        <p className="font-semibold text-red-600">Time Left: {timeLeft}s</p>
      </div>
      <h2 className="mb-6 text-xl font-bold">{currentQuestion.question}</h2>
      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="w-full text-left"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
