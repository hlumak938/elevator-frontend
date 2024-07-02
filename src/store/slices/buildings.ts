import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BuildingsData } from '../../types';

const initialState: BuildingsData = [];

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    setBuildings(_, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export const { setBuildings } = buildingsSlice.actions;
export default buildingsSlice;
