export type TokenPayload = {
  sub: string;
  user_id: string;
  role: "user" | "admin";
  email: string;
  display_name: string;
  iat: string;
  exp: string;
  scope?: string,
  permissions?: string[],
};
