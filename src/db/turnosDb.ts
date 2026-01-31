import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('turnos.db');

export type TurnoDB = {
  id: string;
  dia: string;
  hora: string;
  tratamiento: string;
  reservado: number;
  reservadoPor: string | null;
};

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS turnos (
      id TEXT PRIMARY KEY NOT NULL,
      dia TEXT,
      hora TEXT,
      tratamiento TEXT,
      reservado INTEGER,
      reservadoPor TEXT
    );
  `);
};

export const insertTurno = (turno: TurnoDB) => {
  db.runSync(
    `INSERT INTO turnos 
     (id, dia, hora, tratamiento, reservado, reservadoPor)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      turno.id,
      turno.dia,
      turno.hora,
      turno.tratamiento,
      turno.reservado,
      turno.reservadoPor,
    ]
  );
};

export const fetchTurnos = (): TurnoDB[] => {
  const resultados = db.getAllSync(`SELECT * FROM turnos`);
  return (resultados as TurnoDB[]) ?? [];
};

export const updateTurnoReserva = (
  id: string,
  usuario: string
) => {
  db.runSync(
    `UPDATE turnos
     SET reservado = 1, reservadoPor = ?
     WHERE id = ?`,
    [usuario, id]
  );
};

export const deleteAllTurnos = () => {
  db.execSync(`DELETE FROM turnos`);
};
