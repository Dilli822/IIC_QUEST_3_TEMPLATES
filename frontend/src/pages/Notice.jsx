import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Sample notice data
const noticesData = [
  {
    id: 1,
    title: "Scheduled Maintenance",
    date: "June 10, 2025",
    category: "Maintenance",
    description:
      "Our platform will undergo scheduled maintenance from 12:00 AM to 4:00 AM UTC. Services may be unavailable during this period.",
  },
  {
    id: 2,
    title: "New Feature Released: Chat Groups",
    date: "June 4, 2025",
    category: "Update",
    description:
      "We’ve launched Chat Groups! Now you can create private or public discussions with your peers. Check it out in the Community section.",
  },
  {
    id: 3,
    title: "Policy Update",
    date: "June 1, 2025",
    category: "Policy",
    description:
      "Our Terms of Service and Privacy Policy have been updated. Please review the new changes to stay informed.",
  },
  {
    id: 4,
    title: "Server Migration Complete",
    date: "May 25, 2025",
    category: "Maintenance",
    description:
      "Our infrastructure migration is now complete. Performance improvements should be noticeable.",
  },
  {
    id: 5,
    title: "Dark Mode Feature",
    date: "May 15, 2025",
    category: "Update",
    description:
      "We’ve added a new dark mode! You can enable it in your profile settings.",
  },
  {
    id: 6,
    title: "Community Guidelines Update",
    date: "May 1, 2025",
    category: "Policy",
    description:
      "New community guidelines are in effect. Please review them to stay compliant.",
  },
  {
    id: 7,
    title: "Maintenance Downtime Notice",
    date: "April 20, 2025",
    category: "Maintenance",
    description:
      "Some services will be temporarily unavailable from 2:00 AM to 5:00 AM UTC.",
  },
  {
    id: 8,
    title: "Beta Features Released",
    date: "April 10, 2025",
    category: "Update",
    description:
      "Beta access is now open for select users. Try out upcoming features and give feedback!",
  },
  {
    id: 9,
    title: "Terms of Use Revised",
    date: "March 30, 2025",
    category: "Policy",
    description:
      "We’ve revised our terms of use. The changes take effect immediately.",
  },
];

const categoryColors = {
  Maintenance: "bg-yellow-100 text-yellow-800",
  Update: "bg-green-100 text-green-800",
  Policy: "bg-blue-100 text-blue-800",
};

const itemsPerPage = 5;

function Notice() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(noticesData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const visibleNotices = noticesData.slice(start, start + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Notices</h1>
        <span className="block mt-2 mb-2 w-10 h-1 bg-amber-600 rounded-full"></span>
      </div>

      <div className="space-y-6">
        {visibleNotices.map((notice, index) => (
          <Card key={`${notice.id}-${index}`} className="shadow-lg border">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg">{notice.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{notice.date}</p>
              </div>
              <Badge className={categoryColors[notice.category]}>
                {notice.category}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-2 text-gray-700 text-sm">
              {notice.description}
            </CardContent>
          </Card>
        ))}
      </div>

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

export default Notice;
