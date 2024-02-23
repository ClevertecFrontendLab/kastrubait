import React from 'react';
import { Tabs } from 'antd';
import { AuthForm, RegisterForm } from '@components/form';
import LogoFull from '@public/assets/icons/logo-full.svg';

import s from './login-page.module.scss';

const tab_items = [
    { label: 'Вход', key: '2', children: ( <AuthForm /> )},
    { label: 'Регистрация', key: '1', children: ( <RegisterForm /> ) },
];

export const LoginPage: React.FC = () => {
    const src = LogoFull;
    return (
        <div className={s.login_container}>
            <div className={s.form_container}>
                <img src={src} className={s['logo']} />

                <div className={s.tab_container}>
                    <Tabs
                        type='card'
                        defaultActiveKey='1'
                        centered
                        items={tab_items}
                        // tabBarStyle={}
                        className={s['auth_tabs']}
                    />
                </div>
            </div>
        </div>
    );
};
