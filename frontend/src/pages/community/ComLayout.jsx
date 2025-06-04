import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CommunityChat from "./ComChat";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";

function ComLayout() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [notJoinedCommunities, setNotJoinedCommunities] = useState([]);

  // const user = JSON.parse(localStorage.getItem("user"));

  // Create new Room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      setCreatingRoom(true);
      const res = await axios.post(
        `${API_URL}/community/create`,
        { name },
        {
          withCredentials: true,
        }
      );
      console.log(res?.data?.community);
      setJoinedCommunities((prev) => [...prev, res.data.community]);
      toast.success(res?.data.message || "Room created Succesfully");
      setName("");
      setDialogOpen(false);
    } catch (error) {
      toast.error(error?.response?.data.message || "Failed to create room!");
    } finally {
      setCreatingRoom(false);
    }
  };

  // Fetch both joined and not joined room
  const fetchRooms = async () => {
    try {
      setLoading(true);

      const [joinedRes, notJoinedRes] = await Promise.all([
        axios.get(`${API_URL}/community/my`, {
          withCredentials: true,
        }),
        axios.get(`${API_URL}/community/available`, {
          withCredentials: true,
        }),
      ]);

      setJoinedCommunities(joinedRes?.data || []);
      setNotJoinedCommunities(notJoinedRes?.data || []);
      setSelectedCommunity(null);
    } catch (error) {
      console.log("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [API_URL]);

  // Join Community
  const handleJoin = async (community) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/community/${community._id}/join`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success(`You have joined ${community.name}`);

      setJoinedCommunities((prev) => [...prev, community]);
      setNotJoinedCommunities((prev) =>
        prev.filter((c) => c._id !== community._id)
      );
    } catch (error) {
      toast.error(error?.response?.data.message || "Failed to join community.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[90vh] max-w-7xl mx-auto p-4">
      {/* Sidebar */}
      <div className="w-72 p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Communities</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6" onClick={() => setDialogOpen(true)}>
              <Plus /> Create New Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Room</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Room Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter a room name..."
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button disabled={creatingRoom} onClick={handleCreateRoom}>
                {creatingRoom ? (
                  <HashLoader size={20} color="white" />
                ) : (
                  " Create"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-700">
            Joined Rooms
          </h3>
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin flex mx-auto" />
          ) : (
            joinedCommunities.length === 0 && (
              <p className="text-sm text-gray-500 mb-4">
                No joined communities
              </p>
            )
          )}
          {joinedCommunities.map((community) => (
            <Card
              key={community._id}
              className={`mb-2 p-3 cursor-pointer truncate ${
                selectedCommunity?._id === community._id
                  ? "bg-blue-200"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setSelectedCommunity(community)}
            >
              {community.name}
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2 text-gray-700">
            Other Rooms
          </h3>
          {notJoinedCommunities.map((community) => (
            <Card key={community._id} className="mb-2 p-3">
              <div className="flex items-center justify-between">
                <span className="truncate">{community.name}</span>
                <Button
                  variant="outline"
                  disabled={loading}
                  size="sm"
                  onClick={() => handleJoin(community)}
                >
                  Join
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden">
        {selectedCommunity ? (
          <CommunityChat community={selectedCommunity} onUpdate={fetchRooms} />
        ) : (
          <div className="text-gray-400 h-full flex items-center justify-center text-lg">
            Select a community to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default ComLayout;
