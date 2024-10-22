import {useState, useEffect} from 'react';

const breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
};

const useBreakpoint = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= breakpoints.mobile);
            setIsTablet(width > breakpoints.mobile && width <= breakpoints.tablet);
            setIsDesktop(width > breakpoints.tablet);
        };

        handleResize(); // Call once on mount to set the initial value

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {isMobile, isTablet, isDesktop};
};

export default useBreakpoint;
