import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User2, FileTextIcon } from "lucide-react";

function OtherProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data.user); // Adjust if your API response differs
      } catch (error) {
        toast.error("Failed to load user profile");
        console.error(error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleMessageClick = async () => {
    if (user?._id === currentUserId) {
      toast.error("You cannot chat with yourself.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/chat/add-friend/${user._id}`,
        {},
        { withCredentials: true }
      );

      navigate(`/chat/${user._id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add friend or open chat.");
    }
  };

  if (!user) return <p>Loading...</p>;

  const isOwnProfile = user._id === currentUserId;

  return (
    <div className="p-6 flex justify-center">
      <Card className="flex flex-row w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden">
        {/* Left: Avatar */}
        <div className="flex flex-col items-center justify-center bg-muted px-6 py-8 w-1/3">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.imageUrl} className="object-cover" />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <p className="mt-4 text-lg font-semibold">{user.name}</p>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between w-2/3 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>Profile Overview</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 p-0">
            <div className="flex items-center gap-3">
              <User2 className="w-5 h-5 text-muted-foreground" />
              <span>{user.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span>{user.phone || "N/A"}</span>
            </div>

            <div className="flex items-start gap-3">
              <FileTextIcon className="w-5 h-5 text-muted-foreground mt-1" />
              <p className="whitespace-pre-wrap">
                {user.bio || "No bio provided."}
              </p>
            </div>
          </CardContent>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleMessageClick}
              disabled={isOwnProfile}
              title={isOwnProfile ? "You cannot message yourself" : ""}
            >
              Message
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OtherProfile;
