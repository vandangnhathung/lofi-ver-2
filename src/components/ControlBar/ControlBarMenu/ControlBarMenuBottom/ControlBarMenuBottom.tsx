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
      className={`glass-card overflow-hidden pt-1 pr-7 overflow-y-auto min-h-[180px] transition-all ease-in-out duration-300    pb-control-bar-height`}
    >
      <h3 className="mb-2 uppercase">Background noise</h3>

      <div
        className={`${mixMore ? "h-[25vh]" : "h-[150px]"} transition-all duration-300 ease-in overflow-hidden`}
      >
        <BackgroundNoiseList />
      </div>
    </div>
  );
};

export default ControlBarMenuBottom;
