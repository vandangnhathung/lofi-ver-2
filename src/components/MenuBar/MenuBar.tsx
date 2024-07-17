import React from 'react';

const MenuBar = () => {
    return (
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2`}>
            <div className={`w-screen max-w-[1440px] h-[60px] px-gap-container blur bg-black`}></div>
        </div>
    );
};

export default MenuBar;