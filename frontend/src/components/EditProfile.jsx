import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, Mail, Phone, User2 } from "lucide-react";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { toast } from "sonner";

function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    imageUrl: "",
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/profile`, {
          withCredentials: true,
        });
        setInputs(res?.data.user);
        setOriginalProfile(res?.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [API_URL]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    if (originalProfile) {
      setInputs(originalProfile);
      setFile(null); // optional: clear selected file
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setInputs((prev) => ({
      ...prev,
      imageUrl: URL.createObjectURL(selected),
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", inputs.name);
      formData.append("phone", inputs.phone);
      formData.append("bio", inputs.bio);

      if (file) {
        formData.append("imageUrl", file);
      }

      const res = await axios.put(`${API_URL}/user/profile/update`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res?.data.message || "Profile Updated succesfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data.message || "Failed to update Profile!");
    } finally {
      setLoading(false);
    }
  };

  const isUnchanged =
    JSON.stringify(inputs) === JSON.stringify(originalProfile);

  return (
    <div className="w-96 p-4 flex items-center justify-center">
      <Card className="w-full rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Don&apos;t forgot to save after change.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={inputs.imageUrl}
              alt="profile"
              className="w-[150px] h-[150px] rounded-md object-cover"
            />

            <Button className="h-5 w-25 mt-1" onClick={handleImageClick}>
              <span className="text-xs">Change Image</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <User2 />
            <Input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={inputs.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center gap-2 mt-4 ">
            <Mail />
            <Input
              type="email"
              name="email"
              readOnly
              value={inputs.email}
              onChange={handleChange}
              required
              className="cursor-not-allowed"
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Phone />
            <Input
              type="number"
              name="phone"
              placeholder="Enter your phone no."
              value={inputs.phone}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <FileTextIcon />
            <Textarea
              type="text"
              name="bio"
              placeholder="Enter your bio"
              value={inputs.bio}
              onChange={handleChange}
              row={4}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleCancel}
            disabled={isUnchanged}
          >
            Cancel
          </Button>
          <Button disabled={loading} className="w-full" onClick={handleSave}>
            {loading ? <HashLoader size={20} color="white" /> : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default EditProfile;
