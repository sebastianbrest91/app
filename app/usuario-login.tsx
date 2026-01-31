import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { AppButton } from "../components/AppButton";
import { useUsers } from "../src/context/usersContext";

export default function UsuarioLogin() {
  const router = useRouter();
  const { login } = useUsers();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUsuario = () => {
    if (!email || !password) {
      Alert.alert("Error", "Completá email y contraseña");
      return;
    }

    const ok = login(email, password);

    if (!ok) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
      return;
    }

    router.replace("/(tabs)/usuario");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingreso Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Ingresar" onPress={loginUsuario} />

      <Text style={styles.help}>
        user@test.com / 1234
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#020617",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  help: {
    marginTop: 10,
    textAlign: "center",
    color: "#9CA3AF",
  },
});
