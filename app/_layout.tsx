import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { UsersProvider } from '../src/context/usersContext';
import { initDB } from '../src/db/turnosDb';
import { store } from '../src/store/store';

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <Provider store={store}>
      <UsersProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UsersProvider>
    </Provider>
  );
}
