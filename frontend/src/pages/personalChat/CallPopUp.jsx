import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { PhoneOff, Mic, Video, MicOff } from "lucide-react";

function CallPopUp({ recepient, onClose, type = "voice" }) {
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    const audio = new Audio("/ringing.mp3");
    audio.loop = true;
    audio.play();

    const stopRinging = setTimeout(() => {
      setIsRinging(false);
      audio.pause();
    }, 5000);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      clearTimeout(stopRinging);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (!isRinging) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRinging]);

  const formatTime = (s) => {
    const min = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center pointer-events-none">
      <Draggable>
        <div className="relative bg-white rounded-2xl shadow-2xl p-4 w-[700px] h-[500px] pointer-events-auto cursor-move flex flex-col justify-between overflow-hidden">
          {type === "video" ? (
            <div className="flex-1 bg-black rounded-xl mb-4 flex items-center justify-center text-white text-sm">
              Camera Preview (mock)
              {/* You could replace this with <video autoPlay /> later */}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center mt-6">
              <img
                src={recepient.imageUrl}
                alt={recepient.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-2xl font-semibold">{recepient.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {isRinging
                  ? "Ringing..."
                  : `Call time: ${formatTime(seconds)}`}
              </p>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex justify-around items-center mt-4 mb-2 w-full">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-full p-5 transition ${
                isMuted ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button onClick={onClose} className="rounded-full p-5 bg-red-600">
              <PhoneOff className="w-6 h-6 text-white" />
            </button>

            {type === "voice" && (
              <button className="rounded-full p-5 bg-gray-300">
                <Video className="w-6 h-6 text-black" />
              </button>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default CallPopUp;
