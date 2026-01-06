
// Auto-generated file - do not edit manually
// Generated at: 2026-01-06T01:58:35.900Z

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
  "/:customerId": [
    "customer:read_invitation",
    "customer:create_invitation"
  ]
} as const;
