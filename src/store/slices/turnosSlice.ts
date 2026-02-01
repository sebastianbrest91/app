import type { TurnoDB } from '@/db/turnosDb';
import { fetchTurnos } from '@/db/turnosDb';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TurnosState = {
  turnos: TurnoDB[];
  loading: boolean;
};

export const cargarTurnos = createAsyncThunk<TurnoDB[]>(
  'turnos/cargar',
  () => {
    return fetchTurnos();
  }
);

const initialState: TurnosState = {
  turnos: [],
  loading: false,
};

const turnosSlice = createSlice({
  name: 'turnos',
  initialState,
  reducers: {
    limpiarTurnos(state) {
      state.turnos = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(cargarTurnos.pending, state => {
        state.loading = true;
      })
      .addCase(cargarTurnos.fulfilled, (state, action) => {
        state.turnos = action.payload;
        state.loading = false;
      })
      .addCase(cargarTurnos.rejected, state => {
        state.loading = false;
      });
  },
});

export const { limpiarTurnos } = turnosSlice.actions;
export default turnosSlice.reducer;
