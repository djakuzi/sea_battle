import { createSlice, } from '@reduxjs/toolkit';
import { setIsConnect } from './reducers/setIsConnect';
import { setIsConnection } from './reducers/setIsConnection';
import { setIsDisconnect } from './reducers/setIsDisconnect';
import { setPing } from './reducers/setPing';

export interface initialConnectStatusServer {
    isConnection: boolean;
    isConnect: boolean;
    isDisconnect: boolean | null;
    ping: number | null;
}

const initialState: initialConnectStatusServer = {
    isConnection: true,
    isConnect: false,
    isDisconnect: false,
    ping: null,
};

const sliceConnectStatusServer = createSlice({
    name: 'status-connect-server',
    initialState,
    reducers: {
        setIsConnection,
        setIsConnect,
        setIsDisconnect,
        setPing,
    },
});

export const actionsConnectStatusServer = sliceConnectStatusServer.actions;
export default sliceConnectStatusServer.reducer;
