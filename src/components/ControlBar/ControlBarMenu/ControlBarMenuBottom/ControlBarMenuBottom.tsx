import React from "react";
import BackgroundNoiseList from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseList";

const ControlBarMenuBottom = () => {
  return (
    <div className={`glass-card pr-5`}>
      <h3 className="uppercase">Background noise</h3>

      <div className="h-[200px]  bg-red-500 overflow-y-auto">
        <BackgroundNoiseList />
      </div>
    </div>
  );
};

export default ControlBarMenuBottom;
