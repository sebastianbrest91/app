import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('turnos.db');

export type TurnoDB = {
  id: string;
  dia: string;
  hora: string;
  tratamiento: string;
  reservado: number;
  reservadoPor: string | null;
  syncStatus: 'pending' | 'synced';
};

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS turnos (
      id TEXT PRIMARY KEY NOT NULL,
      dia TEXT,
      hora TEXT,
      tratamiento TEXT,
      reservado INTEGER,
      reservadoPor TEXT,
      syncStatus TEXT
    );
  `);
};

export const insertTurno = (turno: TurnoDB) => {
  db.runSync(
    `INSERT INTO turnos 
     (id, dia, hora, tratamiento, reservado, reservadoPor, syncStatus)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      turno.id,
      turno.dia,
      turno.hora,
      turno.tratamiento,
      turno.reservado,
      turno.reservadoPor,
      turno.syncStatus,
    ]
  );
};

export const fetchTurnos = (): TurnoDB[] => {
  const resultados = db.getAllSync(`SELECT * FROM turnos`);
  return (resultados as TurnoDB[]) ?? [];
};

export const fetchTurnosPendientes = (): TurnoDB[] => {
  const resultados = db.getAllSync(
    `SELECT * FROM turnos WHERE syncStatus = 'pending'`
  );
  return (resultados as TurnoDB[]) ?? [];
};

export const updateTurnoReserva = (
  id: string,
  usuario: string
) => {
  db.runSync(
    `UPDATE turnos
     SET reservado = 1,
         reservadoPor = ?,
         syncStatus = 'pending'
     WHERE id = ?`,
    [usuario, id]
  );
};

export const marcarTurnoComoSynced = (id: string) => {
  db.runSync(
    `UPDATE turnos SET syncStatus = 'synced' WHERE id = ?`,
    [id]
  );
};

export const deleteAllTurnos = () => {
  db.execSync(`DELETE FROM turnos`);
};
