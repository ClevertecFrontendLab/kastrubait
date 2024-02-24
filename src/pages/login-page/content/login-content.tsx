import { Tabs } from 'antd';
import { AuthForm, RegisterForm } from '@components/form';
import LogoFull from '@public/assets/icons/logo-full.svg';

import style from './login-content.module.scss';

interface ITypeForm {
    type: string;
}

const tab_items = [
    { label: 'Вход', key: 'signin', children: ( <AuthForm /> )},
    { label: 'Регистрация', key: 'signup', children: ( <RegisterForm /> ) },
];

export const LoginContent = ({ type } : ITypeForm) => {
    const src = LogoFull;
    return (
        <div className={style['form_container']}>
            <img src={src} className={style['logo']} />

            <div className={style['tab_container']}>
                <Tabs
                    type='card'
                    defaultActiveKey={type}
                    centered
                    items={tab_items}
                    // tabBarStyle={}
                    className={style['auth_tabs']}
                />
            </div>
        </div>
    );
};
