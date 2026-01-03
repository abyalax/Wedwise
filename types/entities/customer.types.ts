// Customer entity types for frontend
export type CustomerStatus = 'Active' | 'In Active';

export interface Customer {
  id: number;
  userId: number;
  theme: string;
  status: CustomerStatus;
  note?: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}

export interface CreateCustomer {
  userId: number;
  theme?: string;
  status?: CustomerStatus;
  note?: string;
}

export interface UpdateCustomer {
  userId?: number;
  theme?: string;
  status?: CustomerStatus;
  note?: string;
}

