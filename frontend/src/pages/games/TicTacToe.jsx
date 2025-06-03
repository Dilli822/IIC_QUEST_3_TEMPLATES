import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const initialBoard = Array(9).fill(null);

function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(null); // null at start
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Decide randomly who starts the game
  useEffect(() => {
    const randomStart = Math.random() < 0.5;
    setXIsNext(randomStart); // true: user, false: bot
  }, []);

  useEffect(() => {
    if (xIsNext === false && !winner) {
      const timeout = setTimeout(() => {
        makeBotMove();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, board, winner]);

  useEffect(() => {
    if (winner === "X") {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        resetGame();
      }, 3000);
    } else if (!winner && board.every((cell) => cell)) {
      setTimeout(resetGame, 2000);
    }
  }, [winner, board]);

  const handleClick = (index) => {
    if (board[index] || winner || xIsNext !== true) return;
    const nextBoard = [...board];
    nextBoard[index] = "X";
    setBoard(nextBoard);
    setXIsNext(false);
    const result = calculateWinner(nextBoard);
    setWinner(result);
  };

  const makeBotMove = () => {
    const bestMove = getBestMove(board);
    const nextBoard = [...board];
    nextBoard[bestMove] = "O";
    setBoard(nextBoard);
    setXIsNext(true);
    const result = calculateWinner(nextBoard);
    setWinner(result);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setShowConfetti(false);
    const randomStart = Math.random() < 0.5;
    setXIsNext(randomStart);
  };

  const status = winner
    ? `🎉 Winner: ${winner}`
    : board.every((cell) => cell)
    ? "🤝 It's a draw!"
    : xIsNext === null
    ? "Loading..."
    : xIsNext
    ? "Your move (X)"
    : "Bot is thinking...";


  return (
    <div className="space-y-4 text-center relative">
      <h2 className="text-xl font-bold">Tic Tac Toe vs Bot (Minimax)</h2>
      <div className="text-muted-foreground">{status}</div>

      {showConfetti && <Confetti width={width} height={height} />}

      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={clsx(
              "w-16 h-16 border rounded-lg text-2xl font-semibold",
              "hover:bg-accent transition-all",
              {
                "text-blue-600": cell === "X",
                "text-red-500": cell === "O",
              }
            )}
          >
            {cell}
          </button>
        ))}
      </div>

      <Button onClick={resetGame} variant="outline">
        🔁 Reset
      </Button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function getBestMove(board) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  const winner = calculateWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every((cell) => cell)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
}

export default TicTacToe;
