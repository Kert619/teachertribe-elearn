import type { BaseUser } from "./common";

export interface User extends BaseUser {
  roles: string[];
  permissions: string[];
}

export interface loginCredentials {
  email: string;
  password: string;
}
