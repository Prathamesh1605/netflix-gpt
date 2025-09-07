import React from "react";
import { Play, Info } from "lucide-react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 w-3/4 text-lg">{overview}</p>
      <div className="flex gap-4 mt-4">
        {/* Play Button */}
        <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
          <Play className="w-5 h-5 fill-black" />
          Play
        </button>

        {/* More Info Button */}
        <button className="flex items-center gap-2 bg-gray-500/70 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-400/70 transition">
          <Info className="w-5 h-5" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
