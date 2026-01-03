// Backend validation schemas using Zod
// This file is for API validation only, not for frontend types
import { z } from 'zod';
import { CustomerStatus, GuestStatus } from '~/generated/prisma/enums';

// Export enums
export { CustomerStatus, GuestStatus } from '~/generated/prisma/enums';
export type {
  Conversation,
  ConversationMessage,
  ConversationMessages,
  CreateConversation,
  UpdateConversation,
} from '~/types/entities/conversation.types';
export type {
  CreateCustomer,
  Customer,
  UpdateCustomer,
} from '~/types/entities/customer.types';
export type {
  CreateFeature,
  Feature,
  UpdateFeature,
} from '~/types/entities/feature.types';
export type {
  CreateGuest,
  Guest,
  GuestWithConversations,
  GuestWithConversationsAndInvitation,
  GuestWithInvitation,
  UpdateGuest,
} from '~/types/entities/guest.types';
export type {
  CreateInvitation,
  Invitation,
  UpdateInvitation,
} from '~/types/entities/invitation.types';
export type { Permission } from '~/types/entities/permission.types';
export type { Role, UserRole } from '~/types/entities/role.types';
// Re-export types from frontend entities for backward compatibility
export type {
  BaseUser,
  CreateUser,
  UpdateUser,
  User,
  UserRoles,
  UserWithPassword,
} from '~/types/entities/user.types';

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
