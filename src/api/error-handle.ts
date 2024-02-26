import { AUTH_STATUS, PATH } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

import { IErrorPayload } from 'src/interfaces/auth-user';

const ErrorHandle = (error: IErrorPayload): void => {
    const { statusCode, message, route } = error;
    const dispatch = useAppDispatch();

    switch (route) {
        case 'login':
            dispatch(push(`${PATH.RESULT}/${PATH.ERROR_LOGIN}`, {fromServer: true}))
            break;
        case 'registration':
            if (statusCode === AUTH_STATUS.ERROR_409) {
                dispatch(push(`${PATH.RESULT}/${PATH.ERROR_USER_EXIT}`, {fromServer: true}));
                break;
            }
            dispatch(push(`${PATH.RESULT}/${PATH.ERROR}`, {fromServer: true}));
            break;
        case 'checkEmail':
            if (statusCode === AUTH_STATUS.ERROR_404 && message === 'Email не найден') {
                dispatch(push(`${PATH.RESULT}/${PATH.ERROR_CHECK_EMAIL_NO_EXIST}`, {fromServer: true}));
                break;
            }
            dispatch(push(`${PATH.RESULT}/${PATH.ERROR_CHECK_EMAIL}`, {fromServer: true}));
            break;
        case 'confirmEmail':
            // TODO
            break;
        case 'changePassword':
            dispatch(push(`${PATH.RESULT}/${PATH.ERROR_CHANGE_PASSWORD}`, {fromServer: true}));
            break;
    }

};

export { ErrorHandle };
