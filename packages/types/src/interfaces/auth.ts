import { UserRole } from "../enums/UserRoles.js";

export interface SupabaseAuthUserPayload {
  /**
   * The unique identifier of the user.
   */
  id: string;

  /**
   * The subject identifier of the user, which is the same as the user ID.
   */
  sub: string;

  /**
   * Metadata associated with the user.
   */
  user_metadata: {
    /**
     * The role of the user.
     */
    role: UserRole;

    /**
     * The email address of the user.
     */
    email: string;

    /**
     * Indicates whether the user's email address has been verified.
     */
    email_verified: boolean;

    /**
     * Indicates whether the user's phone number has been verified.
     */
    phone_verified: boolean;

    /**
     * The subject identifier of the user, which is the same as the user ID.
     */
    sub: string;
  };
}

export type AuthUser = SupabaseAuthUserPayload["user_metadata"] & {
  id: string;
};
