import React from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Button, Checkbox, Form, Input } from 'antd';
import Google from '@public/assets/icons/google.svg';

import 'antd/dist/antd.css';
import s from './form.module.scss';


export const AuthForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const [form] = Form.useForm();

  return (
    <Form
      name='normal_login'
      form={form}
      onFinish={onFinish}
      autoComplete='off'
      scrollToFirstError
      className={s['form_auth']}
      initialValues={{ rememberMe: true }}
    //   onFinish={onFinish}
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
            data-test-id='login-password'
            // prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Пароль'
        />
      </Form.Item>
      <div className={s['form_check_area']}>
        <Form.Item name='rememberMe' valuePropName='checked' noStyle>
            <Checkbox
                data-test-id='login-remember'
                defaultChecked={false}
            >
                Запомнить меня
            </Checkbox>
        </Form.Item>

        <Button
            data-test-id='login-forgot-button'
            type={'link'}
            // onClick={verifyCheckEmail}
            // disabled
            className={s['body_regular_16']}>
            Забыли пароль?
        </Button>
      </div>

      <Space direction='vertical' size={16} className={s['form_buttons']}>
        <Button
            data-test-id='login-submit-button'
            type={'primary'}
            htmlType={'submit'}
            size='large' block
            // onClick={handleButtonClick}
            > Войти
        </Button>
        <Button
            type={'default'}
            size='large' block
            >   <img className={s['form_svg_google']}
                     src={Google}
                     height={'10px'}
                     alt={'google'}/>
                Войти через Google
        </Button>
      </Space>
    </Form>
  );
};
