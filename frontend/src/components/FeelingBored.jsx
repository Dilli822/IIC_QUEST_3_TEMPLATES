import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function FeelingBored() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-purple-600 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between mb-5 space-y-4 sm:space-y-0">
      <div>
        <h2 className="text-2xl font-bold">Feeling Bored?</h2>
        <p className="text-sm mt-2">
          Take a quick break! Play Tic Tac Toe, explore fun facts, or test your
          brain with a trivia quiz.
        </p>
      </div>
      <Button
        variant="outline"
        className="bg-white text-black px-5 py-2 font-semibold transform hover:scale-105 transition duration-300"
        onClick={() => navigate("/games")}
      >
        Explore Fun
      </Button>
    </div>
  );
}

export default FeelingBored;
