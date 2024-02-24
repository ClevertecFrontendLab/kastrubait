import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import useScreenWidth from '@hooks/useScreenWidth';

import { SideBar } from '@components/sidebar/sidebar';
import { MainHeader } from '@components/header/main-header';
import { MainFooter } from '@components/footer/main-footer';

import 'normalize.css';
import style from './layouts.module.scss';

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const mobileView = useScreenWidth();

    return (
        <Layout>
            <SideBar mobileView={mobileView} collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout className={style['main_conteiner']}>
                <MainHeader />
                <div className={style['main_content']}>
                    <Outlet />
                    <MainFooter />
                </div>
            </Layout>
        </Layout>
    );
};
