import { Stack } from 'expo-router';
import { TurnosProvider } from '../src/context/contexturnos';
import { UsersProvider } from '../src/context/usersContext';

export default function RootLayout() {
  return (
    <UsersProvider>
      <TurnosProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TurnosProvider>
    </UsersProvider>
  );
}
