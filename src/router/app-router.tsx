import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { push } from 'redux-first-history';
import { AUTH_STATUS, LOADING_TRUE, PATH, unAuthorized } from '@constants/index';
import { setErrors } from '@redux/reducers/header-slice';
import { setIsAuthUser } from '@redux/reducers/header-slice';
import { useAppDispatch, useAppSelector } from '@redux/redux';
import { MainPage } from '@pages/main-page';
import { LoginPage } from '@pages/login-page';
import { Loader }from '@components/spinner';
import { ResultBlock } from '@components/result';
import { MainContent } from '@pages/main-page/content/main-content';
import { LoginContent } from '@pages/login-page/content/login-content';

export const AppRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
    const error = useAppSelector((state) => state.header.error);
    const status = useAppSelector((state) => state.header.status);
    // const status = 'loading';

    const isError = error === unAuthorized;

    console.log(isAuthUser, isError);

    useEffect(() => {
        if (localStorage.getItem('token')) {
          dispatch(setIsAuthUser(true));
          if (isError) {
            // navigate(`${PATH.AUTH}`);
            dispatch(push(`${PATH.AUTH}`));
            setTimeout(() => {
              dispatch(setIsAuthUser(false));
            }, 10);
            dispatch(setErrors(undefined));
            localStorage.clear();
          }
        }
      }, [dispatch, navigate, isError]);

      useEffect(() => {
        console.log('Current location is ', location);
      }, [location]);

    //   if (status === LOADING_TRUE) {
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
                    path = {PATH.MAIN}
                    element = {
                        <Suspense fallback={<Loader />}>
                            <MainPage />
                        </Suspense>
                    }
                >
                    <Route
                        index
                        element = {<MainContent />}
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
                <Route
                    path = '/'
                    element={<Navigate to={PATH.AUTH} />}
                />
                <Route
                    path = {PATH.AUTH}
                    element = {<LoginPage />}
                >
                    <Route
                        index
                        element = {<LoginContent type={'signin'} />}
                    />
                    <Route
                        path={PATH.SIGN_UP}
                        element = {<LoginContent type={'signup'} />}
                    />
                    <Route
                        path={PATH.CONFIRM_EMAIL}
                        element = {<h1>CONFIRM_EMAIL</h1>} // TODO
                    />
                    <Route
                        path={PATH.CHANGE_PASSWORD}
                        element = {<h1>CHANGE_PASSWORD</h1>} // TODO
                    />
                </Route>
                <Route
                    path = '*'
                    element={<Navigate to={PATH.AUTH} />}
                />
                <Route
                    path = {PATH.RESULT}
                    element = {<LoginPage />}
                >
                    <Route
                        path={PATH.SUCCESS}
                        element = {<ResultBlock statusCode={AUTH_STATUS.SUCCESS}  />}
                    />
                     <Route
                        path={PATH.SUCCESS_CHANGE_PASSWORD}
                        element = {<ResultBlock statusCode={AUTH_STATUS.SUCCESS_CHANGE_PASSWORD}  />}
                    />
                    <Route
                        path={PATH.ERROR}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR}  />}
                    />
                    <Route
                        path={PATH.ERROR_LOGIN}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_LOGIN}  />}
                    />
                    <Route
                        path={PATH.ERROR_CHECK_EMAIL_NO_EXIST}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_CHECK_EMAIL_NO_EXIST}  />}
                    />
                    <Route
                        path={PATH.ERROR_CHECK_EMAIL}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_CHECK_EMAIL}  />}
                    />
                    <Route
                        path={PATH.ERROR_CHANGE_PASSWORD}
                        element = {<ResultBlock statusCode={AUTH_STATUS.ERROR_CHANGE_PASSWORD}  />}
                    />
                </Route>
            </Routes>
        </>
    );
};
