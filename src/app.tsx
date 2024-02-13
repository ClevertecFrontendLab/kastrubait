import { useState } from 'react';
import { Layout } from 'antd';
import useScreenWidth from '@hooks/useScreenWidth';
import { AppRouter } from './router/app-router';
import { SideBar } from '@components/sidebar/sidebar';
import { MainHeader } from '@components/header/main-header';
import { MainFooter } from '@components/footer/main-footer';

import 'normalize.css';
// import 'antd/dist/antd.css';
import './app.module.scss';

export const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const mobileView = useScreenWidth();

    return (
        <Layout className='app_container'>
            <SideBar mobileView={mobileView} collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout >
                <MainHeader />
                <div className='app_content'>
                    <AppRouter />
                    <MainFooter />
                </div>
            </Layout>
        </Layout>
    );
};
