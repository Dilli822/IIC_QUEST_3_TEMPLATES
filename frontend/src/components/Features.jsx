import React from "react";
import { features } from "@/assets/staticData";

function Features() {
  return (
    <div className="w-full p-8" id="features">
      <h1 className="text-3xl font-bold text-center">Our Features</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Discover the core strengths that make our platform reliable, fast, and
        user-friendly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <a
              key={index}
              href={feature.href}
              className="bg-white p-6 rounded-2xl shadow text-center hover:shadow-md hover:bg-gray-100 transition"
            >
              <div className="mb-4 flex justify-center">
                <Icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
