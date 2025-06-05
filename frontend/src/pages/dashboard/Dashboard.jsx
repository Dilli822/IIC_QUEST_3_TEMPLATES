import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "verified",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    status: "canceled",
  },
  {
    id: "3",
    name: "Charlie Lee",
    email: "charlie.lee@example.com",
    status: "verified",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    status: "verified",
  },
  {
    id: "5",
    name: "Ethan Brown",
    email: "ethan.brown@example.com",
    status: "pending",
  },
];

function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <Table>
        <TableCaption>A list of course you have added.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>

              <TableCell>
                <Badge
                  className={`text-white py-1 rounded-md font-semibold border-1 border-gray-100 outline-1 w-20 text-center ${
                    user.status == "verified"
                      ? "bg-green-500 outline-green-500 "
                      : user.status == "pending"
                      ? "bg-gray-500  outline-gray-500"
                      : "bg-red-500  outline-red-500"
                  }`}
                >
                  {user.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <Link to={`/super_admin/instructor/${user.id}`}>
                  <Button className="bg-blue-500 hover:bg-blue-500 cursor-pointer">
                    View <Eye />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Dashboard;
