export const navigationRoot = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },
];

export const navigationClientAdmin = (customerId: string) => [{ name: 'Customers', href: `/${customerId}/admin/customers` }];

export const navigationClient = (customerId: string) => [
  { name: 'Customers', href: `/${customerId}/admin` },
  { name: 'Customer', href: `/${customerId}/customer` },
  { name: 'Login', href: `/${customerId}/auth/login` },
  { name: 'Register', href: `/${customerId}/auth/register` },
];

export const navigationAdmin = [
  { name: 'Home', href: '/backoffice' },
  { name: 'Clients', href: '/backoffice/clients' },
  { name: 'Create Client', href: '/clients/create' },
];

export const navigationCustomer = (customerId: string) => [
  { name: 'Home', href: `/${customerId}/customer` },
  { name: 'Profile', href: `/${customerId}/customer/me/profile` },
  { name: 'Order', href: `/${customerId}/customer/orders` },
];

export const navigationGuest = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },

  /**Just For Development */
  { name: 'Guest', href: '/' },
  { name: 'Customer', href: '/1' },
  { name: 'Admin', href: '/backoffice' },
];
