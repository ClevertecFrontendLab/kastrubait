import React from 'react';
import { Card, Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import s from './main-footer.module.scss';

export const MainFooter: React.FC = () => {

    return (
        <div className={s.main_footer}>
           <Button type='text' className={s.footer_review}>Смотреть отзывы</Button>
           <Card bordered={false} className={s.footer_card}>
                <p className={s.card_title}>Скачать на телефон</p>
                <p className={s.card_text}>Доступно в PRO-тарифе</p>
                <div className={s.card_fone}>
                    <Button type='text' icon={<AndroidFilled />}>Android OS</Button>
                    <Button type='text' icon={<AppleFilled />}>Apple iOS</Button>
                </div>
            </Card>
        </div>
    );
};
