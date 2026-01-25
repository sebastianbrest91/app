import React, { createContext, useContext, useState } from 'react';

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
  seleccionarTurno: (turno: Turno) => void;
  borrarTurnos: () => void;
  reservarTurno: (id: string, usuario: string) => void;
};

const TurnosContext = createContext<TurnosContextType | null>(null);

export function TurnosProvider({ children }: { children: React.ReactNode }) {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  const agregarTurno = (turno: Omit<Turno, 'reservado'>) => {
    setTurnos(prev => [...prev, { ...turno, reservado: false }]);
  };

  const seleccionarTurno = (turno: Turno) => {
    console.log('📩 Turno seleccionado:', turno);
  };

  const borrarTurnos = () => {
    setTurnos([]);
  };

  const reservarTurno = (id: string, usuario: string) => {
    setTurnos(prev =>
      prev.map(turno =>
        turno.id === id
          ? { ...turno, reservado: true, reservadoPor: usuario }
          : turno
      )
    );
  };

  return (
    <TurnosContext.Provider
      value={{ turnos, agregarTurno, seleccionarTurno, borrarTurnos, reservarTurno }}
    >
      {children}
    </TurnosContext.Provider>
  );
}

export function useTurnos() {
  const ctx = useContext(TurnosContext);
  if (!ctx) throw new Error('useTurnos debe usarse dentro del Provider');
  return ctx;
}
