import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';

export const metadata: Metadata = {
  title: 'Invitation Management | Dashboard',
  description: 'Manage invitations in the admin dashboard',
  keywords: 'invitations, management, admin, roles, permissions',
};

const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.DELETE_INVITATION];
export default permissions;
