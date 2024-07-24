import React from 'react';
import Scene from '@/components/Scene/Scene';
import MenuBar from "@/components/MenuBar/MenuBar";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const HomePage: React.FC = () => {
    const scene = useSelector((state: RootState) => state.scene.scene);
    // ${animationComplete ? "opacity-0" : 'opacity-100'}

    return (
        <>
            {/* decide height of the website */}
            <div
                className={`relative w-screen h-screen`}>
                <div className={`bg-black absolute inset-0`}></div>
                <Scene src={`/public/assets/videos/${scene.src}`}/>
                <MenuBar/>
            </div>
        </>
    );
};

export default HomePage;