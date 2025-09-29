import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { refreshAccessTokenThunk } from '../../../redux/slice/auth/asyncThunk/refreshAccessToken';

export interface IntrUseAuthCheck {
    isAuth: boolean;
    checkAuth: () => Promise<void>;
}

export function useAuthCheck(): IntrUseAuthCheck {
    const dispatch = useDispatch<AppDispatch>();
    const { isRefreshingFailed, isAuth } = useSelector((state: RootState) => state.auth);

    async function checkAuth(): Promise<void> {
        if (isRefreshingFailed || !isAuth) return;

        if (isAuth) {
            await dispatch(refreshAccessTokenThunk());
        }
    }

    return { isAuth, checkAuth };
}