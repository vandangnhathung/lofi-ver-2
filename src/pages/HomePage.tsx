import React from 'react';
import CustomVideo from '@/components/CustomVideo/CustomVideo';
import MenuBar from "@/components/MenuBar/MenuBar";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const HomePage: React.FC = () => {
    const scene = useSelector((state: RootState) => state.scene.scene);
    return (
        <>
            {/* decide height of the website */}
            <div className={`relative w-screen h-screen`}>
                <CustomVideo src={`/public/assets/videos/${scene.src}`}/>
                <MenuBar/>
            </div>
        </>
    );
};

export default HomePage;