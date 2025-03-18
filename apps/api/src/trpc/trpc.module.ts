import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { UsersTrpcService } from './routers/users.trpc';
import { TrpcInitService } from './trpc-init.service';
import { FlightRequestTrpcRouter } from './routers/flight-request.router';
import { FlightRequestsModule } from 'src/flight-requests/flight-requests.module';
import { FlightRequestQuotationModule } from 'src/flight-request-quotation/flight-request-quotation.module';

@Module({
  imports: [FlightRequestsModule, FlightRequestQuotationModule],
  providers: [
    TrpcService,
    TrpcInitService,
    UsersTrpcService,
    FlightRequestTrpcRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
