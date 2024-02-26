import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
// import { push } from 'redux-first-history';
import { ApiService } from '../../api/api-service.ts';
import { ErrorHandle } from '../../api/error-handle.ts';
import { IUpdateUserSlice, IErrorPayload, IHeaderState, ICheckEmailSlice, IConfirmEmailSlice, IChangePassSlice } from '../../interfaces/auth-user.ts';
import * as jose from 'jose';

export const addUserThunk = createAsyncThunk(
    'header/registrationStatus',
    async ({ data }: IUpdateUserSlice, thunkAPI) => {
        try {
            const response = await ApiService.registration({ data });
            thunkAPI.dispatch(setResponseCode(201));
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorResponse: IErrorPayload = {
                    statusCode: err?.response?.status || 500,
                    error: err?.response?.data?.error,
                    message: err?.response?.data?.message,
                };
                ErrorHandle(errorResponse);
            }
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

export const authUserThunk = createAsyncThunk(
    'header/authorizationStatus',
    async ({ data, rememberMe }: IUpdateUserSlice, thunkAPI) => {
        try {
            const response = await ApiService.authorization({ data });
            thunkAPI.dispatch(setResponseCode(200));
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorResponse: IErrorPayload = {
                    statusCode: err?.response?.status || 500,
                    error: err?.response?.data?.error || 'Unknown Error',
                    message: err?.response?.data?.message || 'An error occurred',
                };
                ErrorHandle(errorResponse);
            }
            if (err instanceof Error) {
                console.log('Error ', err)
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

export const checkEmailThunk = createAsyncThunk(
    'header/checkEmailStatus',
    async (params: ICheckEmailSlice, thunkAPI) => {
        try {
            const response = await ApiService.checkEmail(params);
            thunkAPI.dispatch(setResponseCode(200));
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorResponse: IErrorPayload = {
                    statusCode: err?.response?.status || 500,
                    error: err?.response?.data?.error,
                    message: err?.response?.data?.message,
                };
                ErrorHandle(errorResponse);
            }
            if (err instanceof Error) {
                console.log('Error ', err)
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

export const confirmEmailThunk = createAsyncThunk(
    'header/checkEmailStatus',
    async (params: IConfirmEmailSlice, thunkAPI) => {
        try {
            const response = await ApiService.confirmEmail(params);
            thunkAPI.dispatch(setResponseCode(200));
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorResponse: IErrorPayload = {
                    statusCode: err?.response?.status || 500,
                    error: err?.response?.data?.error,
                    message: err?.response?.data?.message,
                };
                ErrorHandle(errorResponse);
            }
            if (err instanceof Error) {
                console.log('Error ', err)
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

export const changePasswordThunk = createAsyncThunk(
    'header/changePasswordStatus',
    async (params: IChangePassSlice, thunkAPI) => {
        try {
            const response = await ApiService.changePassword(params);
            thunkAPI.dispatch(setResponseCode(201));
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorResponse: IErrorPayload = {
                    statusCode: err?.response?.status || 500,
                    error: err?.response?.data?.error,
                    message: err?.response?.data?.message,
                };
                ErrorHandle(errorResponse);
            }
            if (err instanceof Error) {
                console.log('Error ', err)
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

const initialState: IHeaderState = {
    isAuthUser: false,
    userLogin: '',
    password: '',
    rememberMe: true,
    responseCode: 0,
    status: null,
    error: null,
};
export const headerSlice = createSlice({
    name: 'header',

    initialState,
    reducers: {
        logOutUser: (state) => {
            state.isAuthUser = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userLogin');
        },
        setIsAuthUser: (state, action: PayloadAction<boolean>) => {
            state.isAuthUser = action.payload;
        },
        setStatus: (state, action: PayloadAction<string | null>) => {
            state.status = action.payload;
        },
        setResponseCode: (state, action: PayloadAction<number>) => {
            state.responseCode = action.payload;
        },
        setUserData: (state, action: PayloadAction<IUpdateUserSlice>) => {
            state.userLogin = action.payload.data.email;
            state.password = action.payload.data.password;
            state.rememberMe = action.payload.rememberMe as boolean;
        },
        setErrors: (state, action: PayloadAction<IErrorPayload | null>) => {
            state.error = action.payload;
        },
    },

    extraReducers: (builder) => {
        //addUserThunk
        builder
            .addCase(addUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addUserThunk.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.userLogin = action.payload.email;
                localStorage.setItem('userLogin', action.payload.email);
                state.isAuthUser = false;
                state.status = null;
            })
            .addCase(addUserThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as IErrorPayload;
            });

        //authUserThunk
        builder
            .addCase(authUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(authUserThunk.fulfilled, (state, action) => {
                state.status = 'resolved';
                if (state.rememberMe) {
                    localStorage.setItem('token', action.payload.accessToken);
                } else {
                    sessionStorage.setItem('token', action.payload.accessToken);
                }

                state.userLogin = localStorage.getItem('userLogin');
                if (action.payload.accessToken && !state.userLogin) {
                    const claims = jose.decodeJwt(action.payload.accessToken);
                    state.userLogin = claims.email as string;
                    localStorage.setItem('userLogin', state.userLogin);
                }
                state.isAuthUser = true;
                state.status = null;
            })
            .addCase(authUserThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.isAuthUser = false;
                state.error = action.payload as IErrorPayload;
            });
    },
});

export const { logOutUser, setIsAuthUser, setStatus, setErrors, setResponseCode, setUserData } = headerSlice.actions;

export default headerSlice.reducer;
