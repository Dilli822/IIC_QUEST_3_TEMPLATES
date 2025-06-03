import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { motion } from "framer-motion";

const funFacts = [
  {
    id: 1,
    fact: "Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
  },
  { id: 2, fact: "Plastic takes over 400 years to decompose in a landfill." },
  { id: 3, fact: "The average person generates 4.4 pounds of waste per day." },
  {
    id: 4,
    fact: "Glass is 100% recyclable and can be reused endlessly without loss in quality.",
  },
  {
    id: 5,
    fact: "Electronic waste contains valuable materials like gold and silver.",
  },
  { id: 6, fact: "Food waste makes up almost 22% of municipal solid waste." },
  {
    id: 7,
    fact: "Over 1 million seabirds die each year from plastic pollution.",
  },
  {
    id: 8,
    fact: "One ton of recycled paper saves 17 trees and 7,000 gallons of water.",
  },
  {
    id: 9,
    fact: "Landfills are the third-largest source of human-related methane emissions in the U.S.",
  },
  {
    id: 10,
    fact: "Composting helps reduce landfill waste and creates nutrient-rich soil.",
  },
  { id: 11, fact: "Aluminum can be recycled an infinite number of times." },
  {
    id: 12,
    fact: "Only 9% of all plastic waste ever produced has been recycled.",
  },
  {
    id: 13,
    fact: "The fashion industry produces 10% of global carbon emissions.",
  },
  {
    id: 14,
    fact: "Carpooling or biking reduces greenhouse gas emissions drastically.",
  },
  {
    id: 15,
    fact: "Turning off lights when not in use saves electricity and money.",
  },
];

const itemsPerPage = 5;

function FunFacts() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [shuffledFacts, setShuffledFacts] = React.useState([...funFacts]);

  const totalPages = Math.ceil(shuffledFacts.length / itemsPerPage);

  const shuffleFacts = () => {
    const shuffled = [...funFacts].sort(() => 0.5 - Math.random());
    setShuffledFacts(shuffled);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const start = (currentPage - 1) * itemsPerPage;
  const visibleFacts = shuffledFacts.slice(start, start + itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-left">
            🌍 Fun Environmental Facts
          </h1>
          <p className="text-muted-foreground">
            Learn and share quick facts to inspire eco-conscious actions.
          </p>
        </div>
        <Button variant="default" onClick={shuffleFacts}>
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-4"
      >
        {visibleFacts.map((fact) => (
          <Card key={fact.id} className="shadow-xl">
            <CardContent className="p-4">
              <span className="text-lg font-medium">{fact.fact}</span>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx + 1}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default FunFacts;
