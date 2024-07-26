import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import IconDayNight from "@/components/ToggleDayNight/IconDayNight";
import {RootState} from "@/redux/store";
import {setNightMode} from "@/redux/reducers/sceneSlice"; // Adjust the import path as necessary

const ToggleDayNight = () => {
    const isClickableRef = useRef(true); // Ref to manage clickability
    const nightMode = useSelector((state: RootState) => state.scene.nightMode);
    const dispatch = useDispatch();

    const toggleNightMode = () => {
        if (isClickableRef.current) {
            dispatch(setNightMode(!nightMode));
            isClickableRef.current = false;
        }
    };

    const handleTransitionEnd = () => {
        isClickableRef.current = true;
    };

    return (
        <div
            className={`h-[31px] w-[62px] p-1 rounded-full transition-all duration-1000 backdrop-blur-md cursor-pointer relative flex items-center ${
                nightMode ? "bg-transparent" : "bg-[rgba(0,0,0,0.6)]"
            }`}
            onClick={toggleNightMode}
            onTransitionEnd={handleTransitionEnd}
        >
            <IconDayNight type="day" toggleButton={nightMode === false && nightMode}/>
            <IconDayNight type="night" toggleButton={nightMode === true && nightMode}/>
            <div
                className={`top-[4px] left-[4px] w-[23px] absolute h-[23px] rounded-full transition-all duration-1000 bg-white ${
                    nightMode ? "animate-switch" : "animate-reverseSwitch"
                }`}
            ></div>
        </div>
    );
};

export default ToggleDayNight;
