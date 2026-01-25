import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyASp3Gg6YSAV0tP8qXud3Smiyln_GOOwLE',
  authDomain: 'personalizadosur2026.firebaseapp.com',
  projectId: 'personalizadosur2026',
  storageBucket: 'personalizadosur2026.firebasestorage.app',
  messagingSenderId: '768574279244',
  appId: '1:768574279244:web:4688cac6758e768324aee9',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

