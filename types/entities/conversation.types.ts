// Conversation entity types for frontend
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO date string
}

export type ConversationMessages = ConversationMessage[];

export interface Conversation {
  id: number;
  guestId?: number | null;
  messages: ConversationMessages;
  lastInteraction?: string | null; // ISO date string
  createdAt?: string | null; // ISO date string
  updatedAt?: string | null; // ISO date string
}

export interface CreateConversation {
  guestId?: number;
  messages: ConversationMessages;
  lastInteraction?: string;
}

export interface UpdateConversation {
  guestId?: number;
  messages?: ConversationMessages;
  lastInteraction?: string;
}

