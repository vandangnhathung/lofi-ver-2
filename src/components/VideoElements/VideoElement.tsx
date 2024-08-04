import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface VideoElementProps {
    src: string | undefined;
}

const VideoElement: React.FC<VideoElementProps> = ({src}) => {
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
