import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Tratamiento } from '../types/turnos';


import {
    deleteAllTurnos,
    insertTurno,
    updateTurnoReserva,
} from '@/db/turnosDb';

import { cargarTurnos } from '@/store/slices/turnosSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { Turno } from '@/types/turnos';

export function useTurnos() {
  const dispatch = useDispatch<AppDispatch>();

  const turnos = useSelector(
    (state: RootState) => state.turnos.turnos
  ) as Turno[];

  useEffect(() => {
    dispatch(cargarTurnos());
  }, [dispatch]);

  type NuevoTurno = {
  id: string;
  dia: string;
  hora: string;
  tratamiento: Tratamiento;
};

const agregarTurno = (turno: NuevoTurno) => {
  insertTurno({
    ...turno,
    reservado: 0,
    reservadoPor: null,
    syncStatus: 'pending',
  });

  dispatch(cargarTurnos());
};


  const reservarTurno = (id: string, usuario: string) => {
    updateTurnoReserva(id, usuario);
    dispatch(cargarTurnos());
  };

  const borrarTurnos = () => {
    deleteAllTurnos();
    dispatch(cargarTurnos());
  };

  return {
    turnos,
    agregarTurno,
    reservarTurno,
    borrarTurnos,
  };
}
