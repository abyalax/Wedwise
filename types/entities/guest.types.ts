// Guest entity types for frontend
export type GuestStatus = 'Invited' | 'Attending' | 'NotAttending' | 'Declined' | 'Maybe';

export interface Guest {
  id: number;
  invitationId: number;
  phone: string;
  name: string;
  participant: number;
  status: GuestStatus;
  note?: string | null;
  rsvpAt?: string | null; // ISO date string
  createdAt?: string | null; // ISO date string
  updatedAt?: string | null; // ISO date string
}

export interface CreateGuest {
  invitationId: number;
  phone: string;
  name: string;
  participant?: number;
  status?: GuestStatus;
  note?: string;
}

export interface UpdateGuest {
  invitationId?: number;
  phone?: string;
  name?: string;
  participant?: number;
  status?: GuestStatus;
  note?: string;
  rsvpAt?: string;
}

export interface GuestWithInvitation extends Guest {
  invitation: {
    id: number;
    customerId: number;
    name: string;
    theme: string;
    weddingDate: string;
    aiContext?: string | null;
  };
}

export interface GuestWithConversations extends Guest {
  conversations: Conversation[];
}

import type { Conversation } from './conversation.types';

export interface GuestWithConversationsAndInvitation extends Guest {
  conversations: Conversation[];
  invitation: {
    id: number;
    customerId: number;
    name: string;
    theme: string;
    weddingDate: string;
    aiContext?: string | null;
  };
}
