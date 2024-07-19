import React from 'react';
import {LucideIcon} from "lucide-react";

export interface MenuButtonProps {
    IconComponent: LucideIcon;
    backgroundColor?: string;
    onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({IconComponent, onClick, backgroundColor = ""}) => {
    const style = {
        backgroundColor: backgroundColor,
        color: backgroundColor === 'white' ? "black" : "white",
    }

    return (
        <button onClick={onClick}
                className={` p-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] transition-all`}
                style={style}>
            <IconComponent className={`w-[25px] aspect-square text-white`}/>
        </button>
    );
};

export default MenuButton;
