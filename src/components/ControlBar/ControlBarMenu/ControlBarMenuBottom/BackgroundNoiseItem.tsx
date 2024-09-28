import React from "react";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface BackgroundNoiseItemProps {
  index: number;
  soundName: string;
  className?: string;
  volume: number;
  // handleChange: (event: Event, newValue: number | number[]) => void;
}

const BackgroundNoiseItem: React.FC<BackgroundNoiseItemProps> = ({
                                                                   index,
                                                                   soundName,
                                                                   className,
                                                                   volume = 0,
                                                                 }) => {
  const mixMore = useSelector(
      (state: RootState) => state.backgroundSound.mixMore
  );

  const dispatch = useDispatch();
  const volumes = useSelector(
      (state: RootState) => state.backgroundSound.volumes
  ); // Get volume from

  const handleChange = (event: Event, newValue: number | number[]) => {
    const newVolume = (newValue as number) / 100; // Convert slider value to a fraction (0 to 1)
    // dispatch(setVolume(newVolume));
  };

  return (
      <li
          className={`flex items-center gap-4 pl-3 pr-8 ${mixMore ? "" : ""} duration-1000 ${className}`}
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
            value={Math.floor(volume)} // Convert volume to slider range (0 to 100)
            onChange={handleChange}
            // onChange={handleChange}
            valueLabelDisplay="auto"
        />
      </div>
    </li>
  );
};

export default BackgroundNoiseItem;
