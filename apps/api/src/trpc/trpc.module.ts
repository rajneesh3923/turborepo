import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { UsersTrpcService } from './routers/users.trpc';
import { TrpcInitService } from './trpc-init.service.js';
import { FlightRequestTrpcRouter } from './routers/flight-request.router';
import { FlightRequestsModule } from 'src/flight-requests/flight-requests.module';
import { FlightRequestQuotationModule } from 'src/flight-request-quotation/flight-request-quotation.module';
import { FlightRequestQuotationTrpcRouter } from './routers/flight-request-quotation.router';
import { NotificationsTrpcRouter } from './routers/notifications.router';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    FlightRequestsModule,
    FlightRequestQuotationModule,
    NotificationsModule,
  ],
  providers: [
    TrpcService,
    TrpcInitService,
    UsersTrpcService,
    FlightRequestTrpcRouter,
    FlightRequestQuotationTrpcRouter,
    NotificationsTrpcRouter,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
