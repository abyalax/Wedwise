import { HelpCircle, Home, Settings, Users } from 'lucide-react';
import { FaEnvelope, FaUsers } from 'react-icons/fa';
import { MenuGroup } from '~/app/_components/ui/app-sidebar';
import { PERMISSIONS } from './permission';

export const sidebarItems = (customerId: string): MenuGroup[] => [
  {
    group: 'Customer',
    items: [
      {
        title: 'Beranda',
        url: `/${customerId}`,
        icon: Home,
        permissions: [PERMISSIONS.CUSTOMER.READ_GUEST, PERMISSIONS.CUSTOMER.READ_INVITATION],
      },
      {
        title: 'Guests',
        url: `/${customerId}/guests`,
        icon: FaUsers,
        permissions: [PERMISSIONS.CUSTOMER.READ_GUEST],
      },
      {
        title: 'Invitations',
        url: `/${customerId}/invitations`,
        icon: FaEnvelope,
        permissions: [PERMISSIONS.CUSTOMER.READ_INVITATION],
      },
    ],
  },
  {
    group: 'Admin',
    items: [
      {
        title: 'Beranda',
        url: '/backoffice',
        icon: Home,
        permissions: [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS],
      },
      {
        title: 'Customers',
        url: '/backoffice/customers',
        icon: Users,
        permissions: [PERMISSIONS.ADMIN.MANAGE_CUSTOMERS],
      },
    ],
  },
];

export const bottomItems = [
  {
    title: 'Help & Support',
    url: '/help',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];
