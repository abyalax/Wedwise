
// Auto-generated file - do not edit manually
// Generated at: 2026-01-05T12:59:43.070Z

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
