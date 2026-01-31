import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { AppButton } from "../../components/AppButton";
import { CrearTurnosForm } from "../../components/CrearTurnosForm";

import {
  useTurnos,
  type Tratamiento,
} from "../../src/context/contexturnos";

import { useUsers } from "../../src/context/usersContext";

export default function Administrador() {
  const router = useRouter();

  const { usuarioLogueado } = useUsers();

  const [tratamiento, setTratamiento] =
    useState<Tratamiento | null>(null);

  const { turnos, borrarTurnos } = useTurnos();

  const {
    usuariosPendientes,
    aprobarUsuario,
    rechazarUsuario,
  } = useUsers();

  useEffect(() => {
    if (!usuarioLogueado) return;

    if (usuarioLogueado.role !== "admin") {
      router.replace("/");
    }
  }, [usuarioLogueado]);

  if (!usuarioLogueado) {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  }

  if (usuarioLogueado.role !== "admin") {
    return null;
  }

  const handleAprobar = (uid: string, nombre: string) => {
    aprobarUsuario(uid);

    Alert.alert(
      "Usuario aprobado",
      `${nombre} fue aprobado correctamente.`
    );
  };

  const handleRechazar = (uid: string) => {
    rechazarUsuario(uid);

    Alert.alert(
      "Usuario rechazado",
      "El usuario fue eliminado de la lista."
    );
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
                  onPress={() =>
                    handleAprobar(
                      user.uid,
                      user.personal.name
                    )
                  }
                />
              </View>

              <View style={styles.smallButton}>
                <AppButton
                  title="Rechazar"
                  onPress={() =>
                    handleRechazar(user.uid)
                  }
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Crear turnos</Text>

        <AppButton
          title="Uñas"
          onPress={() => setTratamiento("Uñas")}
        />

        <AppButton
          title="Cejas"
          onPress={() => setTratamiento("Cejas")}
        />

        <AppButton
          title="Corporales"
          onPress={() =>
            setTratamiento("Corporales")
          }
        />

        <AppButton
          title="Borrar todos los turnos"
          onPress={() => {
            Alert.alert(
              "Borrar turnos",
              "¿Seguro que querés borrar todos?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Borrar",
                  style: "destructive",
                  onPress: borrarTurnos,
                },
              ]
            );
          }}
        />
      </View>

      {tratamiento && (
        <CrearTurnosForm tratamiento={tratamiento} />
      )}

      <View style={styles.card}>
        <Text style={styles.title}>Turnos creados</Text>

        {turnos.length === 0 && (
          <Text style={styles.empty}>
            No hay turnos registrados
          </Text>
        )}

        {turnos.map(turno => (
          <View key={turno.id} style={styles.turnoRow}>
            <Text style={styles.text}>
              📅 {turno.dia} ⏰ {turno.hora}
            </Text>

            <Text style={styles.text}>
              💄 {turno.tratamiento}
            </Text>

            <Text style={styles.text}>
              {turno.reservado
                ? `🔒 Reservado por ${turno.reservadoPor}`
                : "🟢 Disponible"}
            </Text>
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
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#111827",
    gap: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F9FAFB",
  },
  empty: {
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  usuarioCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#020617",
    gap: 6,
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  smallButton: {
    width: "45%",
  },
  turnoRow: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#020617",
    gap: 4,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E5E7EB",
  },
});
