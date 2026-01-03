// Invitation entity types for frontend
export interface Invitation {
  id: number;
  customerId: number;
  name: string;
  theme: string;
  weddingDate: string; // ISO date string
  aiContext?: string | null;
  createdAt?: string | null; // ISO date string
  updatedAt?: string | null; // ISO date string
}

export interface CreateInvitation {
  customerId: number;
  name: string;
  theme: string;
  weddingDate: string;
  aiContext?: string;
}

export interface UpdateInvitation {
  customerId?: number;
  name?: string;
  theme?: string;
  weddingDate?: string;
  aiContext?: string;
}

