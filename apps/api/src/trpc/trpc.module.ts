import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { UsersTrpcService } from './routers/users.trpc';
import { TrpcInitService } from './trpc-init.service';

@Module({
  providers: [TrpcService, TrpcInitService, UsersTrpcService],
  exports: [TrpcService],
})
export class TrpcModule {}
