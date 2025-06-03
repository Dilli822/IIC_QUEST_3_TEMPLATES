import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="box flex flex-col min-h-screen items-center pt-20">
      <Outlet />

      <div className="wave wave1 "></div>
      <div className="wave wave2"></div>
      <div className="wave wave3 "></div>
      <div className="wave wave4"></div>
    </div>
  );
}

export default AuthLayout;
15;
