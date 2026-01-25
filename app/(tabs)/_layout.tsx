import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#FC88AD',
            tabBarInactiveTintColor: '#9CA3AF',
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="turnos"
            options={{
              title: 'Turnos',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="administrador"
            options={{
              title: 'Administrador',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
  );
}
