import React from 'react';
import {CustomArrowProps} from "@/components/SliderCustom/Type";

const CustomArrow: React.FC<CustomArrowProps> = ({CustomArrowIcon, className, onClick}) => {
    return (
        <div className={`${className}`} onClick={onClick}>
            <CustomArrowIcon className={`slick-custom__arrow-icon top-1/2 -translate-y-1/2 text-white absolute`}/>
        </div>
    );
};

export default CustomArrow;
