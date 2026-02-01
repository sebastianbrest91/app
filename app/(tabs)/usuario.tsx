import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { AppButton } from "../../components/AppButton";
import { ThemedText } from "../../components/themed-text";

import { useUsers } from "../../src/context/usersContext";
import { useTurnos } from "../../src/hooks/useTurnos";

export default function Usuario() {
  const router = useRouter();

  const { usuarioLogueado } = useUsers();

  const { turnos, reservarTurno } = useTurnos();

  const usuario = {
    nombre: "Ana",
    apellido: "Pérez",
    id: "usuario-1",
  };

  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioLogueado) return;

    if (usuarioLogueado.role !== "user") {
      router.replace("/");
    }
  }, [usuarioLogueado]);

  if (!usuarioLogueado) {
    return (
      <View style={styles.loading}>
        <ThemedText type="title">Cargando...</ThemedText>
      </View>
    );
  }

  if (usuarioLogueado.role !== "user") {
    return null;
  }

  const elegirFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert(
        "Permiso requerido",
        "Necesitamos acceso a la cámara"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
        </View>

        <ThemedText type="title">
          👋 Hola {usuario.nombre} {usuario.apellido}
        </ThemedText>

        <AppButton
          title="Subir foto de perfil"
          onPress={elegirFoto}
        />
      </View>

      <View style={styles.card}>
        <ThemedText type="title">Turnos</ThemedText>

        {turnos.length === 0 && (
          <ThemedText>No hay turnos disponibles</ThemedText>
        )}

        {turnos.map((turno: any)=> (
          <View
            key={turno.id}
            style={[
              styles.turnoCard,
              turno.reservado && styles.turnoReservado,
            ]}
          >
            <ThemedText>
              📅 {turno.dia} ⏰ {turno.hora}
            </ThemedText>

            <ThemedText>
              💄 {turno.tratamiento}
            </ThemedText>

            {turno.reservado ? (
              <ThemedText style={styles.reservadoText}>
                🔒 Reservado por {turno.reservadoPor}
              </ThemedText>
            ) : (
              <AppButton
                title="Confirmar turno"
                onPress={() =>
                  reservarTurno(
                    turno.id,
                    `${usuario.nombre} ${usuario.apellido}`
                  )
                }
              />
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
    backgroundColor: "#000",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  profileCard: {
    alignItems: "center",
    gap: 12,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 8,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#111827",
    gap: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  turnoCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#020617",
    gap: 6,
  },
  turnoReservado: {
    opacity: 0.7,
  },
  reservadoText: {
    marginTop: 4,
    color: "#9CA3AF",
    fontWeight: "600",
  },
});
