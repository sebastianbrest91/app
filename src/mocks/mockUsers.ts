import { Rol } from "../context/usersContext";

export type MockUser = {
  email: string;
  password: string;
  role: Rol;
};

export const mockUsers: MockUser[] = [
  {
    email: "admin@test.com",
    password: "1234",
    role: "admin",
  },
  {
    email: "user@test.com",
    password: "1234",
    role: "user",
  },
];
