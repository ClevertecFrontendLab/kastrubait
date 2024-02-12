// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';



export const AppRouter = () => {
    // const [collapsed, setCollapsed] = useState(false);
    // const mobileView = useScreenWidth();

    return (
        <>
            <Routes>
                <Route index path='/' element={<MainPage />} />
            </Routes>
        </>
    );
};
