import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ButtonTypes, Lift } from '../../types';

const initialState: Lift = {
  id: 0,
  cabinPosition: 0,
  status: '',
  cabin: {
    serialNumber: '',
    door: {
      id: '',
      doorStatus: '',
    },
    type: '',
  },
  engine: {
    serialNumber: '',
    type: '',
    status: '',
  },
  buttonTemplate: ButtonTypes.UP_DOWN,
  floorNumbers: [],
  liftListenerList: [],
  buildingId: 0,
};

const liftSlice = createSlice({
  name: 'lift',
  initialState,
  reducers: {
    addLift(_, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export const { addLift } = liftSlice.actions;
export default liftSlice;
