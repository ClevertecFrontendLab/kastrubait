import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import { PATH, RESULT_INFO } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import style from './result-bkock.module.scss';

interface IResultBlock {
    statusCode?: number | string;
}

// interface ClassMap {
//     [key: string]: string;
// }

export const ResultBlock = ({ statusCode } : IResultBlock) => {

    const dispatch = useAppDispatch();
    const result = RESULT_INFO.find((el) => el.statusCode === statusCode);

    const handleButtonClick = () => {
        if (result) dispatch(push(result.redirect));
    };

    // const classMap: ClassMap = {
    //     [PATH.ERROR_CHECK_EMAIL_NO_EXIST]: style['auth_check_email'],
    //     [PATH.ERROR_CHECK_EMAIL]: style['auth_check_email'],
    // };

    // const className = statusCode ? classMap[statusCode] : style['auth_status'];

    return (
        <div className={style['result_container']}>
            {result && (
                <Result
                    // className={className}
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
