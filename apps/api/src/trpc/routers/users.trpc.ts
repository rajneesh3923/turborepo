import { Injectable } from '@nestjs/common';
import { TrpcInitService } from '../trpc-init.service.js';

@Injectable()
export class UsersTrpcService {
  constructor(private readonly trpcInitService: TrpcInitService) {}
  usersRouter = this.trpcInitService.t.router({
    getUsers: this.trpcInitService.publicProcedure.query(() => {
      return [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
    }),
  });
}
