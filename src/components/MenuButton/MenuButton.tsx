import React from 'react';
import {LucideIcon} from "lucide-react";

export interface MenuButtonProps {
    IconComponent: LucideIcon;
    isActive?: boolean;
    backgroundColor?: string;
    onClick?: () => void;
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(({
                                                                             IconComponent,
                                                                             isActive,
                                                                             onClick,
                                                                             backgroundColor = ""
                                                                         }, ref) => {
    const style = {
        backgroundColor: backgroundColor,
        color: backgroundColor === 'white' ? "black" : "white",
    };

    return (
        <button ref={ref}
                onClick={onClick}
                className={`p-2 rounded-md hover:bg-[rgba(255,255,255,0.1)] transition-all`}
                style={style}>
            <IconComponent
                className={`w-[25px] aspect-square text-white transition-all duration-500 ${isActive ? 'text-primary' : ''}`}/>
        </button>
    );
});

MenuButton.displayName = 'MenuButton'; // This is optional but useful for debugging

export default MenuButton;
