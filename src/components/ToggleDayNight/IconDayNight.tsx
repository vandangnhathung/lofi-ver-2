import React from "react";

type IconDayNightProps = {
    nightMode: boolean;
};

const IconDayNight: React.FC<IconDayNightProps> = ({nightMode}) => {
    return (
        <div
            className={`absolute text-white transition-all duration-1000 ${nightMode ? 'left-[20px] animate-flickerNightMode' : 'left-[35px] animate-flickerDayMode'}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-all absolute top-1/2 -translate-y-1/2 left-0 duration-1000 ${nightMode ? 'opacity-100' : 'opacity-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-all absolute top-1/2 -translate-y-1/2 duration-1000 ${!nightMode ? 'opacity-100' : 'opacity-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
        </div>
    );
};

export default IconDayNight;
