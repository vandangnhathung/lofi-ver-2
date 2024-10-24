import React, {PropsWithChildren} from 'react';
import Scene from '@/components/Scene/Scene';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useDroppable} from "@dnd-kit/core";

// Use PropsWithChildren to properly type the component
const HomePage: React.FC<PropsWithChildren> = ({children}) => {
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);
    const {setNodeRef} = useDroppable({
        id: 'droppable',
    });

    return (
        <>
            <div
                ref={setNodeRef}
                className={`relative w-screen h-screen z-10`}
            >
                <div className={`bg-black absolute inset-0`}></div>
                <Scene activeScene={activeScene}/>
                {children}
            </div>
        </>
    );
};
export default HomePage;