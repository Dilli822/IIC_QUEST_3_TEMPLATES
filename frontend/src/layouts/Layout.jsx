import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Subscription from "@/components/Subscription";
import Tips from "@/components/Tips";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function Layout() {
  const [notifications, setNotifications] = useState([]);
  const [isSubscriptionOpen, setSubscriptionOpen] = useState(false);

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
      <Navbar
        notifications={notifications}
        setSubscriptionOpen={setSubscriptionOpen}
      />
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
