import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { HashLoader } from "react-spinners";

function Report() {
  const [form, setForm] = useState({
    image: null,
    description: "",
    address: "",
    datetime: new Date().toISOString().slice(0, 16),
    name: "",
    contact: "",
    category: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({
      image: null,
      description: "",
      address: "",
      datetime: new Date().toISOString().slice(0, 16),
      name: "",
      contact: "",
      category: "",
    });
    setCaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("description", form.description);
    formData.append("address", form.address);
    formData.append("datetime", form.datetime);
    formData.append("name", form.name);
    formData.append("contact", form.contact);
    formData.append("category", form.category);
    formData.append("captcha", captchaToken); // Send token to backend for verification

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/report/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res?.data?.message || "Report submitted!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">📢 Report Waste Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">
              Upload Photo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">
              Location / Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="e.g., Near Sector 5 Park"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="datetime">When did you notice?</Label>
            <Input
              id="datetime"
              name="datetime"
              type="datetime-local"
              value={form.datetime}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-white text-sm"
            >
              <option value="">Select a category</option>
              <option value="Overflowing Bins">Overflowing Bins</option>
              <option value="Illegal Dumping">Illegal Dumping</option>
              <option value="Hazardous Waste">Hazardous Waste</option>
              <option value="Animal Waste">Animal Waste</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Optional"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact (Email or Phone)</Label>
            <Input
              id="contact"
              name="contact"
              placeholder="Optional"
              value={form.contact}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the issue..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <ReCAPTCHA
            sitekey="6LeKslUrAAAAAE0J-QlnOOe89_wLFY512KjYV_Cw"
            onChange={(token) => setCaptchaToken(token)}
            ref={recaptchaRef}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={!captchaToken || loading}
        >
          {loading ? <HashLoader size={20} color="white" /> : "Submit Report"}
        </Button>
      </form>
    </Card>
  );
}

export default Report;
