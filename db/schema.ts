// Backend validation schemas using Zod
// This file is for API validation only, not for frontend types
import { z } from 'zod';
import { CustomerStatus, GuestStatus } from '~/generated/prisma/enums';

// Re-export types from frontend entities for backward compatibility
export type {
  User,
  CreateUser,
  UpdateUser,
  UserWithPassword,
  UserRoles,
  BaseUser,
} from '~/types/entities/user.types';
export type {
  Customer,
  CreateCustomer,
  UpdateCustomer,
} from '~/types/entities/customer.types';
export type {
  Guest,
  CreateGuest,
  UpdateGuest,
  GuestWithInvitation,
  GuestWithConversations,
  GuestWithConversationsAndInvitation,
} from '~/types/entities/guest.types';
export type {
  Invitation,
  CreateInvitation,
  UpdateInvitation,
} from '~/types/entities/invitation.types';
export type {
  Conversation,
  ConversationMessage,
  ConversationMessages,
  CreateConversation,
  UpdateConversation,
} from '~/types/entities/conversation.types';
export type { Permission } from '~/types/entities/permission.types';
export type { Role, UserRole } from '~/types/entities/role.types';
export type {
  Feature,
  CreateFeature,
  UpdateFeature,
} from '~/types/entities/feature.types';

// Export enums
export { CustomerStatus, GuestStatus } from '~/generated/prisma/enums';

// Validation Schemas
export const customerInsertSchema = z.object({
  userId: z.number().int().positive(),
  theme: z.string().max(100).default('classic'),
  status: z.nativeEnum(CustomerStatus).default('Active'),
  note: z.string().max(150).nullable().optional(),
});

export const customerUpdateSchema = z.object({
  userId: z.number().int().positive().optional(),
  theme: z.string().max(100).optional(),
  status: z.nativeEnum(CustomerStatus).optional(),
  note: z.string().max(150).nullable().optional(),
});

export const guestInsertSchema = z.object({
  invitationId: z.number().int().positive(),
  phone: z.string().max(15),
  name: z.string().max(150),
  participant: z.number().int().positive().default(1),
  status: z.nativeEnum(GuestStatus),
  note: z.string().max(255).nullable().optional(),
  rsvpAt: z.string().datetime().nullable().optional(),
});

export const guestUpdateSchema = z.object({
  invitationId: z.number().int().positive().optional(),
  phone: z.string().max(15).optional(),
  name: z.string().max(150).optional(),
  participant: z.number().int().positive().optional(),
  status: z.nativeEnum(GuestStatus).optional(),
  note: z.string().max(255).nullable().optional(),
  rsvpAt: z.string().datetime().nullable().optional(),
});

