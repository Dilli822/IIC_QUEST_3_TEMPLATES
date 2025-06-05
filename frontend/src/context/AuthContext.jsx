import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [loading, setLoading] = useState(false);

  const login = async (inputs) => {
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, inputs, {
        withCredentials: true,
      });
      setUser(res?.data.user);
      localStorage.setItem("user", JSON.stringify(res?.data.user));
      toast.success(res?.data?.message || "Logged in Succesfully");
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error?.response?.data.message || "Failed to login!");
      return {
        success: false,
        error: error?.response?.data?.message || "Failed to login",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("user");
      toast.success(res?.data.message || "Logged out succesfully");
      return res;
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      localStorage.removeItem("user");
      toast.success(error?.response?.data.message || "Failed to logout!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
