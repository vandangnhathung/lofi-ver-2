import React, {useEffect} from 'react';
import {PanelSceneProps} from "@/components/Panel/Type";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import useBreakpoint from "@/hooks/useBreakpoint";

const PanelScene = ({index, thumbnail, onClick}: PanelSceneProps) => {
    const [isSkeletonLoading, setIsSkeletonLoading] = React.useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsSkeletonLoading(false);
        }, 1000);
    }, [isSkeletonLoading])

    const {isMobile} = useBreakpoint(); // Use the custom hook

    return (
        <li onClick={onClick} key={index}
            className={` ${isMobile ? '!flex justify-center' : '!block'} rounded-md h-[169px] w-full overflow-hidden relative`}>
            {isSkeletonLoading ? <SkeletonLoading/> :
                <img
                    className={`object-cover aspect-[315/150] h-full`}
                    src={`assets/images/thumbnails/${thumbnail}`}
                    alt={`PanelScene ${index + 1}`}/>
            }
        </li>
    );
};

export default PanelScene;