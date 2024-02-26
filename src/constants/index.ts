import { IdcardOutlined, TrophyFilled, HeartFilled, CalendarOutlined } from '@ant-design/icons';
import { ResultsInfo } from 'src/interfaces/auth-user';

export const SIDER_MENU: { key: string; icon: React.ComponentType; label: string }[] = [
    { key: '1', icon: CalendarOutlined, label: 'Календарь' },
    { key: '2', icon: HeartFilled, label: 'Тренировки' },
    { key: '2', icon: TrophyFilled, label: 'Достижения' },
    { key: '2', icon: IdcardOutlined, label: 'Профиль' },
];

export const ACTION_CARD: {
    key: string;
    icon: React.ComponentType;
    title: string;
    buttonText: string;
}[] = [
    { key: '1', icon: HeartFilled, title: 'Расписать тренировки', buttonText: 'Тренировки' },
    { key: '2', icon: CalendarOutlined, title: 'Назначить календарь', buttonText: 'Календарь' },
    { key: '3', icon: IdcardOutlined, title: 'Заполнить профиль', buttonText: 'Профиль' },
];

export const enum NAVIGATION {
    Home = 'Главная',
}

export const enum PATH {
    MAIN = '/main',
    AUTH = '/auth',
    RESULT = '/result',
    SIGN_UP = 'registration',
    CONFIRM_EMAIL = 'confirm-email',
    CHANGE_PASSWORD = 'change-password',
    SUCCESS = 'success',
    SUCCESS_CHANGE_PASSWORD = 'success-change-password',
    ERROR = 'error',
    ERROR_LOGIN = 'error-login',
    ERROR_USER_EXIT = 'error-user-exist',
    ERROR_CHECK_EMAIL = 'error-check-email',
    ERROR_CHECK_EMAIL_NO_EXIST = 'error-check-email-no-exist',
    ERROR_CHANGE_PASSWORD = 'error-change-password',
}

export const enum AUTH_STATUS {
    ERROR_409 = 409,
    ERROR = 'error',
    ERROR_LOGIN = 'error-login',
    ERROR_404 = 404,
    ERROR_CHECK_EMAIL = 'error-check-email',
    ERROR_CHECK_EMAIL_NO_EXIST = 'error-check-email-no-exist',
    ERROR_CHANGE_PASSWORD = 'change-password',
    SUCCESS = 'success',
    SUCCESS_CHANGE_PASSWORD = 'success-change-password',

}

export const LOADING_TRUE = 'loading';

export const unAuthorized = 401;

export const RESULT_INFO: ResultsInfo[] = [
    {
        statusCode: AUTH_STATUS.ERROR_409,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        button: 'Назад к регистрации',
        redirect: `${PATH.AUTH}/${PATH.SIGN_UP}`,
        testId: 'registration-back-button',
    },
    {
        statusCode: AUTH_STATUS.ERROR,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        button: 'Повторить',
        redirect: `${PATH.AUTH}/${PATH.SIGN_UP}`,
        testId: 'registration-retry-button',
    },
    {
        statusCode: AUTH_STATUS.SUCCESS,
        status: 'success',
        title: 'Регистрация успешна',
        subtitle:
            'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        button: 'Войти',
        redirect: PATH.AUTH,
        testId: 'registration-enter-button',
    },
    {
        statusCode: AUTH_STATUS.ERROR_LOGIN,
        status: 'warning',
        title: 'Вход не выполнен',
        subtitle: 'Что-то пошло не так. Попробуйте еще раз',
        button: 'Повторить',
        redirect: PATH.AUTH,
        testId: 'login-retry-button',
    },
    {
        statusCode: AUTH_STATUS.ERROR_CHECK_EMAIL_NO_EXIST,
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subtitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        button: 'Попробовать снова',
        redirect: PATH.AUTH,
        testId: 'check-retry-button',
    },
    {
        statusCode: AUTH_STATUS.ERROR_CHECK_EMAIL,
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        button: 'Назад',
        redirect: PATH.AUTH,
        testId: 'check-back-button',
    },
    {
        statusCode: AUTH_STATUS.ERROR_CHANGE_PASSWORD,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так. Попробуйте ещё раз',
        button: 'Повторить',
        redirect: `${PATH.AUTH}/${PATH.CHANGE_PASSWORD}`,
        testId: 'change-retry-button',
    },
    {
        statusCode: AUTH_STATUS.SUCCESS_CHANGE_PASSWORD,
        status: 'success',
        title: 'Пароль успешно изменен',
        subtitle: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        button: 'Вход',
        redirect: PATH.AUTH,
        testId: 'change-entry-button',
    },
];
