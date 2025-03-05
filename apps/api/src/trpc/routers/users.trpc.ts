import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';

@Injectable()
export class UsersTrpcService {
  constructor(private readonly trpcService: TrpcService) {}
  usersRouter = this.trpcService.t.router({
    getUsers: this.trpcService.t.procedure.query(() => {
      return [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
    }),
  });
}
