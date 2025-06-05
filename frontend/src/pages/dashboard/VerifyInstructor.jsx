import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function VerifyInstructor() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Instructor Documents</h1>
        <div className="flex items-center gap-2">
          {/* Reject Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reject Instructor</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reject this instructor?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Yes, Reject</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Accept Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-white cursor-pointer">
                Accept
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Accept Instructor</DialogTitle>
                <DialogDescription>
                  Are you sure you want to accept this instructor?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Yes, Accept
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className=" flex items-center justify-center mt-5">
        <iframe
          src="/cv.pdf"
          width="100%"
          height="800px"
          title="PDF Viewer"
          style={{ border: "none" }}
        >
          This browser does not support PDFs. Please download the file to view
          it: <a href="/cv.pdf">Download PDF</a>
        </iframe>
      </div>
    </div>
  );
}

export default VerifyInstructor;
