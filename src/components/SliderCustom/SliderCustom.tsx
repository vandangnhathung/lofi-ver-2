import React from "react";
import Slider from "react-slick";
import "@/components/SliderCustom/CustomSlider.scss";
import CustomArrow from "@/components/SliderCustom/CustomArrow";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {SliderCustomProps} from "@/components/SliderCustom/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const SliderCustom: React.FC<SliderCustomProps> = ({children, className}) => {
    const themesData = useSelector((state: RootState) => state.themes.themes);
    const {chosenThemeObject, isChosenTheme} = useSelector((state: RootState) => state.themes);
    const totalScenes = chosenThemeObject?.scenes.length || themesData.flatMap(theme => theme.scenes).length;
    const totalThemes = themesData.length;
    const isTotalScenesGreaterThanTwo = totalScenes >= 2;

    const isChosenThemeCondition = isChosenTheme ? totalScenes > 2 : totalThemes > 2;

    const settings = {
        dots: false,
        adaptiveHeight: true,
        infinite: totalScenes > 2,
        speed: 500,
        slidesToShow: isTotalScenesGreaterThanTwo ? 2 : 1,
        slidesToScroll: isTotalScenesGreaterThanTwo && isChosenTheme ? 2 : 1,
        prevArrow: isChosenThemeCondition ? <CustomArrow CustomArrowIcon={ChevronLeft}/> : undefined,
        nextArrow: isChosenThemeCondition ? <CustomArrow CustomArrowIcon={ChevronRight}/> : undefined,
    };

    return (
        <Slider className={className} {...settings}>
            {children}
        </Slider>
    );
}

export default SliderCustom;
