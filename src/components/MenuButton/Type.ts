import {LucideIcon} from "lucide-react";

export interface MenuButtonProps {
    IconComponent: LucideIcon;
    isActive?: boolean;
    backgroundColor?: string;
    onClick?: () => void;
}