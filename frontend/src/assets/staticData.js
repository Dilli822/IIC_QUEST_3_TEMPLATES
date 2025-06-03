import { Code, MonitorSmartphone, ShieldCheck, Zap } from "lucide-react";

export const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all items. Products must be unused and in their original packaging to be eligible for a return.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3–7 business days depending on your location. You’ll receive a tracking number once your order is shipped.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and delivery times vary based on the destination country.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we’ll send you an email with the tracking information. You can also log in to your account to track your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, Apple Pay, and Google Pay for a fast and secure checkout experience.",
  },
];

export const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Well-structured and scalable.",
    href: "/f1",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description: "Works on all screen sizes.",
    href: "/f2",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Security is our priority.",
    href: "/f3",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Lightning-fast performance.",
    href: "/f4",
  },
];

export const disasters = [
  {
    id: "earthquake",
    name: "Earthquake",
    phases: {
      before: [
        "Make sure you have a fire extinguisher, first aid kit, a battery-powered radio, a flashlight, and extra batteries at home.",
        "Learn first aid.",
        "Learn how to turn off the gas, water, and electricity.",
        "Make up a plan of where to meet your family after an earthquake.",
        "Don't leave heavy objects on shelves (they'll fall during a quake).",
        "Anchor heavy furniture, cupboards, and appliances to the walls or floor.",
        "Learn the earthquake plan at your school or workplace.",
      ],
      during: [
        "Stay calm! If you're indoors, stay inside. If you're outside, stay outside.",
        "If indoors, stand near the center of the building, in a doorway, or under sturdy furniture. Stay away from windows and outside doors.",
        "If outdoors, move away from buildings, power lines, or anything that might fall.",
        "Don't use matches, candles, or any flame.",
        "If in a car, stop the car and stay inside until the shaking stops.",
        "Don't use elevators.",
      ],
      after: [
        "Check yourself and others for injuries. Provide first aid if needed.",
        "Check water, gas, and electric lines for damage and shut off valves if needed.",
        "If you smell gas, open windows, leave immediately, and report it.",
        "Turn on the radio for information. Don’t use phones unless it’s an emergency.",
        "Avoid damaged buildings and areas.",
        "Wear sturdy shoes to avoid injury from glass and debris.",
        "Stay away from beaches — tsunamis might follow.",
        "Expect aftershocks.",
      ],
    },
  },
  {
    id: "flood",
    name: "Flood",
    phases: {
      before: [
        "Know your area's flood risk and plan evacuation routes.",
        "Move important items and documents to higher ground.",
        "Prepare an emergency kit with essentials and waterproof containers.",
        "Listen to weather alerts and stay informed.",
        "Avoid building in flood-prone areas if possible.",
      ],
      during: [
        "Stay tuned to emergency channels for updates.",
        "Do not walk, swim, or drive through floodwaters.",
        "If advised to evacuate, do so immediately.",
        "Move to higher ground or the highest level of a building.",
        "Avoid bridges over fast-moving water.",
      ],
      after: [
        "Return home only when authorities say it's safe.",
        "Avoid floodwater — it may be contaminated or electrically charged.",
        "Clean and disinfect everything that got wet.",
        "Watch out for mold, insects, and debris.",
        "Document damage for insurance and assistance claims.",
      ],
    },
  },
  {
    id: "wildfire",
    name: "Wildfire",
    phases: {
      before: [
        "Clear dry leaves and flammable materials around your home.",
        "Create a defensible zone and trim tree branches near your roof.",
        "Prepare a go-bag and evacuation plan.",
        "Stay informed through alerts and warnings.",
        "Install smoke detectors and keep tools like hoses and rakes handy.",
      ],
      during: [
        "Evacuate immediately if ordered by authorities.",
        "Wear protective clothing and cover your nose with a wet cloth.",
        "Stay low to avoid inhaling smoke.",
        "Keep windows and doors closed, but unlocked if you're still at home.",
        "Turn on lights so firefighters can see your house in smoke.",
      ],
      after: [
        "Return home only when it's declared safe.",
        "Watch out for hot spots and embers.",
        "Check your home and property for damage and hazards.",
        "Avoid downed power lines and unstable structures.",
        "Document all damage and contact insurance.",
      ],
    },
  },
];
