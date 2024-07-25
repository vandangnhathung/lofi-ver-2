import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import IconDayNight from "@/components/ToggleDayNight/IconDayNight"; // Adjust the import path as necessary

const ToggleDayNight = () => {
    const [toggleButton, setToggleButton] = useState(false);
    const [reRender, setRerender] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setRerender(!reRender);
    }, [toggleButton])

    const handleToggle = () => {
        setToggleButton(!toggleButton); // Toggle the state
        // console.log("ok", toggleButton);
        // dispatch(toggleSlice.actions.nightToggleHome());
    };

    return (
        <div
            className={`h-[31px] w-[62px] p-1 rounded-full transition-all duration-1000 backdrop-blur-md cursor-pointer relative flex items-center ${
                toggleButton ? "bg-transparent" : "bg-[rgba(0,0,0,0.6)]"
            }`}
            onClick={handleToggle}
        >
            <IconDayNight type="day" toggleButton={toggleButton}/>
            <IconDayNight type="night" toggleButton={toggleButton}/>
            <div
                className={`top-[4px] left-[4px] w-[23px] absolute h-[23px] rounded-full transition-all duration-1000 bg-white ${
                    toggleButton ? "animate-switch" : "animate-reverseSwitch"
                }`}
            ></div>
        </div>
    );
};

export default ToggleDayNight;
