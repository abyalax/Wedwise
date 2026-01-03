// Re-export types from frontend entities for backward compatibility
// Frontend code should import from ~/types/entities instead
export type {
  Conversation,
  ConversationMessage,
  ConversationMessages,
  CreateConversation,
  UpdateConversation,
} from '~/types/entities/conversation.types';
export type { CreateCustomer, Customer, UpdateCustomer } from '~/types/entities/customer.types';
export type { CreateFeature, Feature, UpdateFeature } from '~/types/entities/feature.types';
export type {
  CreateGuest,
  Guest,
  GuestWithConversations,
  GuestWithConversationsAndInvitation,
  GuestWithInvitation,
  UpdateGuest,
} from '~/types/entities/guest.types';
export type { CreateInvitation, Invitation, UpdateInvitation } from '~/types/entities/invitation.types';
export type { Permission } from '~/types/entities/permission.types';
export type { Role } from '~/types/entities/role.types';
export type { UserRole } from '~/types/entities/role.types';
export type { BaseUser, CreateUser, UpdateUser, User, UserRoles, UserWithPassword } from '~/types/entities/user.types';

// Export enums
export { CustomerStatus, GuestStatus } from '~/generated/prisma/enums';
export type { CustomerStatus, GuestStatus } from '~/generated/prisma/enums';
