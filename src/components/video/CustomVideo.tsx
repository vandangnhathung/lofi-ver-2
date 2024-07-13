import React from 'react';

interface VideoProps {
    src: string;
}

const CustomVideo: React.FC<VideoProps> = ({src}) => {
    return (
        <video src={src} autoPlay loop muted className="w-full h-screen object-cover">
            Your browser does not support the video tag.
        </video>
    );
};

export default CustomVideo;
