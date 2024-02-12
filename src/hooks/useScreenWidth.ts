import { useEffect, useState } from 'react';

const useScreenWidth = () => {
    const [widthScr, setWidthScr] = useState(window.innerWidth);
    const breakPoint = 576;

    useEffect(() => {
        const handleWindowResize = () => setWidthScr(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return widthScr <= breakPoint;
};

export default useScreenWidth;
