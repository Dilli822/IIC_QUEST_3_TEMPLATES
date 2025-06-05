import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Subscription from "@/components/Subscription";
import Tips from "@/components/Tips";
import socket from "@/lib/socket"; // Your socket.io client instance
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  const [notifications, setNotifications] = useState([]);
  const [isSubscriptionOpen, setSubscriptionOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // 1. Emit userOnline when connected
    if (user?._id) {
      if (socket.connected) {
        socket.emit("userOnline", user._id);
      } else {
        socket.on("connect", () => {
          socket.emit("userOnline", user._id);
        });
      }
    }

    // 2. Ask for notification permission
    if (
      Notification.permission === "default" ||
      Notification.permission === "denied"
    ) {
      Notification.requestPermission();
    }

    // 3. Listen for push notifications
    const handleNotification = (data) => {
      if (Notification.permission === "granted") {
        new Notification("New Notification", {
          body: data.message,
          icon: "http://via.placeholder.com/50",
        });
      }
      setNotifications((prev) => [...prev, data]);
    };

    socket.on("pushNotification", handleNotification);

    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("pushNotification", handleNotification);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        notifications={notifications}
        setSubscriptionOpen={setSubscriptionOpen}
      />

      {/* Conditionally render Subscription modal when isSubscriptionOpen is true */}
      {isSubscriptionOpen && (
        <Subscription onClose={() => setSubscriptionOpen(false)} />
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <Chatbot />
      <Tips />
    </div>
  );
}

export default Layout;
