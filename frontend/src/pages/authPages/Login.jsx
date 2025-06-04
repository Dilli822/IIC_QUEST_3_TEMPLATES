import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft, Eye, EyeOff, Fingerprint, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const toggleView = () => setShowPassword(!showPassword);
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(inputs);
    if (res.success) {
      navigate("/");
    } else {
      console.log(res.error);
    }
  };
  return (
    <div className="w-[400px] mx-auto shadow-lg p-8 rounded-md relative">
      <h1 className="text-3xl font-bold text-center mt-2">Welcome back</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Please log in to access your account and continue your journey with us.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mt-4">
          <Mail />
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center gap-2 mt-4 relative">
          <Fingerprint />

          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create your Password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <p className="cursor-pointer bg-white flex justify-end pl-2 mr-2 absolute right-0">
            {showPassword ? (
              <span onClick={toggleView}>
                <Eye size={20} />
              </span>
            ) : (
              <span onClick={toggleView}>
                <EyeOff size={20} />
              </span>
            )}
          </p>
        </div>
        {/* <div className="flex items-center gap-8 mt-4">
        <Label htmlFor="role">Role :</Label>
        <RadioGroup name="role" className="flex items-center gap-5">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="role1" id="r1" />
            <Label htmlFor="r1">Role1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="role2" id="r2" />
            <Label htmlFor="r2">Role2</Label>
          </div>
        </RadioGroup>
      </div> */}
        <Button disabled={loading} className="w-full mt-8" type="submit">
          {loading ? <HashLoader size={20} color="white" /> : " Login"}
        </Button>
      </form>
      <Link to="/auth/forgot-password">
        {" "}
        <p className="text-sm hover:underline cursor-pointer text-center mt-2">
          Forget password?
        </p>
      </Link>

      <p className="text-sm text-center mt-2">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register">
          <span className="font-semibold hover:underline hover:text-blue-400 cursor-pointer">
            Sign Up
          </span>
        </Link>
      </p>
      <Button className="absolute top-2 left-2" onClick={() => navigate("/")}>
        <ChevronLeft />
      </Button>
    </div>
  );
}

export default Login;
