import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrNotification } from '../../root-controller/Visual-Interface/elements/Notification/interfaces/Notification';


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
    addOneNotification: (state, action: PayloadAction<IntrNotification>) => {
      const { ...notification } = action.payload;
      notification.id = -1;
      state.oneNotification = notification;
    },
    deleteOneNotification: (state) => {
      state.oneNotification = undefined;
    },
    addNotificationByList: (state, action: PayloadAction<IntrNotification>) => {
      const { ...notification } = action.payload;
      notification.id = state.list.length;
      state.list.push(notification);
    },
    deleteNotificationByList: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((el) => el.id != action.payload);
    },
  },
});

export const actionsNotification = sliceNotification.actions;
export default sliceNotification.reducer;
