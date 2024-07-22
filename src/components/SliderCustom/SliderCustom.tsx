import React, {ReactNode} from "react";
import Slider from "react-slick";
import "@/components/SliderCustom/CustomSlider.scss"
import CustomArrow from "@/components/SliderCustom/CustomArrow";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {SliderCustomProps} from "@/components/SliderCustom/Type";

const SliderCustom: React.FC<SliderCustomProps> = ({children, className}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: <CustomArrow CustomArrowIcon={ChevronLeft}/>,
        nextArrow: <CustomArrow CustomArrowIcon={ChevronRight}/>,
    };

    return (
        <Slider className={className} {...settings}>
            {children}
        </Slider>
    );
}

export default SliderCustom;
