import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface VideoElementProps {
    src: string | undefined;
}

const VideoElement: React.FC<VideoElementProps> = ({src}) => {
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const activeSceneSrc = useSelector((state: RootState) => state.scene.activeSceneSrc);

    return (
        <video
            src={`/public/assets/videos/${src}`}
            autoPlay
            loop
            muted
            className={`object-cover ${activeSceneSrc === src ? "opacity-1 z-2" : "opacity-0"} w-full h-full inset-0 absolute`}
        />
    );
};

export default VideoElement;
