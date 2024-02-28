import React, { useEffect, useState } from 'react';
import { Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import style from './confirm-email.module.scss';

const { Text } = Typography;

export const ConfirmEmail = () => {

    const { userLogin } = useAppSelector(state => state.header);

    const [isError, setIsError] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<string>('');

    const navigate = useNavigate();

    const verificationCodeChange = (code: string) => {
        setIsError(false);
        setVerificationCode(code);
        if (code.length === 6) {
            // ConfirmEmail({ code, userLogin });
        }
    };

    return (
        <div className={style['confirm_block']}>
            <Result
                status={isError ? 'error' : undefined}
                title={
                    isError
                        ? 'Неверный код. Введите код для восстановления аккаунта'
                        : 'Введите код для восстановления аккаунта'
                }
                subTitle={`Мы отправили вам на e-mail ${userLogin} шестизначный код. Введите его в поле ниже.`}
                extra={[
                    <div data-test-id='verification-input'>
                        <VerificationInput
                            placeholder=''
                            classNames={{
                                container: 'container',
                                character: isError ? 'character_error' : 'character',
                                characterInactive: 'character--inactive',
                                characterSelected: 'character--selected',
                                characterFilled: 'character--filled',
                            }}
                            onChange={verificationCodeChange}
                            value={verificationCode}
                            length={6}
                        />
                    </div>
                ]}
            />
            <div className={style['confirm_notification']}>
                <Text type='secondary'>Не пришло письмо? Проверьте папку Спам.</Text>
            </div>
        </div>
    );
}
