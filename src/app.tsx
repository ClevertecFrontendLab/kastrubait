import { useState } from 'react';
import { Layout } from 'antd';
import useScreenWidth from '@hooks/useScreenWidth';
import { AppRouter } from './router/app-router';
import { SideBar } from '@components/sidebar/sidebar';
import { MainHeader } from '@components/main-header/main-header';

import 'normalize.css';
import 'antd/dist/antd.css';
import s from './app.module.scss';

export const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const mobileView = useScreenWidth();

    return (
        <Layout className={s.container}>
            {/* <SideBar mobileView={mobileView} collapsed={collapsed} setCollapsed={setCollapsed} /> */}
            <SideBar />
            <Layout className={s.page}>
                <MainHeader  />
                {/* <MainHeader mobileView={mobileView} /> */}
                <AppRouter />
            </Layout>
        </Layout>
    );
};
