import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TurnoSyncDTO = {
  id: string;
  dia: string;
  hora: string;
  tratamiento: string;
};

export const turnosSyncApi = createApi({
  reducerPath: 'turnosSyncApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tu-api-futura.com',
  }),
  endpoints: builder => ({
    syncTurno: builder.mutation<void, TurnoSyncDTO>({
      query: turno => ({
        url: '/turnos',
        method: 'POST',
        body: turno,
      }),
    }),
  }),
});

export const { useSyncTurnoMutation } = turnosSyncApi;
