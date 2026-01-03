import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';

const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.CREATE_INVITATION];
export const metadata: Metadata = {
  title: 'Customer Dashboard | Next Boilerplate',
  description: 'Customer dashboard for managing users, settings, and system configurations',
  keywords: 'Customer, dashboard, management, users, settings',
};
export default permissions;
