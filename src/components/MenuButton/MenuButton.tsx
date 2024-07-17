import React from 'react';
import {LucideIcon} from "lucide-react";

interface MenuButtonProps {
    IconComponent: LucideIcon;
    onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({IconComponent, onClick}) => {
    return (
        <button onClick={onClick} className={`p-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] transition-all`}>
            <IconComponent className={`w-[25px] aspect-square text-white`}/>
        </button>
    );
};

export default MenuButton;
