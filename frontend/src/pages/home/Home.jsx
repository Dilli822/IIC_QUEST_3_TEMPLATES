import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import React from "react";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import JoinDiscussion from "@/components/JoinDiscussion";
import EmergencyContact from "@/components/EmergencyContact";
import FeelingBored from "@/components/FeelingBored";

function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col p-5 md:p-0">
      <Hero />
      <Features />
      <EmergencyContact />
      <FAQ />
      <JoinDiscussion />
      <Contact />
      <FeelingBored />
    </div>
  );
}

export default Home;
