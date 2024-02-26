import React from 'react';
import { Space, Button, Checkbox, Form, Input } from 'antd';
import Google from '@public/assets/icons/google.svg';
import {useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { authUserThunk } from '@redux/reducers/header-slice';

import 'antd/dist/antd.css';
import style from './form.module.scss';
import { IAuthUser } from 'src/interfaces/auth-user';

interface IFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const AuthForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const onFinish = (values: IFormValues) => {
    // console.log('Received values of form: ', values);
    const { email, password, rememberMe } = values;
    const data: IAuthUser = {
        email: email,
        password: password,
    }

    dispatch(authUserThunk({ data, rememberMe}))
  };

  const handleButtonClick = () => {
    form.validateFields().then().catch(err => console.log(err))
};

  return (
    <Form
      name='normal_login'
      form={form}
      autoComplete='off'
      scrollToFirstError
      className={style['form_auth']}
      initialValues={{ rememberMe: true }}
      onFinish={onFinish}
    //   onFinish={onFinish}
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
            <span className={style['help']}>
                Пароль не менее 8 символов, с заглавной буквой и цифрой
            </span>
        }
        rules={[
            {
                required: true,
                min: 8,
                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
            },
        ]}
      >
        <Input.Password
            data-test-id='login-password'
            autoComplete='new-password'
            placeholder='Пароль'
        />
      </Form.Item>
      <div className={style['form_check_area']}>
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
        >
            Забыли пароль?
        </Button>
      </div>

      <Space direction='vertical' size={16} className={style['form_buttons']}>
        <Button
            data-test-id='login-submit-button'
            type={'primary'}
            htmlType={'submit'}
            size='large' block
            onClick={handleButtonClick}
            > Войти
        </Button>
        <Button
            type={'default'}
            size='large' block
            >   <img className={style['form_svg_google']}
                     src={Google}
                     height={'10px'}
                     alt={'google'}/>
                Войти через Google
        </Button>
      </Space>
    </Form>
  );
};
