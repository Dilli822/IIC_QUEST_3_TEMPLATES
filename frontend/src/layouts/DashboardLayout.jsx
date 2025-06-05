import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  LayoutDashboard,
  LogOut,
  MonitorSmartphoneIcon,
} from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data?.message || "Logged out succesfully");
  //     navigate("/");
  //   }
  // }, [data?.message, isSuccess, navigate]);

  return (
    <div className="flex">
      <div className="hidden lg:flex flex-col justify-between  w-[200px] sm:w-[300px] border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 fixed h-screen">
        {/* Top Part */}
        <div>
          <Link to="/">
            <div className="flex items-center gap-2 mb-8">
              <figure className="h-[40px] w-[40px] flex justify-center items-center overflow-hidden">
                <img
                  src="/2.png"
                  alt="logo.png"
                  className="h-full w-full object-cover"
                />
              </figure>
              <h2 className="hidden md:block font-extrabold text-2xl">Logo</h2>
            </div>
          </Link>

          <div className="space-y-2">
            {/* Dashboard Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`
              }
            >
              <Home size={22} />
              <h1 className="text-base">Home</h1>
            </NavLink>
            <NavLink
              to=""
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`
              }
            >
              <LayoutDashboard size={22} />
              <h1 className="text-base">Dashboard</h1>
            </NavLink>
            <NavLink
              to="analytics"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`
              }
            >
              <MonitorSmartphoneIcon size={22} />
              <h1 className="text-base">Analytics</h1>
            </NavLink>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="space-y-3">
          {/* Profile Button */}
          <NavLink
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 "
          >
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user?.imageUrl}
                alt="@shadcn"
                className=" object-cover"
              />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{user?.name}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </NavLink>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut size={22} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-10 ml-60 p-2 w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
