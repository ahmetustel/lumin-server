// src/users/user.interface.ts
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'staff';
}
