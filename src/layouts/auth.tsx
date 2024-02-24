import { Outlet } from 'react-router-dom';

import 'normalize.css';
import style from './layouts.module.scss';
import { Layout } from 'antd';

export const AuthLayout = () => {
    return (
        <>
        <Layout className={style['auth_conteiner']}>

            <div className={style['auth_content']}>
                <div id={style['mask']}>
                  <Outlet />
                </div>
            </div>
        </Layout>
        </>
    );
};
