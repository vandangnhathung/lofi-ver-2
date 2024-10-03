import React from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import ControlBarIcon from "@/components/ControlBar/ControlBarIcon";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {setOpenPanelControlBar} from "@/redux/reducers/panelSlice";

const ControlBar = () => {
    const dispatch = useDispatch();
    const controlBar = useSelector((state: RootState) => state.panel.controlBar);

    return (
        <div className={`control-bar`}>
            <MenuButton isActive={controlBar} onClick={() => dispatch(setOpenPanelControlBar(!controlBar))}
                        IconComponent={ControlBarIcon}/>
        </div>
    );
};


export default ControlBar;