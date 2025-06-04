import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const notices = [
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
];

const categoryColors = {
  Maintenance: "bg-yellow-100 text-yellow-800",
  Update: "bg-green-100 text-green-800",
  Policy: "bg-blue-100 text-blue-800",
};

function Notice() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Notices</h1>
      <span className="block mt-2 mb-5 w-10 h-1 bg-amber-600 rounded-full"></span>

      <div className="space-y-6">
        {notices.map((notice) => (
          <Card key={notice.id} className="shadow-sm border">
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
    </div>
  );
}
export default Notice;
