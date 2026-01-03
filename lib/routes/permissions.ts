
// Auto-generated file - do not edit manually
// Generated at: 2026-01-03T11:53:11.344Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  "/[customerId]": [
    "customer:read_invitation",
    "customer:create_invitation"
  ],
  "/backoffice": [
    "customers:*",
    "invitations:*",
    "payments:*"
  ],
  "/[customerId]/guests": [
    "customer:read_invitation",
    "customer:create_invitation",
    "customer:delete_invitation"
  ],
  "/[customerId]/invitations": [
    "customer:read_invitation",
    "customer:create_invitation",
    "customer:delete_invitation"
  ],
  "/:customerId": [
    "customer:read_invitation",
    "customer:create_invitation"
  ],
  "/:customerId/guests": [
    "customer:read_invitation",
    "customer:create_invitation",
    "customer:delete_invitation"
  ],
  "/:customerId/invitations": [
    "customer:read_invitation",
    "customer:create_invitation",
    "customer:delete_invitation"
  ]
} as const;
