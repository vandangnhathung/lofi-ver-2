import React, {useState} from "react";
import {useDispatch} from "react-redux";

const ToggleDayNight = () => {
    const [toggleButton, setToggleButton] = useState(false);
    // const toggleButton = useSelector((state) => state.toggle.nightToggle);
    const dispatch = useDispatch();
    const handleToggle = () => {
        console.log("ok");
        // dispatch(toggleSlice.actions.nightToggleHome());
    };
    return (
        <div
            className={`h-[31px] w-[62px] p-1 rounded-full transition-all duration-1000 bg-primary cursor-pointer relative flex items-center ${
                toggleButton ? "bg-transparent" : ""
            }`}
            onClick={handleToggle}
        >
            <div
                className={`day absolute left-[35px] transition-all duration-1000 ${
                    toggleButton ? "opacity-0 -translate-x-[10px]" : "opacity-1"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            </div>
            <div
                className={`night transition-all absolute left-[20px] duration-1000 ${
                    toggleButton ? "opacity-1 -translate-x-[14px]" : "opacity-0"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            </div>
            <div
                className={`top-[4px] left-[4px] w-[23px] absolute h-[23px] rounded-full transition-all duration-1000 ${
                    toggleButton ? "animate-switch" : "animate-reverseSwitch"
                }
          bg-white`}
            ></div>
        </div>
    );
};

export default ToggleDayNight;