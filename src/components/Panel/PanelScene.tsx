import React from 'react';

interface PanelSceneProps {
    index: number;
    path: string;
}

const PanelScene = ({index, path}: PanelSceneProps) => {
    return (
        <li key={index} className="!block rounded-md overflow-hidden">
            <img
                className={`object-cover`}
                src={`/assets/images/thumbnails/${path}`}
                alt={`PanelScene ${index + 1}`}/>
        </li>
    );
};

export default PanelScene;