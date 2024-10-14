
import ControlMusicList from "@/components/ControlBar/kits/ControlMusic/ControlMusicList";
import {ListMusic} from "lucide-react";

const ControlMusic = () => {

    return (
        <div
            className={`flex flex-col gap-4 p-2 border border-[rgba(255,255,255,0.4)] rounded-xl bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px]`}>
            <div className={`flex justify-between gap-x-2`}>
                <p className={`uppercase`}>music</p>
                <ListMusic className={`opacity-40`}/>
            </div>
            <div className={``}>
                <ControlMusicList/>
            </div>
        </div>
    );
};

export default ControlMusic;