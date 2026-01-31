import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function Home() {
  return (
    <ThemedView style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/registrarme')}
      >
        <ThemedText style={styles.buttonText}>Registrarme</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/usuario-login')}
      >
        <ThemedText style={styles.buttonText}>Usuario</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/administrador-login')}
      >
        <ThemedText style={styles.buttonText}>Administrador</ThemedText>
      </TouchableOpacity>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 24,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FC88AD',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
