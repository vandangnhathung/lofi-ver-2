import React from "react";
import BackgroundNoiseList from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ControlBarMenuBottom = () => {
  const mixMore = useSelector(
    (state: RootState) => state.backgroundSound.mixMore
  );

  return (
    <div
      className={`glass-card pt-1 pr-2 min-h-[180px] transition-all ease-in-out duration-300    pb-control-bar-height`}
    >
      <h3 className="mb-2 uppercase pt-2 pl-3 pr-3 absolute z-10 top-0 left-0">
        Background noise
      </h3>

      <div
        className={`${mixMore ? "h-[50vh]" : "h-[150px]"} transition-all duration-300 relative z-20 ease-in overflow-hidden`}
      >
        <BackgroundNoiseList />
      </div>
    </div>
  );
};

export default ControlBarMenuBottom;
