import React from "react";
import Slider from "@mui/material/Slider";

interface BackgroundNoiseItemProps {
  soundName: string;
  // handleChange: (event: Event, newValue: number | number[]) => void;
}

const BackgroundNoiseItem: React.FC<BackgroundNoiseItemProps> = ({
  soundName,
}) => {
  const volume = 20;

  return (
    <li className="flex items-center gap-4 pl-3 pr-5">
      <div className="w-1/3 ">
        <p className="text-[#ccc]">{soundName}</p>
      </div>
      <div className={`w-2/3 flex justify-center`}>
        <Slider
          aria-label="Background Volume"
          value={Math.floor(volume * 100)} // Convert volume to slider range (0 to 100)
          // onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    </li>
  );
};

export default BackgroundNoiseItem;
