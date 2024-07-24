// components/HomePage.tsx
import React from 'react';
import Scene from '@/components/Scene/Scene';
import MenuBar from "@/components/MenuBar/MenuBar";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import PixelLoading from "@/components/Loading/PixelLoading/PixelLoading";

const HomePage: React.FC = () => {

    const sceneComplete = useSelector((state: RootState) => state.scene.sceneComplete);

    return (
        <>
            {/* decide height of the website */}
            <div className={`relative w-screen h-screen z-10`}>
                <div className={`bg-black absolute inset-0`}></div>
                <Scene scene={sceneComplete}/>

                <MenuBar/>
            </div>
        </>
    );
};

export default HomePage;
