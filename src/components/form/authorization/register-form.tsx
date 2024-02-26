import React from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Button, Form, Input } from 'antd';
import Google from '@public/assets/icons/google.svg';

import 'antd/dist/antd.css';
import style from './form.module.scss';


export const RegisterForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name='normal_login'
      className={style['form_auth']}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[
            {
                required: true,
                type: 'email',
                message: 'Не верный формат email',
            },
        ]}
      >
        <Input
            data-test-id='login-email'
            addonBefore={'e-mail:'}
             />
      </Form.Item>
      <Form.Item
        name='password'
        help={
            <div className={style['help']}>
                Пароль не менее 8 символов, с заглавной буквой и цифрой
            </div>
        }
        rules={[
            {
                required: true,
                min: 8,
                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
            },
            { message: 'Пароль должен содержать как минимум 1 цифру, 1 латинскую строчную и одну заглавную букву' },
        ]}
      >
        <Input.Password
            data-test-id='registration-password'
            autoComplete='new-password'
            placeholder='Пароль'
        />
      </Form.Item>
      <Form.Item
        name='confirm'
        dependencies={['password']}
        rules={[
            {
                required: true,
                message: <span style={{ fontSize: '12px' }}></span>,
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject('Пароли не совпадают');
                },
            }),
        ]}
        style={{marginBottom: '40px'}}
      >
        <Input.Password
            data-test-id='registration-confirm-password'
            autoComplete='new-password'
            placeholder='Повторите пароль'
        />
      </Form.Item>

      <Space direction='vertical' size={16} className={style['form_buttons']}>
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
            >   <img className={style['form_svg_google']}
                     src={Google}
                     height={'10px'}
                     alt={'google'}/>
                Регистрация через Google
        </Button>
      </Space>
    </Form>
  );
};
