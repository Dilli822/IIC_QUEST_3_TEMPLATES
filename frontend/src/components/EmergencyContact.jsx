import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function EmergencyContact() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-red-600 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between mb-5 space-y-4 sm:space-y-0">
      <div>
        <h2 className="text-2xl font-bold">Emergency Contacts & Support</h2>
        <p className="text-sm mt-2">
          Access critical contact numbers for fire, police, ambulance, disaster
          response, and more—especially useful in case of natural disasters or
          emergencies.
        </p>
      </div>
      <Button
        variant="outline"
        className="bg-white text-black px-5 py-2 font-semibold transform hover:scale-105 transition duration-300"
        onClick={() => navigate("/emergency")}
      >
        View Now
      </Button>
    </div>
  );
}

export default EmergencyContact;
