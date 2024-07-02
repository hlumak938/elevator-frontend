import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Building, BuildingsData } from '../types';

type CallCabin = {
  buildingId: number;
  floorNumber: number;
}

export const buildingsApi = createApi({
  reducerPath: 'buildingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getBuildings: builder.query<BuildingsData, void>({
      query: () => '/api/buildings',
    }),
    registerBuilding: builder.mutation<Building, Partial<Building>>({
      query: (newBuilding) => ({
        url: '/api/buildings',
        method: 'POST',
        body: newBuilding,
      }),
    }),
    getBuildingById: builder.query<Building, number>({
      query: (id: number) => `/api/buildings/${id}`,
    }),
    callCabin: builder.mutation<void, CallCabin>({
      query: ({ buildingId, floorNumber }) => ({
        url: `/api/buildings/${buildingId}/floors/${floorNumber}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetBuildingsQuery, useRegisterBuildingMutation, useGetBuildingByIdQuery, useCallCabinMutation,
} = buildingsApi;
