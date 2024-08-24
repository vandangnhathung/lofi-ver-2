import React, {useEffect, useRef} from "react";
import Slider from "react-slick";
import "@/components/SliderCustom/CustomSlider.scss";
import CustomArrow from "@/components/SliderCustom/CustomArrow";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {SliderCustomProps} from "@/components/SliderCustom/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import useBreakpoint from "@/hooks/useBreakpoint";

const SliderCustom: React.FC<SliderCustomProps> = ({children, className}) => {
    const themesData = useSelector((state: RootState) => state.themes.themes);
    const {chosenThemeObjectPanel, isChosenTheme} = useSelector((state: RootState) => state.themes);
    const totalScenes = chosenThemeObjectPanel?.scenes.length || themesData.flatMap(theme => theme.scenes).length;
    const totalThemes = themesData.length;
    const isTotalScenesGreaterThanTwo = totalScenes >= 2;
    const sliderRef = useRef<Slider | null>(null); // Type the ref

    const {isMobile} = useBreakpoint();

    useEffect(() => {
        if (isChosenTheme && sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    }, [isChosenTheme])

    const isChosenThemeCondition = isChosenTheme ? totalScenes > 2 : totalThemes > 2;

    const settings = {
        dots: false,
        adaptiveHeight: true,
        infinite: totalScenes > 2,
        speed: 500,
        slidesToShow: isMobile ? 1 : isTotalScenesGreaterThanTwo ? 2 : 1,
        slidesToScroll: isMobile ? 1 : isTotalScenesGreaterThanTwo && isChosenTheme ? 2 : 1,
        prevArrow: isChosenThemeCondition ? <CustomArrow CustomArrowIcon={ChevronLeft}/> : undefined,
        nextArrow: isChosenThemeCondition ? <CustomArrow CustomArrowIcon={ChevronRight}/> : undefined,
    };

    return (
        <Slider ref={sliderRef} className={className} {...settings}>
            {children}
        </Slider>
    );
}

export default SliderCustom;
