import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { push } from 'redux-first-history';
import { ApiService } from '../../api/api-service.ts';
import { ErrorHandle } from '../../api/error-handle.ts';
import { IUpdateUserSlice, IAuthUser, IAuthUserSlice } from '../../interfaces/auth-user.ts';
import * as jose from 'jose';

export const addUserThunk = createAsyncThunk(
    'header/addUserThunk',
    async ({ data }: IUpdateUserSlice, thunkAPI) => {
        try {
            const response = await ApiService.registration({ data });

            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                ErrorHandle(err);
            }
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

export const authUserThunk = createAsyncThunk(
    'header/authUserThunk',
    async ({ data, rememberMe }: IAuthUserSlice, thunkAPI) => {
        try {
            const response = await ApiService.authorization({ data });
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                ErrorHandle(err);
            }
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
            }
        }
    },
);

interface HeaderState {
    isAuthUser: boolean;
    userLogin: string | null;
    status: string | null;
    error: string | undefined;
}

const initialState: HeaderState = {
    isAuthUser: false,
    userLogin: '',
    status: null,
    error: undefined,
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
        setUserLogin: (state, action: PayloadAction<string | null>) => {
            state.userLogin = action.payload;
        },
        setErrors: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },

    extraReducers: (builder) => {
        //addUserThunk
        builder
            .addCase(addUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = undefined;
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
                state.error = action.payload as string;
            });

        //authUserThunk
        builder
            .addCase(authUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(authUserThunk.fulfilled, (state, action) => {
                state.status = 'resolved';
                localStorage.setItem('token', action.payload.accessToken);
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
                state.error = action.payload as string;
            });
    },
});

export const { logOutUser, setIsAuthUser, setStatus, setErrors } = headerSlice.actions;

export default headerSlice.reducer;
