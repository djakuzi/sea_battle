import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { refreshAccessTokenThunk } from '../../../../redux/slice/auth/asyncThunk/refreshAccessToken';

export interface InteHookAuthCheck {
    isAuthorized: boolean;
    isAuthChecked: boolean;
}

export function useAuthCheck(): InteHookAuthCheck {
    const dispatch = useDispatch<AppDispatch>();
    const { accessToken, isRefreshingFailed, isAuth } = useSelector((state: RootState) => state.auth);

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    async function checkAuth(): Promise<void> {
        if (isRefreshingFailed || !isAuth) {
            setIsAuthorized(false);
            setIsAuthChecked(true);
            return;
        }

        if (!accessToken) {
            const resultAction = await dispatch(refreshAccessTokenThunk());
            setIsAuthorized(refreshAccessTokenThunk.fulfilled.match(resultAction));
        } else {
            setIsAuthorized(true);
        }
        setIsAuthChecked(true);
    }

    useEffect(() => {
        checkAuth();
    }, [accessToken, dispatch]);

    return { isAuthorized, isAuthChecked };
}