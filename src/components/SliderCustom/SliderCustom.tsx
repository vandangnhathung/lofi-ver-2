import React from "react";
import Slider from "react-slick";
import "@/components/SliderCustom/CustomSlider.scss";
import CustomArrow from "@/components/SliderCustom/CustomArrow";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {SliderCustomProps} from "@/components/SliderCustom/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import themesData from "@/assets/data/themesCopy.json";

const SliderCustom: React.FC<SliderCustomProps> = ({children, className}) => {
    const {chosenThemeObject, isChosenTheme} = useSelector((state: RootState) => state.chosenTheme);
    const totalScenes = chosenThemeObject?.scenes.length || themesData.flatMap(theme => theme.scenes).length;
    console.log('totalScenes', totalScenes);
    const isTotalScenesGreaterThanTwo = totalScenes >= 2;


    const settings = {
        dots: false,
        adaptiveHeight: true,
        infinite: false,
        speed: 500,
        slidesToShow: isTotalScenesGreaterThanTwo ? 2 : 1,
        slidesToScroll: isTotalScenesGreaterThanTwo && isChosenTheme ? 2 : 1,
        prevArrow: totalScenes > 2 ? <CustomArrow CustomArrowIcon={ChevronLeft}/> : undefined,
        nextArrow: totalScenes > 2 ? <CustomArrow CustomArrowIcon={ChevronRight}/> : undefined,
    };

    return (
        <Slider className={className} {...settings}>
            {children}
        </Slider>
    );
}

export default SliderCustom;
