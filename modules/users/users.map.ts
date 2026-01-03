import { Prisma } from '~/generated/prisma/client';
import { Permission, User } from './users.type';

type UserRoles = Prisma.UserModel & {
  userRoles: {
    role: {
      rolePermissions: ({
        permission: Prisma.PermissionModel;
      } & Prisma.RolePermissionModel)[];
    } & Prisma.RoleModel;
  }[];
};

export const UserMapper = {
  toDTO: (user: UserRoles): User => {
    const roles: Prisma.RoleModel[] = [];
    const permissionsMap = new Map<number, Permission>();

    user.userRoles.forEach((ur) => {
      const role = ur.role;
      roles.push({
        id: role.id,
        name: role.name,
      });

      role.rolePermissions.forEach((rp) => {
        const p = rp.permission;
        if (!permissionsMap.has(p.id)) {
          permissionsMap.set(p.id, {
            id: p.id,
            key: p.key,
            name: p.name,
          });
        }
      });
    });

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      roles,
      permissions: Array.from(permissionsMap.values()),
    };
  },
};
