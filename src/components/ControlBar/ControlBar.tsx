import React from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import ControlBarIcon from "@/components/ControlBar/ControlBarIcon";

const ControlBar = () => {
    return (
        <div>
            <MenuButton onClick={() => {

            }} IconComponent={ControlBarIcon}/>
        </div>
    );
};


export default ControlBar;