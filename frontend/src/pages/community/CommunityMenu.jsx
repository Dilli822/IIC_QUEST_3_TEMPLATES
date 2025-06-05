import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, MoreVertical, Trash2, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_API_URL, { withCredentials: true });

const CommunityMenu = ({ community, onUpdate }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?._id === String(community?.owner?._id);
  const API_URL = import.meta.env.VITE_API_URL;

  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  // const [onlineUsers, setOnlineUsers] = useState([]);

  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch members
  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/community/${community._id}/members`,
        {
          withCredentials: true,
        }
      );
      setMembers(res.data);
      setShowMembers(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch members");
    }
  };

  // Socket setup
  // useEffect(() => {
  //   socket.emit("join-community", community._id);
  //   socket.on("online-users", (onlineUserIds) => {
  //     setOnlineUsers(onlineUserIds);
  //   });

  //   return () => {
  //     socket.emit("leave-community", community._id);
  //     socket.off("online-users");
  //   };
  // }, [community._id]);

  const handleDeleteCommunity = async () => {
    try {
      await axios.delete(`${API_URL}/community/${community._id}`, {
        withCredentials: true,
      });
      toast.success("Community deleted successfully");
      onUpdate?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete community");
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      await axios.post(
        `${API_URL}/community/${community._id}/leave`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Left the community");
      onUpdate?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to leave community");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-0">
          <Button variant="ghost">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {isOwner ? (
            <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
              Delete <Trash2 className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setShowLeaveDialog(true)}>
              Leave <LogOut className="ml-auto w-4 h-4" />
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={fetchMembers}>
            Members <Users className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Members Dialog */}
      <Dialog open={showMembers} onOpenChange={setShowMembers}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Community Members</DialogTitle>
            <DialogDescription>
              Members of <strong>{community?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {members.map((m) => {
              const isAdmin = m._id === community?.owner?._id;
              // const isOnline = onlineUsers.includes(m._id);

              return (
                <div key={m._id} className="flex items-center gap-3">
                  {/* <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  /> */}
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{m.name}</span>
                    {isAdmin && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Community?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave <strong>{community?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleLeaveCommunity();
                setShowLeaveDialog(false);
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Community?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete{" "}
              <strong>{community?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteCommunity();
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CommunityMenu;
