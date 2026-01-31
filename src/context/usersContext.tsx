import React, { createContext, useContext, useState } from "react";
import { mockUsers } from "../mocks/mockUsers";

export type Rol = "user" | "admin";

type UsuarioLogueado = {
  email: string;
  role: Rol;
};

export type UsuarioPendiente = {
  uid: string;
  account: {
    email: string;
    username: string;
  };
  personal: {
    name: string;
    lastName: string;
    dni: string;
    birthDate: string;
    photoURL: string;
  };
  profile: {
    role: Rol;
    approved: boolean;
    objetive: string;
  };
};

export type RegistrarInput = Omit<UsuarioPendiente, "uid">;

type UsersContextType = {
  usuarioLogueado: UsuarioLogueado | null;

  usuariosPendientes: UsuarioPendiente[];

  login: (email: string, password: string) => Rol | null;
  logout: () => void;

  registrarUsuario: (data: RegistrarInput) => void;
  aprobarUsuario: (uid: string) => void;
  rechazarUsuario: (uid: string) => void;
};

const UsersContext = createContext({} as UsersContextType);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [usuarioLogueado, setUsuarioLogueado] =
    useState<UsuarioLogueado | null>(null);

  const [usuariosPendientes, setUsuariosPendientes] = useState<
    UsuarioPendiente[]
  >([]);

  const login = (email: string, password: string) => {
    const encontrado = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!encontrado) return null;

    setUsuarioLogueado({
      email: encontrado.email,
      role: encontrado.role,
    });

    return encontrado.role;
  };

  const logout = () => {
    setUsuarioLogueado(null);
  };

  const registrarUsuario = (data: RegistrarInput) => {
    const nuevo: UsuarioPendiente = {
      uid: Date.now().toString(),
      ...data,
    };

    setUsuariosPendientes(prev => [...prev, nuevo]);
  };

  const aprobarUsuario = (uid: string) => {
    setUsuariosPendientes(prev =>
      prev.map(u =>
        u.uid === uid
          ? {
              ...u,
              profile: {
                ...u.profile,
                approved: true,
              },
            }
          : u
      )
    );
  };

  const rechazarUsuario = (uid: string) => {
    setUsuariosPendientes(prev => prev.filter(u => u.uid !== uid));
  };

  return (
    <UsersContext.Provider
      value={{
        usuarioLogueado,
        usuariosPendientes,
        login,
        logout,
        registrarUsuario,
        aprobarUsuario,
        rechazarUsuario,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);

