import { Injectable } from '@nestjs/common';
import { UsersTrpcService } from './routers/users.trpc';
import { TrpcInitService } from './trpc-init.service';

@Injectable()
export class TrpcService {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private readonly usersTrpc: UsersTrpcService,
  ) {}

  appRouter = this.trpcInitService.router({
    user: this.usersTrpc.usersRouter,
  });
}
