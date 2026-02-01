export type Tratamiento = 'Uñas' | 'Cejas' | 'Corporales';

export type SyncStatus = 'pending' | 'synced';

export type Turno = {
  id: string;
  dia: string;
  hora: string;
  tratamiento: string;
  reservado: number;
  reservadoPor: string | null;
  syncStatus: string;
};

