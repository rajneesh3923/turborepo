import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = (
  opts: trpcExpress.CreateExpressContextOptions,
) => {
  return {
    req: opts.req,
    res: opts.res,
    accessToken: null,
    user: null,
  };
};
