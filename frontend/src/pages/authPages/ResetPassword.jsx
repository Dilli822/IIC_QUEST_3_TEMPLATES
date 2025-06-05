import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { HashLoader } from "react-spinners";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );
      toast.success(res?.data.message || "Password reset successfully");
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto shadow-lg p-8 rounded-md relative">
      <h1 className="text-3xl font-bold text-center">Reset Password</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Enter a new password for your account.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mt-4">
          <Fingerprint />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
        </div>

        <Button className="w-full mt-8" disabled={loading} type="submit">
          {loading ? (
            <HashLoader size={20} color="white" />
          ) : (
            "Set New Password"
          )}
        </Button>
      </form>
      <Button className="absolute top-2 left-2" onClick={() => navigate("/")}>
        <ChevronLeft />
      </Button>
    </div>
  );
}

export default ResetPassword;
