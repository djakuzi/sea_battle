import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrNotification } from '../../../root-controller/Visual-Interface/elements/Notification/interfaces/Notification';
import { addOneNotification } from './reducers/addOneNotification';
import { addNotificationByList } from './reducers/addNotificationByList';
import { deleteNotificationByList } from './reducers/deleteNotificationByList';
import { deleteOneNotification } from './reducers/deleteOneNotification';

export interface initialState {
  oneNotification: IntrNotification | undefined;
  list: IntrNotification[];
}

const initialState: initialState = {
  oneNotification: undefined,
  list: [],
};

const sliceNotification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addOneNotification,
    deleteOneNotification,
    addNotificationByList,
    deleteNotificationByList,
  },
});

export const actionsNotification = sliceNotification.actions;
export default sliceNotification.reducer;
