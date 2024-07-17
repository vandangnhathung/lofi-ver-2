import React from 'react';

interface VideoProps {
    src: string;
}

const CustomVideo: React.FC<VideoProps> = ({src}) => {
    return (
        <div className="fixed inset-0 z-10">
            <video src={src} autoPlay loop muted className="object-cover h-full w-full">
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default CustomVideo;
