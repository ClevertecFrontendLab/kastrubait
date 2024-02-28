import React, { useEffect, useState } from 'react';
import { Space, Button, Checkbox, Form, Input } from 'antd';
import Google from '@public/assets/icons/google.svg';
import { push } from 'redux-first-history';
import {useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authUserThunk, checkEmailThunk } from '@redux/reducers/header-slice';
import { history } from '@redux/configure-store';
import { IAuthUser } from 'src/interfaces/auth-user';
import { PATH } from '@constants/index';

import 'antd/dist/antd.css';
import style from './form.module.scss';

interface IFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const AuthForm: React.FC = () => {

    const location = history.location;
    const dispatch = useAppDispatch();
    const { responseCode, responseRoute, error } = useAppSelector(state => state.header);

    const [form] = Form.useForm();

    const [email, setEmail] = useState<string>('');

    const onFinish = (values: IFormValues) => {
        const { email, password, rememberMe } = values;
        const data: IAuthUser = {
            email: email,
            password: password,
        }

        dispatch(authUserThunk({ data, rememberMe}))
    };

    const handleForgotPass = () => {
        if (email) {
            // const values = form.getFieldsValue();

            dispatch(checkEmailThunk( { email } ));
        }
    };

    const handleButtonClick = () => {
        form.validateFields().then().catch(err => console.log(err))
    };

    useEffect(() => {
        switch (error?.route) {
            case 'login':
                dispatch(push(`${PATH.RESULT}/${PATH.ERROR_LOGIN}`, {fromServer: true}));
                break;
            case 'checkEmail':
                if (error?.statusCode === 404 && error?.message === 'Email не найден') {
                    dispatch(push(`${PATH.RESULT}/${PATH.ERROR_CHECK_EMAIL_NO_EXIST}`, {fromServer: true}));
                    break;
                }
                dispatch(push(`${PATH.RESULT}/${PATH.ERROR_CHECK_EMAIL}`, {fromServer: true}));
                break;
            case 'changePassword':
                dispatch(push(`${PATH.RESULT}/${PATH.ERROR_CHANGE_PASSWORD}`, {fromServer: true}));
                break;
            }
        if (responseCode === 200 && responseRoute === 'login') {
            dispatch(push(`${PATH.RESULT}/${PATH.SUCCESS}`, {fromServer: true}));
        }
        if (responseCode === 200 && responseRoute === 'checkEmail') {
            dispatch(push(`${PATH.AUTH}/${PATH.CHANGE_PASSWORD}`, {fromServer: true}));
        }
        if (responseCode === 201 && responseRoute === 'changePassword') {
            dispatch(push(`${PATH.RESULT}/${PATH.SUCCESS_CHANGE_PASSWORD}`, {fromServer: true}));
        }
        }, [error, responseCode, dispatch] );

  return (
    <Form
      name='normal_login'
      form={form}
      autoComplete='off'
      scrollToFirstError
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
                // message: 'Не верный формат email'
                validator(_, value) {
                    if (String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                        setEmail(value);
                        return Promise.resolve();
                    } else {
                        setEmail('')
                        return Promise.reject();
                    }
            },}
        ]}
      >
        <Input
            data-test-id='login-email'
            addonBefore={'e-mail:'}
        />
      </Form.Item>
      <Form.Item
        name='password'
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
            onClick={handleForgotPass}
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
