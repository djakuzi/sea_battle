import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadStateLocalStorage } from '../../common/script/utils/localStorage';

export const KEY_ASPECT_RATIO = 'aspect-ratio';

export type TypeAspectRatio = string | undefined;

export interface initialState {
  aspectRatio: TypeAspectRatio;
  error?: string | null;
}

const initialState: initialState = {
  aspectRatio: loadStateLocalStorage<TypeAspectRatio>(KEY_ASPECT_RATIO),
};

const sliceAspectRatio = createSlice({
  name: 'aspectRatio',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TypeAspectRatio>) => {
      state.aspectRatio = action.payload;
      state.error = undefined;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.aspectRatio = action.payload;
    },
  },
});

export const actionsAspectRatio = sliceAspectRatio.actions;
export default sliceAspectRatio.reducer;
