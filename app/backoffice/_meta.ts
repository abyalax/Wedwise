import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';

const permissions = [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS, PERMISSIONS.ADMIN.MANAGE_INVITATIONS, PERMISSIONS.ADMIN.MANAGE_PAYMENTS];
export const metadata: Metadata = {
  title: 'Admin Dashboard | Next Boilerplate',
  description: 'Administrative dashboard for managing users, settings, and system configurations',
  keywords: 'admin, dashboard, management, users, settings',
};
export default permissions;
