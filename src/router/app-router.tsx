import { Suspense, useEffect, lazy } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { push } from 'redux-first-history';
import { AUTH_STATUS, LOADING_TRUE, PATH, unAuthorized } from '@constants/index';
import { setErrors } from '@redux/reducers/header-slice';
import { setIsAuthUser } from '@redux/reducers/header-slice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { MainPage } from '@pages/main-page';
import { LoginPage } from '@pages/login-page';
import { Loader }from '@components/spinner';
import { ResultBlock } from '@components/result';
import { MainLayout } from '../layouts/main';
import { AuthLayout } from '../layouts/auth';
import { ConfirmEmail } from '@components/form/confirm-email';

// const MainPage = lazy(() => import('@pages/main-page/main-page') );

export const AppRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
    const error = useAppSelector((state) => state.header.error);
    // const status = useAppSelector((state) => state.header.status);

    const isError = error?.statusCode === unAuthorized;

    useEffect(() => {
        if (localStorage.getItem('token')) {
          dispatch(setIsAuthUser(true));
          if (isError) {
            dispatch(push(`${PATH.AUTH}`));
            navigate(`${PATH.AUTH}`);
            setTimeout(() => {
              dispatch(setIsAuthUser(false));
            }, 10);
            dispatch(setErrors(null));
            localStorage.clear();
          }
        }
      }, [dispatch, navigate, isError]);

      useEffect(() => {
        console.log('Current location is ', location);
      }, [location]);

    // if (status === LOADING_TRUE) {
    //     return <Loader />;
    //   }

    return isAuthUser ? (
        //PrivateRoutes
        <>
            <Routes>
                <Route
                    path = '/'
                    element={<Navigate to={PATH.MAIN} />}
                />
                <Route
                    // path = {PATH.MAIN}
                    element = {
                        <Suspense fallback={<Loader />}>
                            <MainLayout />
                        </Suspense>
                    }
                >
                    <Route
                        path = {PATH.MAIN}
                        element = {<MainPage />}
                    />
                </Route>
                <Route
                    path = '*'
                    element={<Navigate to={PATH.MAIN} />}
                />
            </Routes>
        </>
    ) : (
        <>
            <Routes>
                <Route path = '/' element={<Navigate to={PATH.AUTH} />} />
                <Route element = {<AuthLayout />} >
                    <Route
                        path = {PATH.AUTH}
                        element = {<LoginPage type={'signin'} />}
                    />
                    <Route
                        path={`${PATH.AUTH}/${PATH.SIGN_UP}`}
                        element = {<LoginPage type={'signup'} />}
                    />
                    <Route
                        path={`${PATH.AUTH}/${PATH.CONFIRM_EMAIL}`}
                        element = {<ConfirmEmail />}
                    />
                    <Route
                        path={`${PATH.AUTH}/${PATH.CHANGE_PASSWORD}`}
                        element = {<h1>CHANGE_PASSWORD</h1>} // TODO
                    />
                    <Route
                        path={`${PATH.RESULT}/${PATH.SUCCESS}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.SUCCESS}  />}
                    />
                     <Route
                        path={`${PATH.RESULT}/${PATH.SUCCESS_CHANGE_PASSWORD}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.SUCCESS_CHANGE_PASSWORD}  />}
                    />
                    <Route
                        path={`${PATH.RESULT}/${PATH.ERROR}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR}  />}
                    />
                     <Route
                        path={`${PATH.RESULT}/${PATH.ERROR_USER_EXIT}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_409}  />}
                    />
                    <Route
                        path={`${PATH.RESULT}/${PATH.ERROR_LOGIN}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_LOGIN}  />}
                    />
                    <Route
                        path={`${PATH.RESULT}/${PATH.ERROR_CHECK_EMAIL_NO_EXIST}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_CHECK_EMAIL_NO_EXIST}  />}
                    />
                    <Route
                        path={`${PATH.RESULT}/${PATH.ERROR_CHECK_EMAIL}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_CHECK_EMAIL}  />}
                    />
                    <Route
                        path={`${PATH.RESULT}/${PATH.ERROR_CHANGE_PASSWORD}`}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_CHANGE_PASSWORD}  />}
                    />
                </Route>
                <Route path = '*' element={<Navigate to={PATH.AUTH} />} />
            </Routes>
        </>
    );
};
