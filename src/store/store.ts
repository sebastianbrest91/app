import { configureStore } from '@reduxjs/toolkit';
import { turnosSyncApi } from './apis/turnossyncApi';
import turnosReducer from './slices/turnosSlice';

export const store = configureStore({
  reducer: {
    turnos: turnosReducer,
    [turnosSyncApi.reducerPath]: turnosSyncApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(turnosSyncApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
