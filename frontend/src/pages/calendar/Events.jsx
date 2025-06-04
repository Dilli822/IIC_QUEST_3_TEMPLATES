// src/components/Events.jsx
import React from "react";

const events = {
  "2024-06": [
    "05: World Environment Day",        
    "08: Community Cleanup",             
    "15: Tree Plantation Drive"           
  ],
  "2024-07": [
    "03: Plastic Ban Awareness",          
    "13: Beach Cleanup"                   
  ],
  "2024-08": [
    "15: Independence Day Campaign"       
  ]
};

function Events({ monthKey }) {
  const monthEvents = events[monthKey] || [];

  return (
    <div className="w-full p-4 shadow-md rounded-lg border bg-white">
      <h3 className="text-lg font-semibold mb-2">
        📅 Events in {monthKey}
      </h3>
      {monthEvents.length > 0 ? (
        <ul className="list-disc list-inside text-sm space-y-1">
          {monthEvents.map((event, idx) => {
            // Split "day: eventName"
            const [day, ...eventNameParts] = event.split(":");
            const eventName = eventNameParts.join(":").trim();

            return (
              <li key={idx}>
                <span className="inline-block w-8 text-center font-bold text-white bg-blue-500 rounded mr-2">
                  {day}
                </span>
                <span>{eventName}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No events scheduled.</p>
      )}
    </div>
  );
}

export default Events;
