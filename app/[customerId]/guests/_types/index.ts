// Dashboard Types
export type RsvpStatus = 'pending' | 'confirmed' | 'declined';

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  rsvpStatus: RsvpStatus;
  numberOfGuests: number;
  notes?: string;
  createdAt: string;
}
