export type roles = 'Customer' | 'Admin';

export const ROLE = {
  CUSTOMER: 'Customer',
  ADMIN: 'Admin',
} as const;

export const ROLEIDS: Record<roles, number> = {
  Admin: 1,
  Customer: 2,
} as const;

export const PERMISSIONS = {
  ADMIN: {
    MANAGE_CUSTOMERS: 'customer:*',
    MANAGE_INVITATIONS: 'invitations:*',
    MANAGE_PAYMENTS: 'payments:*',
  },

  CUSTOMER: {
    READ_PROFILE: 'customer:read_profile',

    CREATE_INVITATION: 'customer:create_invitation',
    READ_INVITATION: 'customer:read_invitation',
    UPDATE_INVITATION: 'customer:update_invitation',
    DELETE_INVITATION: 'customer:delete_invitation',

    CREATE_GUEST: 'customer:create_guest',
    READ_GUEST: 'customer:read_guest',
    UPDATE_GUEST: 'customer:update_guest',
    DELETE_GUEST: 'customer:delete_guest',

    MANAGE_GUESTS: 'guest:*',
    MANAGE_CUSTOMERS: 'customer:*',
  },

  GUEST: {
    VIEW_INVITATION: 'guest:view_invitation',
    RSVP: 'guest:rsvp',
    SEND_WISHES: 'guest:send_wishes',
  },
} as const;
