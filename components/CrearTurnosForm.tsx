import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTurnos, type Tratamiento } from '../src/context/contexturnos';
import { AppButton } from './AppButton';

type Props = {
  tratamiento: Tratamiento;
};

export function CrearTurnosForm({ tratamiento }: Props) {
  const { agregarTurno } = useTurnos();
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');

  const crearTurno = () => {
    if (!dia || !hora) return;

    agregarTurno({
      id: Date.now().toString(),
      dia,
      hora,
      tratamiento,
    });

    setDia('');
    setHora('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.subtitle}>
        Nuevo turno – {tratamiento}
      </Text>

      <TextInput
        placeholder="Día (ej: Lunes)"
        value={dia}
        onChangeText={setDia}
        style={styles.input}
      />

      <TextInput
        placeholder="Horario (ej: 10:30)"
        value={hora}
        onChangeText={setHora}
        style={styles.input}
      />

      <AppButton title="Agregar turno" onPress={crearTurno} />
    </View>
  );
}


const styles = StyleSheet.create({
  form: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFF',
    gap: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
  },
});
