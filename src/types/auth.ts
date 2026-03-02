export type TokenPayload = {
  // OIDC standard claim: stable identifier for the authenticated user.
  sub: string;
  // Some providers also include a custom user_id claim.
  user_id: string;
  role: "user" | "admin";
  type: "access" | "refresh";
  email: string;
  display_name: string;
  iat: string;
  exp: string;
};
