import { Injectable } from '@nestjs/common';
import { TrpcInitService } from './trpc-init.service.js';
import { FlightRequestTrpcRouter } from './routers/flight-request.router';
import { FlightRequestQuotationTrpcRouter } from './routers/flight-request-quotation.router';
import { NotificationsTrpcRouter } from './routers/notifications.router';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

@Injectable()
export class TrpcService {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private readonly flightRequestsTrpcRouter: FlightRequestTrpcRouter,
    private readonly flightRequestsQuotationTrpcRouter: FlightRequestQuotationTrpcRouter,
    private readonly notificationsTrpcRouter: NotificationsTrpcRouter,
  ) {}

  appRouter = this.trpcInitService.router({
    flightRequests: this.flightRequestsTrpcRouter.flightRequestRouter,
    flightRequestQuotations:
      this.flightRequestsQuotationTrpcRouter.flightRequestQuotationRouter,
    notifications: this.notificationsTrpcRouter.notificationsRouter,
  });
}
