import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Create chat session with internal date info in history
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "You are a helpful assistant. Be clear, concise, and polite." }],
    },
    {
      role: "model",
      parts: [{ text: "Sure, I'm here to help! What can I do for you?" }],
    },
    {
      role: "user",
      parts: [{ text: `Note: The current date is ${new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })}` }],
    }
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1024,
  },
});

const aiService = async (prompt) => {
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
};

export default aiService;
