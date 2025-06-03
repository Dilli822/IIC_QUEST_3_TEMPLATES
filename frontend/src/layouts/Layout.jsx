import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function Layout() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (
      Notification.permission === "default" ||
      Notification.permission === "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      });
    }

    socket.on("pushNotification", (data) => {
      console.log("Received", data);

      // Native browser notification
      if (Notification.permission === "granted") {
        new Notification("New Notification", {
          body: data.message,
          icon: "http://via.placeholder.com/50",
        });
      }

      // App state update
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("pushNotification");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar notifications={notifications} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Layout;
