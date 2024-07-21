import React from 'react';
import CustomVideo from '@/components/CustomVideo/CustomVideo';
import ExteriorDay from "@/assets/videos/ExteriorDay.mp4";
import MenuBar from "@/components/MenuBar/MenuBar";

const HomePage: React.FC = () => {
    return (
        <>
            {/* decide height of the website */}
            <div className={`relative w-screen h-screen`}>
                <CustomVideo src={ExteriorDay}/>
                <MenuBar/>

            </div>
        </>
    );
};

export default HomePage;