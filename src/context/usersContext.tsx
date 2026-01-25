import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { db } from '../firebaseConfig';

type Usuario = {
  uid: string;
  personal: {
    name: string;
    lastName: string;
    dni: string;
    birthDate: string;
  };
  account: {
    username: string;
    email: string;
  };
  profile: {
    objective?: string;
    role: 'user' | 'admin';
    approved: boolean;
  };
};

type UsersContextType = {
  usuariosPendientes: Usuario[];
  registrarUsuario: (u: Usuario) => Promise<void>;
  aprobarUsuario: (u: Usuario) => Promise<void>;
};

const UsersContext = createContext<UsersContextType>(
  {} as UsersContextType
);

export function UsersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuariosPendientes, setUsuariosPendientes] =
    useState<Usuario[]>([]);

  useEffect(() => {
    cargarPendientes();
  }, []);

  const cargarPendientes = async () => {
    const snapshot = await getDocs(
      collection(db, 'pendingUsers')
    );

    const data = snapshot.docs.map(doc => doc.data() as Usuario);
    setUsuariosPendientes(data);
  };

  const registrarUsuario = async (usuario: Usuario) => {
    await setDoc(
      doc(db, 'pendingUsers', usuario.uid),
      usuario
    );
  };

  const aprobarUsuario = async (usuario: Usuario) => {
    await setDoc(doc(db, 'users', usuario.uid), {
      personal: usuario.personal,
      account: usuario.account,
      profile: {
        objective:
          usuario.profile.objective ??
          'Mejorar condición física',
        role: 'user',
        approved: true,
      },
    });

    setUsuariosPendientes(prev =>
      prev.filter(u => u.uid !== usuario.uid)
    );
  };

  return (
    <UsersContext.Provider
      value={{
        usuariosPendientes,
        registrarUsuario,
        aprobarUsuario,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
