import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { AppButton } from '../components/AppButton';
import { useUsers } from '../src/context/usersContext';

export default function Registrarme() {
  const { registrarUsuario } = useUsers();
  const [enviando, setEnviando] = useState(false);

  // ✅ Datos personales
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // ✅ Datos de cuenta
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // ✅ Perfil
  const [objetive, setObjetive] = useState('');

  const enviarRegistro = async () => {
    if (
      !name || !lastName || !dni || !birthDate || 
      !email || !username || !objetive
    ) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }

    setEnviando(true);

    try {
      await registrarUsuario({
        account: {
          email,
          username,
        },
        personal: {
          name,
          lastName,
          dni,
          birthDate,
          photoURL: '',
        },
        profile: {
          approved: false,
          objetive,
          role: 'user',
        },
      });

      Alert.alert(
        'Registro enviado',
        'Tu solicitud será revisada por el administrador'
      );

      // Limpiar campos
      setName('');
      setLastName('');
      setDni('');
      setBirthDate('');
      setEmail('');
      setUsername('');
      setObjetive('');

    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor. Reintenta.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Registro de Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#9CA3AF"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="#9CA3AF"
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha nacimiento (dd/mm/aaaa)"
          placeholderTextColor="#9CA3AF"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Objetivo"
          placeholderTextColor="#9CA3AF"
          value={objetive}
          onChangeText={setObjetive}
        />

        {enviando ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <AppButton title="Registrarme" onPress={enviarRegistro} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    backgroundColor: '#000',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
});