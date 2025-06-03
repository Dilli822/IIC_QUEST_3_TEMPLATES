import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Bot, SendHorizonal, X } from "lucide-react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const bottomRef = useRef(null);

  // Auto scroll to the bottom on message or loading change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Clear chat and input on close
  const handleClose = () => {
    setOpen(false);
    setInput("");
    setMessages([{ role: "bot", content: "Hi! How can I help you today?" }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/post/chat`, { input });
      const botReply = res?.data?.reply || "Something went wrong.";
      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, there was an error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-5 z-50">
      {!open ? (
        <div
          onClick={() => setOpen(true)}
          className="bg-amber-400 border border-amber-700 rounded-full p-3 shadow-lg cursor-pointer float-delay"
        >
          <Bot className="w-7 h-7 text-black" />
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-xl w-[22rem] h-[28rem] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h4 className="text-base font-medium">Chatbot</h4>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" style={{ overflowY: "auto" }}>
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-sm p-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-100 ml-auto max-w-[75%]"
                      : "bg-gray-100 mr-auto max-w-[75%]"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <BeatLoader size={10} color="gray" />
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex items-end gap-2 border-t p-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="resize-none min-h-[36px] max-h-24"
            />
            <Button size="icon" onClick={handleSend} disabled={loading}>
              <SendHorizonal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
