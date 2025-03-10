import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@server/trpc/@generated/server";

/**
 * Creates a TRPC instance for the AppRouter.
 *
 * This instance is used to interact with the backend API defined by the AppRouter.
 *
 * @constant
 * @type {ReturnType<typeof createTRPCReact<AppRouter>>}
 */
export const trpc = createTRPCReact<AppRouter>();
