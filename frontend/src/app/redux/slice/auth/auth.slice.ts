import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { IntrPlayerFull } from '../../../common/types/Player.interface';
import { signInThunk } from './asyncThunk/signIn';
import { registerThunk } from './asyncThunk/register';
import { refreshAccessTokenThunk } from './asyncThunk/refreshAccessToken';
import { signOutThunk } from './asyncThunk/signOut';
import { loadStateLocalStorage } from '../../../common/script/utils/localStorage';
import { ResponseAuth, ResponseRefresh } from '../../../network/api/client.api/services/Auth/types/Response.interface';
import { updateToken } from './reducers/updateToken';
import { logout } from './reducers/logout';

export interface initialStateAuth {
    isAuth: boolean;
    accessToken: string | null;
    player: IntrPlayerFull | null;
    loading: boolean;
    error: string | null;
    isRefreshing: boolean,
    isRefreshingFailed: boolean;
}

export const KEY_IS_AUTH = 'is-auth';

const initialState: initialStateAuth = {
    isAuth: loadStateLocalStorage<boolean>(KEY_IS_AUTH) ?? false,
    accessToken: null,
    player: null,
    loading: false,
    error: null,
    isRefreshing: false,
    isRefreshingFailed: false,
};

const sliceAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateToken,
        logout,
    },
    extraReducers: (builder) => {
        builder
            //sign-in
            .addCase(signInThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInThunk.fulfilled, (state, action: PayloadAction<ResponseAuth>) => {
                state.isAuth = true;
                state.isRefreshingFailed = false;
                state.error = null;
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.player = action.payload.player;
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.isAuth = false;
                state.loading = false;
                state.error = action.payload as string;
            })
            //register
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<ResponseAuth>) => {
                state.isAuth = true;
                state.error = null;
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.player = action.payload.player;
                state.isRefreshingFailed = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.isAuth = false;
                state.loading = false;
                state.error = action.payload as string;
            })
            //refresh token
            .addCase(refreshAccessTokenThunk.pending, (state) => {
                state.isRefreshing = true;
                state.error = null;
            })
            .addCase(refreshAccessTokenThunk.fulfilled, (state, action: PayloadAction<ResponseRefresh>) => {
                state.isRefreshing = false;
                state.isRefreshingFailed = false;
                state.error = null;
                state.accessToken = action.payload.accessToken;
                state.player = action.payload.player;
            })
            .addCase(refreshAccessTokenThunk.rejected, (state, action) => {
                state.isAuth = false;
                state.isRefreshing = false;
                state.isRefreshingFailed = true;
                state.error = action.payload ?? 'Вы не авторизованы';
                state.accessToken = null;
                state.player = null;
            })
            //signOut
            .addCase(signOutThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signOutThunk.fulfilled, (state) => {
                state.isAuth = false;
                state.error = null;
                state.player = null;
                state.accessToken = null;
                state.loading = false;
            })
            .addCase(signOutThunk.rejected, (state) => {
                state.isAuth = false;
                state.loading = false;
                state.error = 'Вы не авторизованы';
                state.accessToken = null;
                state.player = null;
            });
    },
});

export const actionsBattle = sliceAuth.actions;
export default sliceAuth.reducer;
