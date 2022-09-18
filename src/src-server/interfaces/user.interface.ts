export type UserStatus = "UnAuthorized" | "Authorized";
export class User {
  id?: string;
  email?: string;
  code?: string;
}
