import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASp3Gg6YSAV0tP8qXud3Smiyln_GOOwLE",
  authDomain: "personalizadosur2026.firebaseapp.com",
  projectId: "personalizadosur2026",
  storageBucket: "personalizadosur2026.firebasestorage.app",
  messagingSenderId: "768574279244",
  appId: "1:768574279244:web:4688cac6758e768324aee9",
};

// 1. Inicializar App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Inicializar Auth con bypass de tipos
let auth: any;

if (getApps().length > 0) {
  try {
    auth = getAuth(app);
  } catch (e) {
    // Si falla el getAuth, forzamos la inicialización con persistencia
    auth = initializeAuth(app, {
      persistence: (getReactNativePersistence as any)(AsyncStorage),
    });
  }
} else {
  auth = initializeAuth(app, {
    persistence: (getReactNativePersistence as any)(AsyncStorage),
  });
}

const db = getFirestore(app);

export { app, auth, db };
