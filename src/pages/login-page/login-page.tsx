import {push} from 'redux-first-history';
import { Tabs } from 'antd';
import { AuthForm, RegisterForm } from '@components/form/authorization';
import { PATH } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import LogoFull from '@public/assets/icons/logo-full.svg';

import style from './login-page.module.scss';


interface ITypeForm {
    type: string;
}

const tab_items = [
    { label: 'Вход', key: 'signin', children: ( <AuthForm /> )},
    { label: 'Регистрация', key: 'signup', children: ( <RegisterForm /> ) },
];

export const LoginPage = ({ type } : ITypeForm) => {
    const src = LogoFull;

    const dispatch = useAppDispatch();

    const callbackTabClicked = (key: string) => {
        console.log(key);
        switch (key) {
            case 'signup':
                dispatch(push(`${PATH.AUTH}/${PATH.SIGN_UP}`));
                break;
            case 'signin':
                dispatch(push(`${PATH.AUTH}`));
                break;
        }
    };

    return (
        <div className={style['form_container']}>
            <img src={src} className={style['form_container_logo']} />

            {/* <div className={style['tab_container']}> */}
                <Tabs
                    type='line'
                    defaultActiveKey={type}
                    destroyInactiveTabPane
                    centered
                    items={tab_items}
                    // tabBarStyle={}
                    onTabClick={callbackTabClicked}
                    className={style['form_container_tabs']}
                />
            {/* </div> */}
        </div>
    );
};

