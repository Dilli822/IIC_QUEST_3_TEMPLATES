import React, { useState, useEffect, useRef } from "react";
import socket from "@/lib/socket";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";

function PersonalChat({ otherUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const roomId = [user._id, otherUser._id].sort().join("_");

  useEffect(() => {
    if (!otherUser?._id) return;

    socket.emit("joinRoom", roomId);
    fetchMessages();

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  useEffect(() => {
    const handleIncoming = (msg) => {
      setMessages((prev) => [...prev, formatMessage(msg)]);
    };

    socket.on("messageReceived", handleIncoming);
    return () => socket.off("messageReceived", handleIncoming);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/messages/${otherUser._id}`, {
        withCredentials: true,
      });
      const formatted = res.data.map(formatMessage);
      setMessages(formatted);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages.");
    }
  };

  const formatMessage = (msg) => ({
    ...msg,
    senderId: msg.sender._id,
    name: msg.sender.name,
    imageUrl: msg.sender.imageUrl,
    content: msg.message,
    time: new Date(msg.createdAt).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  });

  const handleSend = async () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    try {
      const res = await axios.post(
        `${API_URL}/chat/send`,
        {
          recipientId: otherUser._id,
          content: trimmed,
        },
        { withCredentials: true }
      );

      const fullMessage = {
        ...res.data,
        sender: user,
      };

      socket.emit("newMessage", fullMessage, roomId);
      setNewMessage("");
    } catch (error) {
      console.log(error);
      toast.error("Message failed to send.");
    }
  };

  return (
    <Card className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={otherUser.imageUrl} className="object-cover" />
          <AvatarFallback>{otherUser.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{otherUser.name}</h2>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 border rounded-md p-4 overflow-y-auto mb-4"
      >
        {messages.map((msg, idx) => {
          const isYou = msg.senderId === user._id;
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 mb-4 ${
                isYou ? "justify-end" : "justify-start"
              }`}
            >
              {!isYou && (
                <Avatar>
                  <AvatarImage src={msg.imageUrl} className="object-cover" />
                  <AvatarFallback>{msg.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              )}
              <div className={isYou ? "text-right" : "text-left"}>
                <div
                  className={`rounded-xl px-4 py-2 max-w-xs ${
                    isYou ? "bg-blue-500 text-white" : "bg-muted"
                  }`}
                >
                  {!isYou && <p className="font-semibold">{msg.name}</p>}
                  <p className="text-sm">{msg.content}</p>
                </div>
                <div
                  className={`text-xs mt-1 ${
                    isYou ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
              {isYou && (
                <Avatar>
                  <AvatarImage src={user.imageUrl} className="object-cover" />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
}

export default PersonalChat;
