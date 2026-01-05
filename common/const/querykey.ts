import { ExtractString } from '~/lib/utils';

export const QUERY_KEY = {
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
    LOGOUT: 'logout',
    FORGOT_PASSWORD: 'forgot_password',
    RESET_PASSWORD: 'reset_password',
  },
  GUEST: {
    GETS: 'get_guests',
    GET_BY_ID: 'get_guest_by_id',
    CREATE: 'create_guest',
    UPDATE: 'update_guest',
    DELETE: 'delete_guest',
  },
  CUSTOMER: {
    GETS: 'get_customers',
    GET_BY_ID: 'get_customer_by_id',
    CREATE: 'create_customer',
    UPDATE: 'update_customer',
    DELETE: 'delete_customer',

    CREATE_INVITATION: 'create_invitation',
    READ_INVITATION: 'read_invitation',
    UPDATE_INVITATION: 'update_invitation',
    DELETE_INVITATION: 'delete_invitation',
  },
  THEMES: {
    GETS: 'get_themes',
    GET_BY_ID: 'get_theme_by_id',
    CREATE: 'create_theme',
    UPDATE: 'update_theme',
    DELETE: 'delete_theme',
  },
} as const;

export type QueryKey<T = string> = ExtractString<typeof QUERY_KEY> & T;
