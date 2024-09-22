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
      className={`glass-card ${mixMore ? "h-[40vh] overflow-y-auto" : "h-[150px]"} transition-all duration-300 scrollbar-hidden pt-1 pr-2 min-h-[180px] pb-control-bar-height`}
    >
      <h3 className="mb-2 uppercase pt-2 pl-3 pr-3 relative z-20 ">
        Background noise
      </h3>

      <div
        className={`${mixMore ? "h-[40vh]" : "h-[150px]"} transition-all duration-300  relative z-30 ease-in`}
      >
        <BackgroundNoiseList />
      </div>
    </div>
  );
};

export default ControlBarMenuBottom;
