import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { IChangePassSlice } from 'src/interfaces/auth-user';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import style from './chanhe-password.module.scss';

export const ChangePassword = () => {
    const [form] = Form.useForm<IChangePassSlice>();
    const { userLogin } = useAppSelector(state => state.header);

    const navigate = useNavigate();

    const onFinish = (values: IChangePassSlice) => {
        // repeatRegister({ userLogin, password: values.password });
    };

    return (
        <div className={style['change_password_container']}>
            <Form
                form={form}
                name='normal_login'
                className={style['form_change_pass']}
                onFinish={onFinish}
            >
                <h3 className={style['form_title']}>Восстановление аккауанта</h3>
                <Form.Item
                    name='password'
                    help={
                        <div className={style['help']}>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </div>
                    }
                    rules={[
                        {
                            min: 8,
                            pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
                        },
                        { message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
                    ]}
                >
                    <Input.Password
                        data-test-id='change-password'
                        placeholder='Пароль'
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        size={'large'}
                    />
                </Form.Item>

                <Form.Item
                    name='confirmPassword'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: <span style={{ fontSize: '12px' }}>Обязательное поле!</span>,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        data-test-id='change-confirm-password'
                        placeholder='Повторите пароль'
                        size='large'
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: '0' }} shouldUpdate>
                    {() => (
                        <Button
                            data-test-id='change-submit-button'
                            type={'primary'}
                            htmlType={'submit'}
                            className={style['form_buttons']}

                            disabled={
                                !form.isFieldsTouched(['password', 'confirm']) ||
                                !!form
                                    .getFieldsError(['password', 'confirm'])
                                    .filter(({ errors }) => errors.length).length
                            }
                        >
                            Сохранить
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}
