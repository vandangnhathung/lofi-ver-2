import React from 'react';
import BackgroundNoiseList from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseList";


const ControlBarMenuBottom = () => {

    return (
        <div className={`glass-card pr-5`}>
            <h3 className="uppercase">Background noise</h3>

            <div className="">
                <BackgroundNoiseList/>
            </div>
        </div>
    );
};

export default ControlBarMenuBottom;