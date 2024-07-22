import React from 'react';

interface PanelSceneProps {
    index: number;
    thumbnail: string;
    onClick: () => void;
}

const PanelScene = ({index, thumbnail, onClick}: PanelSceneProps) => {
    return (
        <li onClick={onClick} key={index} className="!block rounded-md overflow-hidden">
            <img
                className={`object-cover`}
                src={`/assets/images/thumbnails/${thumbnail}`}
                alt={`PanelScene ${index + 1}`}/>
        </li>
    );
};

export default PanelScene;