import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const tips = [
  "Upload a clear photo to help identify the issue.",
  "Provide an accurate address or nearby landmark.",
  "Mention when you first noticed the issue.",
  "Choose the most fitting category.",
  "Describe the issue briefly but clearly.",
  "Name is optional, but adds credibility.",
  "Leave contact info if follow-up is needed.",
  "Complete the CAPTCHA to avoid spam.",
  "Check your inputs before submitting.",
];

function Tips() {
  const [visible, setVisible] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 max-w-xs bg-black border shadow-md rounded-lg p-4 z-50">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white">{tips[tipIndex]}</p>
        <button
          aria-label="Close tips"
          onClick={() => setVisible(false)}
          className="ml-2 text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Tips;
