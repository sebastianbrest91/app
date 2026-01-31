import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppButton } from "../components/AppButton";
import { useUsers } from "../src/context/usersContext";

export default function AdminLogin() {
  const { login, usuarioLogueado } = useUsers();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ingresar = () => {
    const ok = login(email, password);

    if (!ok) {
      Alert.alert("Error", "Credenciales incorrectas");
      return;
    }

    if (usuarioLogueado?.role !== "admin") {
      Alert.alert("Acceso denegado", "No sos administrador");
      return;
    }

    router.replace("/(tabs)/administrador");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Admin</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Ingresar" onPress={ingresar} />

      <Text style={styles.help}>
        admin@test.com / 1234
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
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
