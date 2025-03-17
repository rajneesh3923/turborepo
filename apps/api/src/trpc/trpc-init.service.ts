import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { SupabaseAuthUserPayload, AuthUser } from '@repo/types';
import jwt from 'jsonwebtoken';
import { createContext } from './context/context';

const verifyToken = (token: string): AuthUser => {
  const payload = <SupabaseAuthUserPayload>(
    jwt.verify(token, process.env.JWT_SECRET ?? '')
  );

  return {
    id: payload.sub,
    ...payload.user_metadata,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

@Injectable()
export class TrpcInitService {
  t = initTRPC.context<Context>().create();
  publicProcedure = this.t.procedure;
  authProcedure = this.publicProcedure.use((opts) => {
    const { next, ctx } = opts;

    if (!ctx) {
      throw new TRPCError({
        message: 'Could not find ctx.',
        code: 'NOT_FOUND',
      });
    }
    const token = ctx.req.headers.authorization;

    if (!token) {
      throw new TRPCError({
        message: 'Unauthenticated',
        code: 'UNAUTHORIZED',
      });
    }

    const authUser = verifyToken(token);

    return next({
      ctx: {
        user: authUser,
        accessToken: token,
      },
    });
  });
  router = this.t.router;
}
