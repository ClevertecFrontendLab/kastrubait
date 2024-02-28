import { Outlet } from 'react-router-dom';

import 'normalize.css';
import style from './layouts.module.scss';

export const AuthLayout = () => {
    return (
        <div className={style['auth_container']}>
            <div className={style['auth_container_bg']}>
                <div className={style['auth_container_bg__mask']}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
