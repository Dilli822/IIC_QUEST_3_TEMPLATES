import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { HashLoader } from "react-spinners";

function VerifyEmail() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/auth/verify-email`,
        { code },
        {
          withCredentials: true,
        }
      );
      toast.success(res?.data.message || "Verification succesfull");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto shadow-lg p-8 rounded-md">
      <h1 className="text-3xl font-bold text-center">Verify Your Email</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Please enter the verification code sent to your email address.
      </p>

      <form onSubmit={handleVerify}>
        <div className="flex items-center gap-2 mt-4">
          <KeyRound />
          <Input
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
          />
        </div>

        <Button disabled={loading} className="w-full mt-8" type="submit">
          {loading ? <HashLoader size={20} color="white" /> : "Verify"}
        </Button>
      </form>
    </div>
  );
}

export default VerifyEmail;
