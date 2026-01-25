import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TurnosProvider } from '../src/context/contexturnos';
import { UsersProvider } from '../src/context/usersContext';

export default function RootLayout() {
  return (
    <UsersProvider>
      <TurnosProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>

        <StatusBar style="auto" />
      </TurnosProvider>
    </UsersProvider>
  );
}

