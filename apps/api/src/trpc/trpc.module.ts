import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { UsersTrpcService } from './routers/users.trpc';
import { TrpcInitService } from './trpc-init.service';
import { FlightRequestTrpcRouter } from './routers/flight-request.router';
import { FlightRequestsModule } from 'src/flight-requests/flight-requests.module';
import { FlightRequestsService } from 'src/flight-requests/flight-requests.service';

@Module({
  imports: [FlightRequestsModule],
  providers: [
    TrpcService,
    TrpcInitService,
    UsersTrpcService,
    FlightRequestTrpcRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
