import React from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Button, Form, Input } from 'antd';
import Google from '@public/assets/icons/google.svg';

import 'antd/dist/antd.css';
import s from './form.module.scss';


export const RegisterForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
            data-test-id='login-email'
            addonBefore={'e-mail:'}
            // prefix={<UserOutlined className='site-form-item-icon' />}
             />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
            data-test-id='registration-password'
            // prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Пароль'
        />
      </Form.Item>
      <Form.Item
        name='match'
        rules={[{ required: true, message: 'Please confirm your Password!' }]}
      >
        <Input
            data-test-id='registration-confirm-password'
            // prefix={<LockOutlined className='site-form-item-icon' />}
            // type='password'
            placeholder='Повторите пароль'
        />
      </Form.Item>

      <Space direction='vertical' size={16} className={s['form_buttons']}>
      <Button
        data-test-id='registration-submit-button'
        type={'primary'}
        htmlType={'submit'}
        size='large' block
        // onClick={handleButtonClick}
        // disabled={errors.length !== 0}
        >
            Войти
        </Button>
        <Button
            type={'default'}
            size='large' block
            >   <img className={s['form_svg_google']}
                     src={Google}
                     height={'10px'}
                     alt={'google'}/>
                Регистрация через Google
        </Button>
      </Space>
    </Form>
  );
};
