// User entity types for frontend
import type { Role } from './role.types';
import type { Permission } from './permission.types';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string; // Only in backend, should not be sent to frontend
}

export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserRoles {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: Role[];
  permissions: Permission[];
}

export interface BaseUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

