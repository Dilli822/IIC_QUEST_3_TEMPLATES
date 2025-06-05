import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, MessageSquarePlus, MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const Feed = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/post/posts`, {
          withCredentials: true,
        });
        setPosts(res.data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);

  const handleReplyChange = (postId, text) => {
    setReplyTexts((prev) => ({ ...prev, [postId]: text }));
  };

  const handleReplySubmit = async (postId) => {
    const msg = replyTexts[postId];
    if (!msg?.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/post/${postId}/reply`,
        { msg },
        { withCredentials: true }
      );

      const updatedPost = await axios.get(`${API_URL}/post/${postId}`, {
        withCredentials: true,
      });

      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? updatedPost.data.post : p))
      );

      setReplyTexts((prev) => ({ ...prev, [postId]: "" }));
      setOpenDialog(null);
      toast.success(res?.data.message);
    } catch (error) {
      console.error("Reply error:", error);
      toast.error(error?.response?.data?.message || "Reply failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {posts.length === 0 && !loading && (
        <div className="text-center text-gray-500">No posts available.</div>
      )}

      {posts.map((post) => {
        const isOpen = openReplyId === post._id;
        const replyText = replyTexts[post._id] || "";
        const currentUser = JSON.parse(localStorage.getItem("user"));

        return (
          <Card key={post._id} className="w-full rounded-2xl shadow p-4">
            <div
              className="flex items-center gap-3 mb-2 cursor-pointer"
              onClick={() => {
                if (post.author?._id === currentUser?._id) {
                  navigate("/profile");
                } else {
                  navigate(`/user/${post.author?._id}`);
                }
              }}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={post?.author?.imageUrl}
                  className="object-cover"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <p className="font-medium text-sm text-gray-800">
                {post.author?.name || "Unknown"}
              </p>
            </div>

            <CardHeader className="px-0">
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription className="text-gray-600">
                {post.content}
              </CardDescription>
            </CardHeader>

            <Separator />

            <Collapsible
              open={isOpen}
              onOpenChange={() => setOpenReplyId(isOpen ? null : post._id)}
            >
              <CardFooter className="flex justify-between items-center px-0">
                <div className="flex items-center space-x-4">
                  <Dialog
                    open={openDialog === post._id}
                    onOpenChange={(open) =>
                      setOpenDialog(open ? post._id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MessageSquarePlus className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Post a Reply</DialogTitle>
                        <DialogDescription>Share your thoughts.</DialogDescription>
                      </DialogHeader>
                      <Textarea
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) =>
                          handleReplyChange(post._id, e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                      <DialogFooter>
                        <Button
                          onClick={() => handleReplySubmit(post._id)}
                          disabled={loading}
                        >
                          Submit Reply
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MessagesSquare className="h-4 w-4 mr-1" />
                      View Replies
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </CardFooter>

              <CollapsibleContent className="space-y-2 mt-3">
                {post.replies && post.replies.length > 0 ? (
                  post.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="rounded-md border px-3 py-2 bg-gray-50 text-sm text-gray-700"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={reply?.user.imageUrl}
                            className="object-cover"
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-sm text-gray-800">
                          {reply?.user.name || "Anonymous"}
                        </p>
                      </div>
                      <div className="pl-12">{reply.msg}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No replies yet.</p>
                )}
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}

      {loading && <Loader2 className="h-8 w-8 animate-spin mx-auto" />}
    </div>
  );
};

export default Feed;
