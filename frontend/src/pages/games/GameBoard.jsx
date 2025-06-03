// components/FeelingBored.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TicTacToe from "./TicTacToe";
import FunFacts from "../FunFacts";
import QuizTrivia from "./QuizTrivia";
import { Gamepad2, Lightbulb, HelpCircle } from "lucide-react";

const items = [
  {
    key: "tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Play against a smart bot!",
    icon: <Gamepad2 className="w-12 h-12 text-blue-500" />,
  },
  {
    key: "fun-fact",
    name: "Fun Facts",
    description: "Learn something random!",
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
  },
  {
    key: "quiz",
    name: "Trivia Quiz",
    description: "Test your brain with quick questions!",
    icon: <HelpCircle className="w-12 h-12 text-purple-600" />,
  },
];

function GameBoard() {
  const [active, setActive] = useState(null);

  return (
    <div className="text-center space-y-6 py-10">
      <h1 className="text-3xl font-bold">Feeling Bored?</h1>
      <p className="text-muted-foreground">Pick something fun to do!</p>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-6">
        {items.map((item) => (
          <div
            key={item.key}
            className="border rounded-2xl p-6 shadow-md flex flex-col items-center space-y-4 hover:shadow-xl transition"
          >
            {item.icon}
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <Button onClick={() => setActive(item.key)}>Play</Button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        {active === "fun-fact" && <FunFacts />}
        {active === "tic-tac-toe" && <TicTacToe />}
        {active === "quiz" && <QuizTrivia />}
      </div>
    </div>
  );
}

export default GameBoard;
