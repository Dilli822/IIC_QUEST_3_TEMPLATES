import React from "react";
import Lottie from "lottie-react";
import pageNotFoundAnimation from "@/assets/lottie/pageNotFound.json";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className=" flex  items-center justify-center bg-white">
      <div>
        <Lottie
          animationData={pageNotFoundAnimation}
          loop={true}
          className="h-[70vh] mt-10"
        />
        <Button className="flex mx-auto" onClick={() => navigate(-1)}>
          Go back <Undo2 />
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
