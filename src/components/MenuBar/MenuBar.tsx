
import AudioControlButtons from "@/components/AudioControlButtons/AudioControlButtons";
import SwitchSceneButton from "@/components/SwitchSceneButton/SwitchSceneButton";
import ToggleDayNight from "@/components/ToggleDayNight/ToggleDayNight";
import ControlBar from "@/components/ControlBar/ControlBar";
import {Link} from "react-router-dom";

const MenuBar = () => {
    return (
        <div className={`absolute bottom-4 left-1/2 z-40 -translate-x-1/2 px-gap-container`}>
            <div
                className={`flex relative items-center border border-[rgba(255,255,255,0.3)] justify-between w-screen-padding max-w-[1440px] p-2 rounded-xl h-lofi-menu-height before:content-normal backdrop-blur-md bg-[rgba(0,0,0,0.6)] `}>

                <div className={`absolute top-1/2 -translate-y-1/2 left-gap-container`}>
                    <ToggleDayNight/>
                </div>
                <div
                    className={`flex overflow-x-auto gap-3 justify-center items-center ml-[72px]`}>
                    <AudioControlButtons/>
                    <SwitchSceneButton/>
                    <ControlBar/>
                </div>

                <Link to="/sign-in" className="primary-button">Sign in</Link>
            </div>
        </div>
    );
};

export default MenuBar;
