import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '../../components/AppButton';
import { CrearTurnosForm } from '../../components/CrearTurnosForm';
import { useTurnos, type Tratamiento } from '../../src/context/contexturnos';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../src/firebaseConfig';

type UsuarioPendiente = {
  uid: string;
  personal: {
    name: string;
    lastName: string;
    dni: string;
    birthDate: string;
  };
  account: {
    username: string;
    email: string;
  };
  profile: {
    objective: string;
    role: 'user' | 'admin';
    approved: boolean;
  };
};

export default function Administrador() {
  const [tratamiento, setTratamiento] =
    useState<Tratamiento | null>(null);

  const { turnos, borrarTurnos } = useTurnos();

  const [usuariosPendientes, setUsuariosPendientes] =
    useState<UsuarioPendiente[]>([]);

  useEffect(() => {
    const cargarPendientes = async () => {
      const snapshot = await getDocs(
        collection(db, 'pendingUsers')
      );

      const data = snapshot.docs.map(doc => doc.data() as UsuarioPendiente);
      setUsuariosPendientes(data);
    };

    cargarPendientes();
  }, []);

  const aprobarUsuario = async (user: UsuarioPendiente) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        personal: user.personal,
        account: user.account,
        profile: {
          ...user.profile,
          approved: true,
        },
      });

      await deleteDoc(doc(db, 'pendingUsers', user.uid));

      setUsuariosPendientes(prev =>
        prev.filter(u => u.uid !== user.uid)
      );

      Alert.alert(
        'Usuario aprobado',
        `${user.personal.name} fue aprobado`
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo aprobar el usuario');
    }
  };

  const rechazarUsuario = async (uid: string) => {
    await deleteDoc(doc(db, 'pendingUsers', uid));

    setUsuariosPendientes(prev =>
      prev.filter(user => user.uid !== uid)
    );

    Alert.alert('Usuario rechazado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Usuarios pendientes</Text>

        {usuariosPendientes.length === 0 && (
          <Text style={styles.empty}>
            No hay usuarios pendientes
          </Text>
        )}

        {usuariosPendientes.map(user => (
          <View key={user.uid} style={styles.usuarioCard}>
            <Text style={styles.text}>
              👤 {user.personal.name} {user.personal.lastName}
            </Text>

            <Text style={styles.text}>
              🪪 DNI: {user.personal.dni}
            </Text>

            <Text style={styles.text}>
              📧 {user.account.email}
            </Text>

            <View style={styles.actionsRow}>
              <View style={styles.smallButton}>
                <AppButton
                  title="Aprobar"
                  onPress={() => aprobarUsuario(user)}
                />
              </View>

              <View style={styles.smallButton}>
                <AppButton
                  title="Rechazar"
                  onPress={() => rechazarUsuario(user.uid)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Crear turnos</Text>

        <AppButton title="Uñas" onPress={() => setTratamiento('Uñas')} />
        <AppButton title="Cejas" onPress={() => setTratamiento('Cejas')} />
        <AppButton
          title="Corporales"
          onPress={() => setTratamiento('Corporales')}
        />

        <AppButton
          title="Borrar todos los turnos"
          onPress={borrarTurnos}
        />
      </View>

      {tratamiento && (
        <CrearTurnosForm tratamiento={tratamiento} />
      )}

      <View style={styles.card}>
        <Text style={styles.title}>Turnos creados</Text>

        {turnos.length === 0 && (
          <Text style={styles.empty}>
            No hay turnos creados
          </Text>
        )}

        {turnos.map(turno => (
          <View
            key={turno.id}
            style={[
              styles.turnoRow,
              turno.reservado && styles.turnoReservado,
            ]}
          >
            <Text style={styles.text}>
              📅 {turno.dia} ⏰ {turno.hora}
            </Text>

            <Text style={styles.text}>
              💄 {turno.tratamiento}
            </Text>

            {turno.reservado ? (
              <Text style={styles.reservadoText}>
                🔒 Reservado por {turno.reservadoPor}
              </Text>
            ) : (
              <Text style={styles.disponibleText}>
                🟢 Disponible
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
    backgroundColor: '#000',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#111827',
    gap: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  empty: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  usuarioCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#020617',
    gap: 6,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  smallButton: {
    width: '40%',
  },
  turnoRow: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#020617',
    gap: 4,
  },
  turnoReservado: {
    backgroundColor: '#1F2937',
    opacity: 0.7,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  reservadoText: {
    marginTop: 4,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  disponibleText: {
    marginTop: 4,
    color: '#10B981',
    fontWeight: '600',
  },
});
