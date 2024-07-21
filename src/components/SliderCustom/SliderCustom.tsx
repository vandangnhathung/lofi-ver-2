import React, {ReactNode} from "react";
import Slider from "react-slick";

interface SliderCustomProps {
    children: ReactNode;
    className?: string;
}

const SliderCustom: React.FC<SliderCustomProps> = ({children, className}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <Slider className={className} {...settings}>
            {children}
        </Slider>
    );
}

export default SliderCustom;
