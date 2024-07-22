import {ElementType, ReactNode} from "react";

export interface CustomArrowProps {
    CustomArrowIcon: ElementType<{ className?: string }>;
    className?: string;
    onClick?: () => void;
}

export interface SliderCustomProps {
    children: ReactNode;
    className?: string;
}
