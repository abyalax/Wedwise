import bcrypt from 'bcrypt';
import { prisma } from '~/db/prisma/client';
import { invitationSeeder } from './invitations.seed';

export async function userSeeder() {
  // --- RESET DATA ---
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "guests",
      "customers",
      "role_permissions",
      "user_roles",
      "users",
      "permissions",
      "roles"
    RESTART IDENTITY CASCADE;
  `);

  // --- ROLES ---
  await prisma.role.createMany({
    data: [{ name: 'Guest' }, { name: 'Customer' }, { name: 'Admin' }],
  });

  const roleRows = await prisma.role.findMany();
  const roleIds = Object.fromEntries(roleRows.map((r) => [r.name, r.id]));

  // --- PERMISSIONS ---
  await prisma.permission.createMany({
    data: [
      // CUSTOMER
      { key: 'customer:read_profile', name: 'Customer Read Profile' },
      { key: 'customer:create_invitation', name: 'Customer Create Invitation' },
      { key: 'customer:read_invitation', name: 'Customer Read Invitation' },
      { key: 'customer:update_invitation', name: 'Customer Update Invitation' },
      { key: 'customer:delete_invitation', name: 'Customer Delete Invitation' },
      { key: 'customer:create_guest', name: 'Customer Create Guest' },
      { key: 'customer:read_guest', name: 'Customer Read Guest' },
      { key: 'customer:update_guest', name: 'Customer Update Guest' },
      { key: 'customer:delete_guest', name: 'Customer Delete Guest' },

      // GUEST
      { key: 'guest:view_invitation', name: 'Guest View Invitation' },
      { key: 'guest:rsvp', name: 'Guest RSVP' },
      { key: 'guest:send_wishes', name: 'Guest Send Wishes' },
      { key: 'guest:*', name: 'Manage Guests' },

      // ADMIN
      { key: 'invitations:*', name: 'Manage Invitations' },
      { key: 'payments:*', name: 'Manage Payments' },
      { key: 'customers:*', name: 'Manage Customers' },
    ],
  });

  const permissionRows = await prisma.permission.findMany();
  const permissionIds = Object.fromEntries(permissionRows.map((p) => [p.key, p.id]));

  // --- USERS ---
  const [customerPass, adminPass] = await Promise.all([bcrypt.hash('customer_pass', 10), bcrypt.hash('admin_pass', 10)]);

  await prisma.user.createMany({
    data: [
      {
        name: 'Customer',
        email: 'customer@gmail.com',
        password: customerPass,
        phone: '087765290291',
      },
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: adminPass,
        phone: '087765290292',
      },
    ],
  });

  const userRows = await prisma.user.findMany();
  const userIds = Object.fromEntries(userRows.map((u) => [u.email, u.id]));

  // --- USER ROLES ---
  await prisma.userRole.createMany({
    data: [
      { userId: userIds['customer@gmail.com'], roleId: roleIds.Customer },
      { userId: userIds['admin@gmail.com'], roleId: roleIds.Admin },
    ],
  });

  // --- ROLE PERMISSIONS ---
  await prisma.rolePermission.createMany({
    data: [
      // CUSTOMER
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:read_profile'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:create_invitation'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:read_invitation'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:update_invitation'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:delete_invitation'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:create_guest'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:read_guest'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:update_guest'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['customer:delete_guest'] },
      { roleId: roleIds.Customer, permissionId: permissionIds['guest:*'] },

      // GUEST
      { roleId: roleIds.Guest, permissionId: permissionIds['guest:view_invitation'] },
      { roleId: roleIds.Guest, permissionId: permissionIds['guest:rsvp'] },
      { roleId: roleIds.Guest, permissionId: permissionIds['guest:send_wishes'] },

      // ADMIN
      { roleId: roleIds.Admin, permissionId: permissionIds['customers:*'] },
      { roleId: roleIds.Admin, permissionId: permissionIds['invitations:*'] },
      { roleId: roleIds.Admin, permissionId: permissionIds['payments:*'] },
    ],
  });

  // --- CUSTOMER ---
  await prisma.customer.create({
    data: {
      user_id: userIds['customer@gmail.com'],
      theme: 'classic',
      status: 'Active',
      note: 'Customer pertama',
    },
  });

  // --- INVITATION ---
  await invitationSeeder();

  // --- GUESTS ---
  await prisma.guest.createMany({
    data: [
      {
        invitation_id: 1,
        name: 'Budi Santoso',
        phone: '087765290292',
        participant: 3,
        status: 'Invited',
        note: 'Bawa keluarga kecil',
      },
      {
        invitation_id: 1,
        name: 'Siti Aminah',
        phone: '087765290291',
        participant: 2,
        status: 'Invited',
        note: null,
      },
    ],
  });
}
