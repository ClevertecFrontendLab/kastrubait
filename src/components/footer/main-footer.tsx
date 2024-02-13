import React from 'react';
import { Card, Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './main-footer.module.scss';

export const MainFooter: React.FC = () => {

    return (
        <div className='main_footer'>
           <Button type='text' className='footer_review'>Смотреть отзывы</Button>
           <Card bordered={false} className='footer_card'>
                <p className='card-title'>Скачать на телефон</p>
                <p className='card-text'>Доступно в PRO-тарифе</p>
                <div className='card-fone'>
                    <Button type='text' icon={<AndroidFilled />}>Android OS</Button>
                    <Button type='text' icon={<AppleFilled />}>Apple iOS</Button>
                </div>
            </Card>
        </div>
    );
};
