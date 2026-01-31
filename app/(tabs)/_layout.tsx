import { Tabs } from "expo-router";
import { useUsers } from "../../src/context/usersContext";

export default function TabsLayout() {
  const { usuarioLogueado } = useUsers();

  if (!usuarioLogueado) return null;

  const esAdmin = usuarioLogueado.role === "admin";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
        tabBarActiveTintColor: "white",
      }}
    >
      {esAdmin ? (
        <Tabs.Screen
          name="administrador"
          options={{
            title: "Admin",
          }}
        />
      ) : (
        <Tabs.Screen
          name="index"
          options={{
            title: "Usuario",
          }}
        />
      )}
    </Tabs>
  );
}
