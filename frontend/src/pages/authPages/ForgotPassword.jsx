import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/auth/forgot-password`,
        { email },
        {
          withCredentials: true,
        }
      );
      toast.success(res?.data.message || "Reset link sent to your email");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto shadow-lg p-8 rounded-md mt-10 relative">
      <h1 className="text-3xl font-bold text-center">Forgot Password ?</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Enter your registered email address and we'll send you a link to reset
        your password.
      </p>

      <div className="flex items-center gap-2 mt-4">
        <Mail />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
      </div>

      <Button disabled={loading} className="w-full mt-8" onClick={handleSubmit}>
        {loading ? <HashLoader size={20} color="white" /> : "Send Reset Link"}
      </Button>
      <Button className="absolute top-2 left-2" onClick={() => navigate("/")}>
        <ChevronLeft />
      </Button>
    </div>
  );
}

export default ForgotPassword;
