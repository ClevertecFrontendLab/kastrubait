import { Button, Result } from 'antd';
// import { push } from 'redux-first-history';
import { useNavigate } from 'react-router-dom';
import { RESULT_INFO } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';

import style from './result-bkock.module.scss';
import { addUserThunk, setErrors } from '@redux/reducers/header-slice';

interface IResultBlock {
    statusCode?: number | string;
}

export const ResultBlock = ({ statusCode } : IResultBlock) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = history.location;

    const result = RESULT_INFO.find((el) => el.statusCode === statusCode);

    const handleButtonClick = () => {
        if (result) {
            dispatch(setErrors(null));
            navigate(result.redirect);

            if (location.pathname === '/result/error' &&
                result.redirect === '/auth/registration') {
                const data = JSON.parse(sessionStorage.registerData);
                dispatch(addUserThunk({ data }))
            }
        }
    };

    return (
        <div className={style['result_container']}>
            {result && (
                <Result
                    status={result.status}
                    title={result.title}
                    subTitle={result.subtitle}
                    extra={[
                        <Button
                            type={'primary'}
                            key={'button-result'}
                            size='large' block
                            onClick={handleButtonClick}
                            data-test-id={result.testId}
                        >
                            {result.button}
                        </Button>,
                    ]}
                />
            )}
        </div>
    )
}
