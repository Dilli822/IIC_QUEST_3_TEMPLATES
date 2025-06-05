import React from "react";
import Lottie from "lottie-react";
import heroAnimation from "@/assets/lottie/hero.json";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <div className="w-full h-[350px] flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Text  */}
      <div className="w-full md:w-1/2 p-8 flex flex-col space-y-6">
        <h1 className="text-4xl font-extrabold">Welcome to Our Platform</h1>
        <h2 className="text-4xl font-semibold">
          <Typewriter
            words={["Search projects", "Find users", "Explore insights"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1500}
          />
        </h2>

        <p className="text-gray-600 text-sm max-w-md">
          Discover amazing content and explore new opportunities with us. Use
          the search below to get started.
        </p>
        <div className="flex items-center justify-between gap-2 relative max-w-md">
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-full pl-6 pr-26 h-14 shadow-lg w-full"
          />
          <Button className="rounded-full h-10 absolute right-2 px-4">
            <Search /> Search
          </Button>
        </div>
      </div>

      {/* Image (hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <Lottie
          animationData={heroAnimation}
          loop={true}
          className="w-full h-70"
        />
      </div>
    </div>
  );
}

export default Hero;
