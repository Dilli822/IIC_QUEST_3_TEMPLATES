import React, { useState } from "react";
import { disasters } from "@/assets/staticData";

function Guidance() {
  const [selectedDisaster, setSelectedDisaster] = useState(disasters[0]);

  const scrollToDisaster = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 scroll-smooth">
      {/* Top Navigation */}
      <header className="bg-white sticky top-0 z-10 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center items-center flex-wrap gap-2">
          {disasters.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                setSelectedDisaster(d);
                scrollToDisaster(d.id);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                selectedDisaster.id === d.id
                  ? " text-blue-500"
                  : " hover:bg-blue-100 text-gray-800"
              }`}
            >
              {d.name}
            </div>
          ))}
        </div>
      </header>

      {/* Disaster Guidance Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {disasters.map((disaster) => (
          <section key={disaster.id} id={disaster.id} className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6  text-gray-800">
              <span className="text-amber-500">{disaster.name}</span> Safety Guide
              <span className="block mt-2 w-10 h-1 bg-amber-600 rounded-full"></span>
            </h2>

            {["before", "during", "after"].map((phase) => (
              <div
                key={phase}
                className="mb-10 bg-gray-50 rounded-lg shadow-sm p-6"
              >
                <h3 className="text-2xl font-semibold capitalize mb-4 text-blue-700">
                  What to Do{" "}
                  {phase === "before"
                    ? "Before"
                    : phase === "during"
                    ? "During"
                    : "After"}{" "}
                  an {disaster.name}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
                  {disaster.phases[phase].map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}

export default Guidance;
