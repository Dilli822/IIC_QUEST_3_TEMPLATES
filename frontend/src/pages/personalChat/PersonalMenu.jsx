import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Video } from "lucide-react";
import CallPopUp from "./CallPopUp"; // Adjust the path as needed

const PersonalMenu = ({ recepient }) => {
  const [callType, setCallType] = useState(null); // "voice" | "video" | null

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => setCallType("video")}>
          <Video />
        </Button>
        <Button variant="ghost" onClick={() => setCallType("voice")}>
          <Phone />
        </Button>
      </div>

      {callType && (
        <CallPopUp
          recepient={recepient}
          type={callType}
          onClose={() => setCallType(null)}
        />
      )}
    </>
  );
};

export default PersonalMenu;
