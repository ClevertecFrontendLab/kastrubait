import { useEffect } from 'react';
import { Space, Button, Form, Input } from 'antd';
import Google from '@public/assets/icons/google.svg';
import { push } from 'redux-first-history';
import {useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { IAuthUser } from 'src/interfaces/auth-user';
import { addUserThunk, setUserData } from '@redux/reducers/header-slice';
import { AUTH_STATUS, PATH } from '@constants/index';


import 'antd/dist/antd.css';
import style from './form.module.scss';

export const RegisterForm = () => {

    const dispatch = useAppDispatch();
    const { responseCode, error } = useAppSelector(state => state.header);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const { email, password } = values;
        const data: IAuthUser = {
            email: email,
            password: password,
        }
        sessionStorage.setItem('registerData', JSON.stringify(data));
        dispatch(setUserData( { data }));
        dispatch(addUserThunk({ data }))
    };

    const handleButtonClick = () => {
            form.validateFields().then().catch(err => console.log( 'err', err))
        };

    useEffect(() => {
        if (
            error?.statusCode !== null
        ) {
            switch (error?.route) {
                case 'registration':
                    if (error?.statusCode === AUTH_STATUS.ERROR_409) {
                        dispatch(push(`${PATH.RESULT}/${PATH.ERROR_USER_EXIT}`, {fromServer: true}));
                        break;
                    }
                    dispatch(push(`${PATH.RESULT}/${PATH.ERROR}`, {fromServer: true}));
                    break;
                }
        }
        if (responseCode === 201) {
            dispatch(push(`${PATH.RESULT}/${PATH.SUCCESS}`, {fromServer: true}));
        }
    }, [error, responseCode, dispatch] );

  return (
    <Form
      name='normal_login'
      form={form}
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
        onClick={handleButtonClick}
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
