import React from 'react';

const SceneButton = () => {
    return (
        <button className={`group absolute top-[50%] left-[20%]`}>
            <div className={`w-12 h-12 p-3`}>
                <div
                    className={`h-full after:transition-all after:duration-500 after:rounded-full group-hover:after:bg-primary after:absolute after:inset-0 after:opacity-30`}>
                    <div
                        className="h-full transition-all duration-500 rounded-full group-hover:bg-primary border-2 border-white"></div>
                </div>
            </div>
        </button>
    );
};

export default SceneButton;