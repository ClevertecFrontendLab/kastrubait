import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Logo } from '@components/sidebar/logo/logo';

import { ExitBtn } from './ExitBtn/exitBtn';

import { SIDER_MENU } from '@constants/index';

import s from './sider.module.scss';

type ISideBar = {
    mobileView: boolean;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
};

const { Sider } = Layout;

export const SideBar = ({ mobileView, collapsed, setCollapsed }: ISideBar) => {
    return (
        <Sider
            trigger={null}
            collapsible
            theme={'light'}
            collapsed={collapsed}
            className={s.sider_content}
            width={mobileView ? 106 : 208}
            collapsedWidth={mobileView ? 1 : 64}
        >

            <Logo collapsed={collapsed} mobileView={ mobileView} />

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={SIDER_MENU.map(
                (item, index) => ({
                    key: String(index + 1),
                    icon: React.createElement( item.icon ),
                    label: item.label,
                }),
                )}
            />
            <Button icon={!mobileView && <ExitBtn />} title={'Выход'} className={s.btn_exit}>
                {!collapsed && 'Выход'}
            </Button>
        </Sider>
    );
};
