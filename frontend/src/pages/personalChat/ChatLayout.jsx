import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PersonalChat from "./PersonalChat";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChatLayout() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const { otherUserId } = useParams();

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/chat/users/${user._id}`, {
          withCredentials: true,
        });
        setChatUsers(res.data);
      } catch (error) {
        console.error("Error fetching chat users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatUsers();
  }, [API_URL, user._id]);

  useEffect(() => {
    if (!otherUserId) return;

    // Disable chat with self
    if (otherUserId === user._id) {
      setSelectedUser(null);
      return;
    }

    // Check if user already in chat list
    const existingUser = chatUsers.find((u) => u._id === otherUserId);
    if (existingUser) {
      setSelectedUser(existingUser);
    } else {
      // Fetch user and add to chat list
      const fetchAndAddUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${API_URL}/user/${otherUserId}`, {
            withCredentials: true,
          });
          const newUser = res.data.user;
          setChatUsers((prev) => [...prev, newUser]);
          setSelectedUser(newUser);
        } catch (error) {
          console.error("Failed to fetch selected user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAndAddUser();
    }
  }, [API_URL, otherUserId, chatUsers, user._id]);

  return (
    <div className="flex h-[90vh] max-w-7xl mx-auto p-4">
      {/* Sidebar */}
      <div className="w-72 p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>

        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-700">
            Your Chats
          </h3>
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin flex mx-auto" />
          ) : chatUsers.length === 0 ? (
            <p className="text-sm text-gray-500 mb-4">No chats yet</p>
          ) : (
            chatUsers.map((userItem) => (
              <div
                key={userItem._id}
                className={`mb-2 p-2 cursor-pointer flex items-center gap-3 rounded-md ${
                  selectedUser?._id === userItem._id
                    ? "bg-blue-200"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setSelectedUser(userItem)}
              >
                <img
                  src={userItem.imageUrl}
                  alt={userItem.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="truncate">{userItem.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6 overflow-hidden">
        {otherUserId === user._id ? (
          <div className="text-red-500 text-center text-lg">
            You cannot chat with yourself.
          </div>
        ) : selectedUser ? (
          <PersonalChat otherUser={selectedUser} />
        ) : (
          <div className="text-gray-400 h-full flex items-center justify-center text-lg">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatLayout;
