import { useEffect, useState } from 'react';

const useScreenWidth = () => {
    const [widthScr, setWidthScr] = useState(window.innerWidth);
    const breakPoint576 = 576;
    const breakPoint768 = 768;

    useEffect(() => {
        const handleWindowResize = () => setWidthScr(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return widthScr <= breakPoint576;
};

export default useScreenWidth;
