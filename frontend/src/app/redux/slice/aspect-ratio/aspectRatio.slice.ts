import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadStateLocalStorage } from '../../../common/script/utils/localStorage';
import { setAspectRatio } from './reducers/setAspectRatio';
import { setError } from './reducers/setError';

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
    setAspectRatio,
    setError,
  },
});

export const actionsAspectRatio = sliceAspectRatio.actions;
export default sliceAspectRatio.reducer;
