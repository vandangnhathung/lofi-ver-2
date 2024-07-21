import React, {useState} from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {Images} from "lucide-react";

const SwitchScene = () => {
    const [openPanel, setOpenPanel] = useState(false);

    const handleSwitchScene = () => {
        setOpenPanel(!openPanel);
    }

    return (
        <>
            <MenuButton onClick={handleSwitchScene} IconComponent={Images}></MenuButton>

            {/* Todo: Need to be reused */}
            {openPanel && (
                <div className="absolute bottom-lofi-panel-position">
                    <div className="w-[500px] bg-black p-2">
                        <div className="title">
                            <span className="icon"></span>
                            <span className="switch-scene">Switch Scene</span>
                        </div>
                        <div className="content flex gap-x-4">
                            <div className="scene w-1/2">
                                <img className="icon" src="/assets/images/thumbnails/book-cafe-oustside.png"
                                     alt="Book Cafe Outside Scene 1"/>
                            </div>
                            <div className="scene w-1/2">
                                <img className="icon" src="/assets/images/thumbnails/book-cafe-oustside.png"
                                     alt="Book Cafe Outside Scene 2"/>
                            </div>
                            <div className="scene w-1/2">
                                <img className="icon" src="/assets/images/thumbnails/book-cafe-oustside.png"
                                     alt="Book Cafe Outside Scene 3"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SwitchScene;
