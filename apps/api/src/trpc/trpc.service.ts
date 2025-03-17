import { Injectable } from '@nestjs/common';
import { TrpcInitService } from './trpc-init.service';
import { FlightRequestTrpcRouter } from './routers/flight-request.router';

@Injectable()
export class TrpcService {
  constructor(
    private readonly trpcInitService: TrpcInitService,
    private readonly flightRequestsTrpcRouter: FlightRequestTrpcRouter,
  ) {}

  appRouter = this.trpcInitService.router({
    flightRequests: this.flightRequestsTrpcRouter.flightRequestRouter,
  });
}
