import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { AppButton } from '../../components/AppButton';
import { db } from '../../src/firebaseConfig';

export default function Registrame() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');

  const enviarRegistro = async () => {
    if (!name || !lastName || !dni || !email) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }

    try {
      const uid = Date.now().toString();

      await setDoc(doc(collection(db, 'pendingUsers'), uid), {
        uid,
        personal: {
          name,
          lastName,
          dni,
          birthDate: '01/01/2000',
        },
        account: {
          username: email.split('@')[0],
          email,
        },
        profile: {
          objective: '',
          role: 'user',
          approved: false,
        },
      });

      setName('');
      setLastName('');
      setDni('');
      setEmail('');

      Alert.alert(
        'Registro enviado',
        'Tu solicitud será revisada por el administrador'
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el registro');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <AppButton title="Registrarme" onPress={enviarRegistro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
});
