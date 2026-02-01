import {
    fetchTurnosPendientes,
    marcarTurnoComoSynced,
} from '@/db/turnosDb';
import * as Network from 'expo-network';
import { useEffect } from 'react';
import { useSyncTurnoMutation } from '../store/apis/turnossyncApi';

export function useSyncTurnos() {
  const [syncTurno] = useSyncTurnoMutation();

  useEffect(() => {
    const sync = async () => {
      const net = await Network.getNetworkStateAsync();
      if (!net.isConnected) return;

      const pendientes = fetchTurnosPendientes();

      for (const turno of pendientes) {
        await syncTurno({
  id: String(turno.id),
  dia: String(turno.dia),
  hora: String(turno.hora),
  tratamiento: String(turno.tratamiento),
}).unwrap();

        marcarTurnoComoSynced(turno.id);
      }
    };

    sync();
  }, [syncTurno]);
}
