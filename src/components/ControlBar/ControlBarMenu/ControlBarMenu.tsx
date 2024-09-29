import React from "react";
import ControlBarMenuTop from "@/components/ControlBar/ControlBarMenu/ControlBarMenuTop";
import ControlBarMenuMiddle from "@/components/ControlBar/ControlBarMenu/ControlBarMenuMiddle";
import ControlBarMenuBottom from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/ControlBarMenuBottom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleMixMore } from "@/redux/reducers/backgroundSoundSlice";

const ControlBarMenu = () => {
  const dispatch = useDispatch();
  const mixMore = useSelector(
      (state: RootState) => state.backgroundSound.mixMore
  );
  const controlBar = useSelector((state: RootState) => state.panel.controlBar);

  return (
    <div
        className={`${controlBar ? "opacity visible" : "opacity-0 invisible"} transition-all fixed z-20 top-gap-container capitalize left-gap-container font-medium`}
    >
      <div
        className={`relative min-w-[400px] max-w-[500px] rounded-3xl border border-[rgba(255,255,255,0.4)] aspect-square backdrop-blur-[4px] bg-[rgba(0,0,0,0.6)] text-white`}
      >
        <div className="gap-3 flex flex-col py-4 px-4">
          <ControlBarMenuTop />
          <ControlBarMenuMiddle />
          <ControlBarMenuBottom />
        </div>

        <div
          onClick={() => {
            dispatch(toggleMixMore(!mixMore));
          }}
          className="mx-4 border border-transparent cursor-pointer absolute bottom-4 rounded-b-xl overflow-hidden left-0 right-0 h-control-bar-height"
        >
          <div className="flex items-center justify-center bg-[#4d4d4d] hover:bg-[rgba(29,29,29,1)] transition-all ease-in-out duration-300 w-full h-full p-2">
            <p className="text-white">Mix more</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBarMenu;
