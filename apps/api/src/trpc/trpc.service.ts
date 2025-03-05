import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

@Injectable()
export class TrpcService {
  t = initTRPC.create();

  appRouter = this.t.router({
    user: this.t.procedure.query(() => {
      return [
        {
          id: 1,
          name: 'John Doe',
        },
      ];
    }),
  });
}
