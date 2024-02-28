import React from 'react';
import { Layout, Menu, Button, Space, Grid } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Logo } from '@components/sidebar/logo/logo';
import { ExitBtn } from './ExitBtn/exitBtn';
import { SIDER_MENU } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { logOutUser } from '@redux/reducers/header-slice';

import 'antd/dist/antd.css';
import style from './sidebar.module.scss';

type ISideBar = {
    mobileView: boolean;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
};

const { Sider } = Layout;
const { useBreakpoint } = Grid;

export const SideBar = ({ mobileView, collapsed, setCollapsed }: ISideBar) => {
    const dispatch = useAppDispatch()
    const isBreakpointMore768 = useBreakpoint().md;

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const logOutButtonHandler = () => {
        dispatch(logOutUser());
    }

    return (
        <div className={style['sider_container']}>
            <Sider
                trigger={null}
                collapsible
                theme={'light'}
                collapsed={collapsed}
                className={style['sider_content']}
                width={isBreakpointMore768 ? 208 : 106}
                collapsedWidth={isBreakpointMore768 ? 64 : 0}
            >

                <Logo collapsed={collapsed} mobileView={ mobileView} />
                <div className={style['sider_menu']}>
                    <Space size={100} direction='vertical' align='center' >
                        <Menu
                            theme="light"
                            mode="inline"
                            style={ collapsed ? { width: "64px" } : isBreakpointMore768 ? { width: "208px" } : { width: "106px" }}
                            defaultSelectedKeys={['4']}
                            items={SIDER_MENU.map(
                            (item, index) => ({
                                key: String(index + 1),
                                icon: React.createElement( item.icon ),
                                label: item.label,
                            }),
                            )}
                        />
                    </Space>
                    <Space size={100} direction='vertical' align='center' ></Space>
                    <Button
                        icon={!mobileView && <ExitBtn />}
                        title={'Выход'}
                        onClick={logOutButtonHandler}
                        className={style['btn_exit']}
                    >
                        {!collapsed && 'Выход'}
                    </Button>
                </div>
            </Sider>
            <Button
                data-test-id={ mobileView ? 'sider-switch-mobile' : 'sider-switch' }
                style={{padding: 0, border: 0}}
                type="default"
                onClick={toggleCollapsed}
                className={style['btn_switch']}
                >
                    <div className={style['sider_switch']}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </div>
            </Button>
        </div>
    );
};
