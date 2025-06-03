import React, { useState } from "react";
import Sentiment from "sentiment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sentiment = new Sentiment();

const moodEmojis = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  anxious: "😰",
  bored: "😐",
  neutral: "🙂",
};

const responses = {
  happy: "I'm so glad to hear that!",
  sad: "I'm here for you. Want to talk about it?",
  angry: "That sounds frustrating. Take a deep breath.",
  anxious: "Let's take a calming breath together.",
  bored: "Want to play a game or hear a fun fact?",
  neutral: "Tell me more!",
};

export default function MoodChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("neutral");

  const analyzeMood = (text) => {
    const result = sentiment.analyze(text);
    const score = result.score;
    if (score > 3) return "happy";
    if (score < -3) return "angry";
    if (score < 0) return "sad";
    if (score === 0) return "bored";
    return "neutral";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    const detectedMood = analyzeMood(input);
    setMood(detectedMood);

    const botMessage = {
      from: "bot",
      text: responses[detectedMood] || responses["neutral"],
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col mt-5 md:flex-row h-[80vh]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Mood Chat Bot</h2>
        <div className="flex-1 overflow-y-auto space-y-2 bg-muted p-3 rounded-xl">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-[70%] ${
                msg.from === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>

      {/* Mood Display */}
      <div className="w-full md:w-1/3 bg-white p-6 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">{moodEmojis[mood]}</div>
        <h3 className="text-2xl font-semibold capitalize">Mood: {mood}</h3>
        <p className="text-muted-foreground mt-2">
          The bot reacts based on how you feel 💬
        </p>
      </div>
    </div>
  );
}
