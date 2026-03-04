export type TokenPayload = {
  sub: string;
  user_id: string;
  role: "user" | "admin";
  type: "access" | "refresh";
  email: string;
  display_name: string;
  iat: string;
  exp: string;
};
