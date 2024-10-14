

const IconChill = ({color = "#c3c3c3", className = ""}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={color}
             stroke={color}
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={`lucide lucide-coffee ${className} transition-all`}>
            <path d="M10 2v2"/>
            <path d="M14 2v2"/>
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>
            <path d="M6 2v2"/>
        </svg>
    );
};

export default IconChill;