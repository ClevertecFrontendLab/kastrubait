import { AxiosError } from 'axios';

interface ErrorProps {
    message: string;
}

const ErrorHandle = (error: AxiosError<ErrorProps>): void => {
    const { response } = error;
};

export { ErrorHandle };
