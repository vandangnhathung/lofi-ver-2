import {ComponentType, SVGProps} from 'react';

export interface MenuButtonProps {
    IconComponent: ComponentType<SVGProps<SVGSVGElement>>; // More specific type for SVG components
    isActive?: boolean;
    backgroundColor?: string;
    onClick?: () => void;
}
