import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HashLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

function CreatePost() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/post/create-post`, inputs, {
        withCredentials: true,
      });
      toast.success(res?.data?.message || "Post created succesfully");
      setInputs({ title: "", content: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data?.message || "Failed to create post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 p-4 flex items-center justify-center sticky top-4 z-10">
      <Card className="w-full rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              type="text"
              value={inputs.content}
              onChange={handleChange}
              rows={5}
              placeholder="Write your post content here..."
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button disabled={loading} className="w-full" onClick={handleSubmit}>
            {loading ? <HashLoader size={20} color="white" /> : "Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreatePost;
