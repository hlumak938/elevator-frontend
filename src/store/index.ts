import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { buildingsApi } from '../api/buildingsApi';
import buildingsSlice from './slices/buildings';
import liftSlice from './slices/liftSlice';
import { liftApi } from '../api/liftApi';

const reducer = combineReducers({
  buildings: buildingsSlice.reducer,
  lift: liftSlice.reducer,
  [buildingsApi.reducerPath]: buildingsApi.reducer,
  [liftApi.reducerPath]: liftApi.reducer,

});

const middlewares = [
  buildingsApi.middleware,
  liftApi.middleware,
];

export const store = () => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof reducer>;
