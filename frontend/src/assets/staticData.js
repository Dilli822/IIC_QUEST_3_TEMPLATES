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

export const questionBank = [
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    id: 2,
    question: "Which ocean is the deepest?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    answer: "Da Vinci",
  },
  {
    id: 4,
    question: "In what year did World War II end?",
    options: ["1940", "1945", "1939", "1950"],
    answer: "1945",
  },
  {
    id: 5,
    question: "What is the chemical symbol for water?",
    options: ["HO", "H2O", "OH2", "WO"],
    answer: "H2O",
  },
  {
    id: 6,
    question: "Which continent is the Sahara Desert located on?",
    options: ["Asia", "Africa", "Australia", "South America"],
    answer: "Africa",
  },
  {
    id: 7,
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answer: "Carbon Dioxide",
  },
  {
    id: 8,
    question: "Who is the author of '1984'?",
    options: ["George Orwell", "Mark Twain", "Aldous Huxley", "J.K. Rowling"],
    answer: "George Orwell",
  },
  {
    id: 9,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    id: 10,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Thailand", "Japan"],
    answer: "Japan",
  },
  {
    id: 11,
    question: "Which instrument has 88 keys?",
    options: ["Guitar", "Violin", "Piano", "Saxophone"],
    answer: "Piano",
  },
  {
    id: 12,
    question: "What is the longest river in the world?",
    options: ["Amazon", "Yangtze", "Nile", "Mississippi"],
    answer: "Nile",
  },
  {
    id: 13,
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo", "Nikola Tesla"],
    answer: "Isaac Newton",
  },
  {
    id: 14,
    question: "Which language has the most native speakers?",
    options: ["English", "Hindi", "Mandarin", "Spanish"],
    answer: "Mandarin",
  },
  {
    id: 15,
    question: "Which element has the atomic number 1?",
    options: ["Oxygen", "Hydrogen", "Nitrogen", "Helium"],
    answer: "Hydrogen",
  },
  {
    id: 16,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "USA", "UK"],
    answer: "Brazil",
  },
  {
    id: 17,
    question: "What is the capital city of Nepal?",
    options: ["Pokhara", "Kathmandu", "Lalitpur", "Bhaktapur"],
    answer: "Kathmandu",
  },
  {
    id: 18,
    question: "Which is the national bird of Nepal?",
    options: ["Peacock", "Danphe", "Crow", "Swan"],
    answer: "Danphe",
  },
  {
    id: 19,
    question: "Which mountain is the highest in Nepal?",
    options: ["Annapurna", "Lhotse", "Makalu", "Mount Everest"],
    answer: "Mount Everest",
  },
  {
    id: 20,
    question: "In which year did Nepal become a republic?",
    options: ["2006", "2008", "2010", "2015"],
    answer: "2008",
  },
  {
    id: 21,
    question: "What is the currency of Nepal?",
    options: ["Nepali Dollar", "Nepalese Rupee", "Taka", "Indian Rupee"],
    answer: "Nepalese Rupee",
  },
  {
    id: 22,
    question: "Which river is the longest in Nepal?",
    options: ["Gandaki", "Koshi", "Karnali", "Bagmati"],
    answer: "Karnali",
  },
  {
    id: 23,
    question: "Who is known as the 'Living Goddess' in Nepal?",
    options: ["Devi", "Durga", "Kumari", "Tara"],
    answer: "Kumari",
  },
  {
    id: 24,
    question: "What is Nepal’s national flower?",
    options: ["Lily", "Rose", "Sunflower", "Rhododendron"],
    answer: "Rhododendron",
  },
  {
    id: 25,
    question: "Which is the only international airport in Nepal (as of 2024)?",
    options: ["Biratnagar", "Pokhara", "Tribhuvan", "Gautam Buddha"],
    answer: "Tribhuvan",
  },
  {
    id: 26,
    question: "What is the traditional Nepali dress for men?",
    options: ["Daura Suruwal", "Lungi", "Sherwani", "Dhoti"],
    answer: "Daura Suruwal",
  },
  {
    id: 27,
    question: "Which festival is known as the festival of lights in Nepal?",
    options: ["Dashain", "Tihar", "Maghe Sankranti", "Holi"],
    answer: "Tihar",
  },
  {
    id: 28,
    question: "Who is the founder of Buddhism born in Nepal?",
    options: ["Dalai Lama", "Mahavira", "Siddhartha Gautama", "Ashoka"],
    answer: "Siddhartha Gautama",
  },
  {
    id: 29,
    question: "Which city is famous for its lakes in Nepal?",
    options: ["Kathmandu", "Pokhara", "Bhaktapur", "Janakpur"],
    answer: "Pokhara",
  },
  {
    id: 30,
    question: "Which country borders Nepal to the north?",
    options: ["India", "China", "Bhutan", "Bangladesh"],
    answer: "China",
  },
  {
    id: 31,
    question: "What is the shape of the national flag of Nepal?",
    options: ["Rectangle", "Square", "Circle", "Two triangles"],
    answer: "Two triangles",
  },
  {
    id: 32,
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Everest", "Kangchenjunga", "Makalu"],
    answer: "Everest",
  },
  {
    id: 33,
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Newton", "Einstein", "Tesla", "Bohr"],
    answer: "Einstein",
  },
  {
    id: 34,
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Cucumber", "Onion"],
    answer: "Avocado",
  },
  {
    id: 35,
    question: "Which planet is closest to the Sun?",
    options: ["Earth", "Venus", "Mars", "Mercury"],
    answer: "Mercury",
  },
  {
    id: 36,
    question: "Which festival is the biggest in Nepal?",
    options: ["Tihar", "Holi", "Dashain", "Buddha Jayanti"],
    answer: "Dashain",
  },
  {
    id: 37,
    question: "What is the traditional Nepali greeting?",
    options: ["Namaskar", "Hello", "Salam", "Hi"],
    answer: "Namaskar",
  },
  {
    id: 38,
    question: "Which is the second largest city of Nepal?",
    options: ["Pokhara", "Biratnagar", "Lalitpur", "Nepalgunj"],
    answer: "Biratnagar",
  },
  {
    id: 39,
    question: "Which famous lake is located in Pokhara?",
    options: ["Rara", "Phewa", "Tilicho", "Gosaikunda"],
    answer: "Phewa",
  },
  {
    id: 40,
    question: "What is the popular trekking route in Nepal?",
    options: [
      "Everest Base Camp",
      "Annapurna Circuit",
      "Manaslu Trail",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    id: 41,
    question: "Which is Nepal's only natural World Heritage Site?",
    options: [
      "Sagarmatha National Park",
      "Chitwan National Park",
      "Lumbini",
      "Patan Durbar Square",
    ],
    answer: "Sagarmatha National Park",
  },
  {
    id: 42,
    question: "Which religion originated in Nepal?",
    options: ["Hinduism", "Buddhism", "Christianity", "Islam"],
    answer: "Buddhism",
  },
  {
    id: 43,
    question: "What is Nepal's national animal?",
    options: ["Tiger", "Red Panda", "Cow", "Elephant"],
    answer: "Cow",
  },
  {
    id: 44,
    question: "Which is the oldest university in Nepal?",
    options: [
      "Pokhara University",
      "Kathmandu University",
      "Tribhuvan University",
      "Purbanchal University",
    ],
    answer: "Tribhuvan University",
  },
  {
    id: 45,
    question: "When is Nepal’s Constitution Day celebrated?",
    options: ["Ashwin 3", "Baisakh 1", "Magh 19", "Kartik 10"],
    answer: "Ashwin 3",
  },
  {
    id: 46,
    question: "What is the primary language spoken in Nepal?",
    options: ["Hindi", "Newari", "Maithili", "Nepali"],
    answer: "Nepali",
  },
  {
    id: 47,
    question: "What is the national sport of Nepal?",
    options: ["Volleyball", "Football", "Cricket", "Kabaddi"],
    answer: "Volleyball",
  },
  {
    id: 48,
    question: "Who is the current Prime Minister of Nepal? (as of 2024)",
    options: [
      "Pushpa Kamal Dahal",
      "Sher Bahadur Deuba",
      "KP Sharma Oli",
      "Baburam Bhattarai",
    ],
    answer: "Pushpa Kamal Dahal",
  },
  {
    id: 49,
    question: "Which district is Lumbini located in?",
    options: ["Rupandehi", "Kapilvastu", "Nawalparasi", "Chitwan"],
    answer: "Rupandehi",
  },
  {
    id: 50,
    question: "Which is the largest national park in Nepal?",
    options: ["Bardiya", "Chitwan", "Rara", "Makalu Barun"],
    answer: "Bardiya",
  },
  {
    id: 51,
    question: "Which zone was Kathmandu in before federalism?",
    options: ["Bagmati", "Gandaki", "Janakpur", "Narayani"],
    answer: "Bagmati",
  },
  {
    id: 52,
    question: "Which ancient palace is located in Bhaktapur?",
    options: [
      "Hanuman Dhoka",
      "Patan Durbar",
      "Basantapur",
      "55-Window Palace",
    ],
    answer: "55-Window Palace",
  },
  {
    id: 53,
    question: "What type of government does Nepal have?",
    options: ["Monarchy", "Republic", "Dictatorship", "Federal Monarchy"],
    answer: "Republic",
  },
  {
    id: 54,
    question: "What is the highest lake in Nepal?",
    options: ["Rara", "Phewa", "Tilicho", "Gosaikunda"],
    answer: "Tilicho",
  },
  {
    id: 55,
    question: "Which script is used to write Nepali language?",
    options: ["Arabic", "Roman", "Devanagari", "Cyrillic"],
    answer: "Devanagari",
  },
  {
    id: 56,
    question: "Which is the smallest district in Nepal by area?",
    options: ["Bhaktapur", "Lalitpur", "Manang", "Kathmandu"],
    answer: "Bhaktapur",
  },
  {
    id: 57,
    question: "Which zone is Mount Everest located in?",
    options: ["Gandaki", "Sagarmatha", "Bagmati", "Janakpur"],
    answer: "Sagarmatha",
  },
  {
    id: 58,
    question: "What is the popular Nepali dish made of rice and lentils?",
    options: ["Roti Tarkari", "Momo", "Sel Roti", "Dal Bhat"],
    answer: "Dal Bhat",
  },
  {
    id: 59,
    question: "Which organization runs international flights in Nepal?",
    options: [
      "Buddha Air",
      "Himalaya Airlines",
      "Nepal Airlines",
      "Yeti Airlines",
    ],
    answer: "Nepal Airlines",
  },
  {
    id: 60,
    question: "Which Nepali lake is also known as the Queen of Lakes?",
    options: ["Rara", "Phewa", "Begnas", "Gosaikunda"],
    answer: "Rara",
  },
  {
    id: 61,
    question: "How many provinces are there in Nepal?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    id: 62,
    question: "Which place is the birthplace of Lord Buddha?",
    options: ["Kapilvastu", "Lumbini", "Janakpur", "Tilaurakot"],
    answer: "Lumbini",
  },
  {
    id: 63,
    question: "Which festival celebrates brother-sister bonding in Nepal?",
    options: ["Tihar", "Dashain", "Maghe Sankranti", "Teej"],
    answer: "Tihar",
  },
  {
    id: 64,
    question: "Which month is the Nepali New Year celebrated?",
    options: ["Chaitra", "Baisakh", "Falgun", "Magh"],
    answer: "Baisakh",
  },
  {
    id: 65,
    question: "What is the name of Nepal’s central bank?",
    options: [
      "Nepal Investment Bank",
      "Nepal Rastra Bank",
      "Nepal Bank Limited",
      "Nabil Bank",
    ],
    answer: "Nepal Rastra Bank",
  },
];
