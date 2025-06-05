import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PhoneCall,
  AlertTriangle,
  Ambulance,
  Flame,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const emergencyContacts = [
  {
    title: "Police",
    icon: <ShieldCheck className="text-blue-600 w-12 h-12" />,
    number: "100",
    description: "Call in case of theft, violence, or criminal activity.",
  },
  {
    title: "Ambulance",
    icon: <Ambulance className="text-red-600 w-12 h-12" />,
    number: "102",
    description: "Call for medical emergencies and patient transport.",
  },
  {
    title: "Traffic Police",
    icon: <ShieldCheck className="text-yellow-400 w-12 h-12" />,
    number: "1199",
    description: "Call for medical emergencies and patient transport.",
  },
  {
    title: "Fire Brigade",
    icon: <Flame className="text-orange-500 w-12 h-12" />,
    number: "101",
    description: "For fire incidents or rescue operations.",
  },
  {
    title: "Disaster Relief",
    icon: <AlertTriangle className="text-yellow-500 w-12 h-12" />,
    number: "1149",
    description: "Disaster response support (earthquake, flood, etc).",
  },
  {
    title: "Child Helpline",
    icon: <PhoneCall className="text-green-600 w-12 h-12" />,
    number: "1098",
    description: "Support for children in need or danger.",
  },
];

function Emergency() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", 
    });
  }, [location]);
  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="bg-red-600 text-white p-8 rounded-2xl shadow-lg mb-8 text-center">
        <h1 className="text-3xl font-bold">Emergency Contacts in Nepal</h1>
        <p className="text-sm mt-2">
          Always stay prepared. Use these numbers for help during critical
          situations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {emergencyContacts.map((contact, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <CardContent className="p-6 flex flex-col items-center justify-between space-y-4 h-full">
              <div>{contact.icon}</div>
              <h3 className="text-lg font-semibold">{contact.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">
                {contact.description}
              </p>
              <Button
                asChild
                variant="outline"
                className="text-red-600 font-bold hover:scale-105 transition mt-auto"
              >
                <a href={`tel:${contact.number}`}>
                  <Phone /> {contact.number}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Emergency;
