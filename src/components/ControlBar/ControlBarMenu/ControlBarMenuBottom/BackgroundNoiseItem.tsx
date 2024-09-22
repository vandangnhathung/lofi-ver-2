import React from "react";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface BackgroundNoiseItemProps {
  index: number;
  soundName: string;
  className?: string;
  // handleChange: (event: Event, newValue: number | number[]) => void;
}

const BackgroundNoiseItem: React.FC<BackgroundNoiseItemProps> = ({
  index,
  soundName,
  className,
}) => {
  const volume = 20;

  const mixMore = useSelector(
    (state: RootState) => state.backgroundSound.mixMore
  );

  return (
    <li
      className={`flex items-center gap-4 pl-3 pr-8 ${mixMore ? "transition-all" : ""} duration-1000 ${className}`}
      style={{
        transitionDelay: `${mixMore ? index * 100 : index * -100}ms`,
      }}
    >
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
