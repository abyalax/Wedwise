import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Guests Management | Dashboard',
  description: 'Manage guest accounts, roles, and permissions in the admin dashboard',
  keywords: 'guests, management, admin, roles, permissions',
};

const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.DELETE_INVITATION];
export default permissions;
