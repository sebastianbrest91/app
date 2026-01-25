import { StyleSheet, View } from 'react-native';
import { AppButton } from '../../components/AppButton';
import { ThemedText } from '../../components/themed-text';
import { useTurnos } from '../../src/context/contexturnos';

export default function Turnos() {
  const { turnos, reservarTurno } = useTurnos();

  const usuarioMock = 'Usuario 1';

  return (
    <View style={styles.container}>
      <ThemedText type="title">Turnos disponibles</ThemedText>

      {turnos.map(turno => {
        const reservado = turno.reservado;

        return (
          <View
            key={turno.id}
            style={[
              styles.card,
              reservado && styles.cardDisabled,
            ]}
          >
            <ThemedText style={styles.fechaHora}>
              📅 {turno.dia} ⏰ {turno.hora}
            </ThemedText>

            <ThemedText style={styles.fechaHora}>
              💄 {turno.tratamiento}
            </ThemedText>

            {reservado ? (
              <ThemedText style={styles.reservadoText}>
                🔒 Reservado por {turno.reservadoPor}
              </ThemedText>
            ) : (
              <AppButton
                title="Confirmar turno"
                onPress={() =>
                  reservarTurno(turno.id, usuarioMock)
                }
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FBF9FB',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.7,
  },
  fechaHora: {
    color: '#FC88AD',
    fontWeight: '600',
  },
  reservadoText: {
    marginTop: 8,
    fontWeight: '600',
    color: '#6B7280',
  },
});
