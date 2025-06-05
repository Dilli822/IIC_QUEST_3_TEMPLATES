import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

function Content() {
  return (
    <div className="p-4 flex items-center justify-center">
      <Card className="w-full rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Don&apos;t forget to save after changes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Add your main content here */}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {/* Optional: footer actions here */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Content;
