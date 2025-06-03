import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User2, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Lottie from "lottie-react";
import contactAnimation from "@/assets/lottie/contactLottie.json";

function Contact() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.email || !inputs.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/user/contact`, inputs);
      toast.success("Message sent successfully!");
      setInputs({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8" id="contact">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        We'd love to hear from you! Please fill out the form below.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Hide Lottie on small screens */}
        <div className="hidden sm:flex w-1/2 items-center justify-center">
          <Lottie
            animationData={contactAnimation}
            loop={true}
            style={{
              width: 400,
              height: 400,
              backdropFilter: "none",
            }}
          />
        </div>

        <div className="w-full sm:w-1/2 flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <User2 />
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={inputs.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Mail />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Phone />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={inputs.phone}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start gap-2">
            <MessageCircle className="mt-2" />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={inputs.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button disabled={loading} onClick={handleSubmit} className="w-full md:w-28">
              {loading ? (
                <HashLoader size={20} color="white" />
              ) : (
                <>
                  Send <Send />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
