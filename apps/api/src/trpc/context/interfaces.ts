import { AuthUser } from '@repo/types';

export interface AuthContext {
  user: AuthUser;
  accessToken: string;
}
