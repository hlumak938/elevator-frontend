import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lift } from '../types';

type MoveCabinByInnerButton = {
  liftId: number;
  floorNumber: number;
}

export const liftApi = createApi({
  reducerPath: 'liftApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    registerLift: builder.mutation<Lift, { id: number; body: any}>({
      query: ({ id, body }) => ({
        url: `/api/buildings/${id}/lifts`,
        method: 'POST',
        body,
      }),
    }),
    moveCabinByInnerButton: builder.mutation<void, MoveCabinByInnerButton>({
      query: ({ liftId, floorNumber }) => ({
        url: `/api/buildings/lifts/${liftId}/cabins/${floorNumber}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useRegisterLiftMutation, useMoveCabinByInnerButtonMutation } = liftApi;
