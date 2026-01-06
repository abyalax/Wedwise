
// Auto-generated file - do not edit manually
// Generated at: 2026-01-06T04:53:45.971Z

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
