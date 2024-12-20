import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import IconDayNight from "@/components/ToggleDayNight/IconDayNight";
import {RootState} from "@/redux/store";
import {setNightMode} from "@/redux/reducers/modeSlice"; // Adjust the import path as necessary

const ToggleDayNight = () => {
    const isClickableRef = useRef(true);
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const dispatch = useDispatch();

    const toggleNightMode = () => {
        if (isClickableRef.current) {
            console.log("toggleNightMode", !nightMode);
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
            <IconDayNight nightMode={nightMode}/>
            <div
                className={`top-[4px] left-[4px] w-[23px] absolute h-[23px] rounded-full transition-all duration-1000 ${
                    nightMode ? "animate-switch bg-white" : "animate-reverseSwitch bg-primary"
                }`}
            ></div>
        </div>
    );
};

export default ToggleDayNight;
