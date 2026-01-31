import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  deleteAllTurnos,
  fetchTurnos,
  initDB,
  insertTurno,
  updateTurnoReserva,
} from '../db/turnosDb';

export type Tratamiento = 'Uñas' | 'Cejas' | 'Corporales';

export type Turno = {
  id: string;
  dia: string;
  hora: string;
  tratamiento: Tratamiento;
  reservado: boolean;
  reservadoPor?: string;
};

type TurnosContextType = {
  turnos: Turno[];
  agregarTurno: (turno: Omit<Turno, 'reservado'>) => void;
  borrarTurnos: () => void;
  reservarTurno: (id: string, usuario: string) => void;
};

const TurnosContext = createContext<TurnosContextType | null>(null);

export function TurnosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    try {
      initDB();
      const data = fetchTurnos();

      const mapeados: Turno[] = data.map(t => ({
        id: t.id,
        dia: t.dia,
        hora: t.hora,
        tratamiento: t.tratamiento as Tratamiento,
        reservado: t.reservado === 1,
        reservadoPor: t.reservadoPor ?? undefined,
      }));

      setTurnos(mapeados);
    } catch (error) {
      console.log('Error cargando turnos:', error);
    }
  }, []);

  const agregarTurno = (turno: Omit<Turno, 'reservado'>) => {
    const nuevo: Turno = {
      ...turno,
      reservado: false,
    };

    insertTurno({
      id: nuevo.id,
      dia: nuevo.dia,
      hora: nuevo.hora,
      tratamiento: nuevo.tratamiento,
      reservado: 0,
      reservadoPor: null,
    });

    setTurnos(prev => [...prev, nuevo]);
  };

  const borrarTurnos = () => {
    deleteAllTurnos();
    setTurnos([]);
  };

  const reservarTurno = (id: string, usuario: string) => {
    updateTurnoReserva(id, usuario);

    setTurnos(prev =>
      prev.map(turno =>
        turno.id === id
          ? {
              ...turno,
              reservado: true,
              reservadoPor: usuario,
            }
          : turno
      )
    );
  };

  return (
    <TurnosContext.Provider
      value={{
        turnos,
        agregarTurno,
        borrarTurnos,
        reservarTurno,
      }}
    >
      {children}
    </TurnosContext.Provider>
  );
}

export function useTurnos() {
  const ctx = useContext(TurnosContext);

  if (!ctx) {
    throw new Error(
      'useTurnos debe usarse dentro del TurnosProvider'
    );
  }

  return ctx;
}
