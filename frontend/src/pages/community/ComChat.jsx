import React, { useState, useEffect, useRef } from "react";
import socket from "@/lib/socket"; // Adjust path if needed
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";

function ComChat({ community }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  user._id = String(user._id); // Ensure consistent type

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Join room and fetch messages when community changes
  useEffect(() => {
    if (!community?._id) return;

    socket.emit("joinRoom", community._id);
    fetchMessages();

    return () => {
      socket.emit("leaveRoom", community._id);
    };
  }, [community?._id]);

  // Fetch past messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/community/${community._id}/messages`,
        { withCredentials: true }
      );
      const formatted = res.data.map((msg) => formatMessage(msg));
      setMessages(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load messages.");
    }
  };

  // Normalize message structure
  const formatMessage = (msg) => {
    const sender = msg.sender || msg.senderId || msg.user;
    const senderObj =
      typeof sender === "object" ? sender : { _id: sender, name: msg.name };

    return {
      ...msg,
      senderId: String(senderObj._id),
      name: senderObj.name,
      content: msg.content,
      time: dayjs(msg.createdAt).format("MMM D, YYYY • h:mm A"),
    };
  };

  // Handle incoming message from socket
  useEffect(() => {
    const handleIncoming = (msg) => {
      setMessages((prev) => [...prev, formatMessage(msg)]);
    };

    socket.on("messageReceived", handleIncoming);
    return () => socket.off("messageReceived", handleIncoming);
  }, []);

  // Send message
 const handleSend = async (e) => {
  e.preventDefault();
  const trimmedMessage = newMessage.trim();
  if (!trimmedMessage) return;

  try {
    const res = await axios.post(
      `${API_URL}/community/message/send`,
      {
        communityId: community._id,
        content: trimmedMessage,
      },
      { withCredentials: true }
    );

    // Emit to socket only — don't manually append
    socket.emit("newMessage", res.data, community._id);

    setNewMessage("");
  } catch (error) {
    console.error(error);
    toast.error("Message failed to send.");
  }
};


  // Delete community
  const handleDeleteCommunity = async () => {
    try {
      await axios.delete(`${API_URL}/community/${community._id}`, {
        withCredentials: true,
      });
      toast.success("Community deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete community");
    }
  };

  return (
    <Card className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{community?.name || "Community"}</h2>

        {user._id === String(community.owner?._id) && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-0">
              <Button variant="ghost">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuItem onClick={handleDeleteCommunity}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Chat Messages */}
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
                  <AvatarImage
                    src={
                      msg.sender?.imageUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        msg.name || "U"
                      )}`
                    }
                  />
                  <AvatarFallback>
                    {msg.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={isYou ? "text-right" : "text-left"}>
                <div
                  className={`rounded-xl px-4 py-2 max-w-xs ${
                    isYou ? "bg-blue-500 text-white" : "bg-muted"
                  }`}
                >
                  {!isYou && <p className="font-semibold">{msg?.name}</p>}
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
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form className="flex gap-2" onSubmit={handleSend}>
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}

export default ComChat;
