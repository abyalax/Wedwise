// Feature entity types for frontend
export interface Feature {
  id: number;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt?: string | null; // ISO date string
  updatedAt?: string | null; // ISO date string
}

export interface CreateFeature {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateFeature {
  name?: string;
  description?: string;
  isActive?: boolean;
}

