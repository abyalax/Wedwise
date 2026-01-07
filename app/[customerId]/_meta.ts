import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';

export type CustomerParams = { customerId: string };

export const permissions = [PERMISSIONS.CUSTOMER.READ_INVITATION, PERMISSIONS.CUSTOMER.CREATE_INVITATION];
export const metadata: Metadata = {
  title: 'Customer Dashboard | Wedwise',
  description: 'Customer dashboard for managing users, settings, and system configurations',
  keywords: 'Customer, dashboard, management, users, settings',
};
